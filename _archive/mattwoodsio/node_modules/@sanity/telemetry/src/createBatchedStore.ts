import {TelemetryEvent, TelemetryStore} from './types'
import {
  catchError,
  combineLatest,
  combineLatestAll,
  concatMap,
  EMPTY,
  from,
  lastValueFrom,
  map,
  mergeMap,
  Observable,
  of,
  tap,
  throttle,
} from 'rxjs'
import {SessionId} from './createSessionId'
import {createStore} from './createStore'

/**
 * This is like rxjs.timer() except for that it's calling timeout.unref()
 * This prevents the timer from keeping the event loop active https://nodejs.org/api/timers.html#timeoutunref
 * We don't want any of our timers to hold up the process from completing
 * @param ms
 */
const unrefTimer = (ms: number) =>
  new Observable((subscriber) => {
    const timeout = setTimeout(() => {
      subscriber.next()
      subscriber.complete()
    }, ms)
    if (typeof timeout.unref === 'function') {
      // unref the timeout to avoid holding the process open in node.js
      timeout.unref()
    }
    return () => clearTimeout(timeout)
  })

/**
 * 'unknown' - we don't know if the user has consented or not (e.g. something went wrong)
 * 'unset' - the user has not yet been asked for consent
 * 'granted' - the user has consented
 * 'denied' - the user has denied consent
 */
export type ConsentStatus = 'undetermined' | 'unset' | 'granted' | 'denied'

export interface CreateBatchedStoreOptions {
  /**
   * Optionally provide a flush interval
   */
  flushInterval?: number

  /**
   *  Provide a strategy for resolving consent depending on context (e.g. studio/cli)
   *  @public
   */
  resolveConsent: () => Promise<{status: ConsentStatus}>
  /**
   * Provide a strategy for submitting events (e.g. using fetch in browser, or node server side)
   * @public
   */
  sendEvents: (events: TelemetryEvent[]) => Promise<unknown>

  /**
   * Optionally provide a strategy for submitting final events (e.g. events that's queued when the browser exits)
   * @public
   */
  sendBeacon?: (events: TelemetryEvent[]) => boolean
}

export function createBatchedStore<UserProperties>(
  sessionId: SessionId,
  options: CreateBatchedStoreOptions,
): TelemetryStore<UserProperties> {
  const store = createStore<UserProperties>(sessionId)

  function resolveConsent(): Promise<{status: ConsentStatus}> {
    return options.resolveConsent().catch((err) =>
      // if we for some reason can't fetch consent we treat it as "undetermined", and try again at next flush
      ({status: 'undetermined' as const}),
    )
  }

  const _buffer: TelemetryEvent[] = []

  function consume() {
    const buf = _buffer.slice()
    _buffer.length = 0
    return buf
  }

  function submit() {
    const pending = consume()
    if (pending.length === 0) {
      return EMPTY
    }
    return combineLatest([of(pending), resolveConsent()]).pipe(
      mergeMap(([events, consent]) => {
        if (events.length === 0 || consent.status !== 'granted') {
          // consent is not granted, we just consumed (cleared) the buffer so we can return empty
          return EMPTY
        }
        return from(options.sendEvents(events)).pipe(
          catchError((err) => {
            // In case of error, put events back on the buffer
            _buffer.unshift(...events)
            // and ignore the error
            return EMPTY
          }),
        )
      }),
    )
  }

  const flushInterval = options.flushInterval ?? 30000

  const flush$ = store.events$.pipe(
    tap((ev) => _buffer.push(ev)),
    map(() => {}), // void to avoid accidental use of events further down the pipe
    throttle(() => unrefTimer(flushInterval), {
      leading: false,
      trailing: true,
    }),
    concatMap(() => submit()),
  )

  function flush() {
    return lastValueFrom(submit(), {
      defaultValue: undefined,
    }).then(() => {})
  }

  // start subscribing to events
  const subscription = flush$.subscribe()

  function endWithBeacon() {
    if (!options.sendBeacon) {
      // we don't have a beacon strategy, so we just flush - this may make us lose events, but it's the best we can do
      end()
      return true
    }
    const events = consume()
    subscription.unsubscribe()
    return events.length > 0 ? options.sendBeacon(events) : true
  }

  function end() {
    // flush before destroying
    return flush()
      .then(
        () => {}, // void promise
        () => {}, // ignore errors
      )
      .finally(() => {
        // Note: we might end up with an error here
        subscription.unsubscribe()
      })
  }

  return {
    end,
    endWithBeacon,
    // Note: flush may fail
    flush,
    logger: store.logger,
  }
}
