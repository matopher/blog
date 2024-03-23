import {
  DefinedTelemetryLog,
  DefinedTelemetryTrace,
  TelemetryEvent,
  TelemetryLogEvent,
  TelemetryLogger,
  TelemetryTrace,
  TelemetryTraceEvent,
} from './types'
import {Observable, Subject} from 'rxjs'
import {SessionId} from './createSessionId'
import {createTraceId} from './createTraceId'
import {trimErrorMessage} from './utils/trimErrorMessage'

/**
 * Bare-bones store for logging and reacting to telemetry events
 * @internal
 * @param sessionId
 */
export function createStore<UserProperties>(sessionId: SessionId): {
  events$: Observable<TelemetryEvent>
  logger: TelemetryLogger<UserProperties>
} {
  const logEntries$ = new Subject<TelemetryEvent>()

  function pushTraceError<Data, Err extends {message: string}>(
    traceId: string,
    telemetryTrace: DefinedTelemetryTrace<Data>,
    error: {message: string},
    context: unknown,
  ) {
    logEntries$.next({
      sessionId,
      type: 'trace.error',
      traceId,
      name: telemetryTrace.name,
      version: telemetryTrace.version,
      data: {message: trimErrorMessage(error.message)},
      context,
      createdAt: new Date().toISOString(),
    })
  }

  function pushTraceEntry<Data>(
    type: 'trace.start',
    traceId: string,
    telemetryTrace: DefinedTelemetryTrace<Data>,
    data: undefined,
    context: unknown,
  ): void
  function pushTraceEntry<Data>(
    type: 'trace.log',
    traceId: string,
    telemetryTrace: DefinedTelemetryTrace<Data>,
    data: Data,
    context: unknown,
  ): void
  function pushTraceEntry<Data>(
    type: 'trace.complete',
    traceId: string,
    telemetryTrace: DefinedTelemetryTrace<Data>,
    data: Data,
    context: unknown,
  ): void

  function pushTraceEntry<Data>(
    type: TelemetryTraceEvent['type'],
    traceId: string,
    telemetryTrace: DefinedTelemetryTrace<Data>,
    data: Data,
    context: unknown,
  ) {
    logEntries$.next({
      sessionId,
      type,
      traceId,
      name: telemetryTrace.name,
      version: telemetryTrace.version,
      data,
      context,
      createdAt: new Date().toISOString(),
    })
  }

  function pushLogEntry<Data>(
    type: TelemetryLogEvent['type'],
    event: DefinedTelemetryLog<Data>,
    data?: unknown,
  ) {
    logEntries$.next({
      sessionId,
      type,
      version: event.version,
      name: event.name,
      data,
      createdAt: new Date().toISOString(),
    })
  }

  function pushUserPropertiesEntry(properties: UserProperties) {
    logEntries$.next({
      sessionId,
      type: 'userProperties',
      properties: properties,
      createdAt: new Date().toISOString(),
    })
  }

  function createTrace<Data = void>(
    traceId: string,
    traceDef: DefinedTelemetryTrace<Data>,
    context: unknown,
  ): TelemetryTrace<UserProperties, Data> {
    return {
      start() {
        pushTraceEntry('trace.start', traceId, traceDef, undefined, context)
      },
      newContext(name: string): TelemetryLogger<UserProperties> {
        return {
          trace<InnerData>(innerTraceDef: DefinedTelemetryTrace<InnerData>) {
            return createTrace<InnerData>(
              `${traceId}.${name}`,
              innerTraceDef,
              context,
            )
          },
          updateUserProperties() {},
          log,
        }
      },
      log(data?: unknown) {
        pushTraceEntry('trace.log', traceId, traceDef, data, context)
      },
      complete() {
        pushTraceEntry('trace.complete', traceId, traceDef, undefined, context)
      },
      error(error: {message: string}) {
        pushTraceError(traceId, traceDef, error, context)
      },
      await<P extends Promise<Data>>(promise: P, data?: Data): P {
        this.start()
        promise.then(
          (result) => {
            this.log(data ? data : result)
            this.complete()
            return result
          },
          (error) => {
            this.error(error)
            throw error
          },
        )
        return promise
      },
    }
  }

  function log<Data>(event: DefinedTelemetryLog<Data>, data?: Data) {
    pushLogEntry('log', event, data)
  }

  return {
    events$: logEntries$.asObservable(),
    logger: {
      updateUserProperties(properties: UserProperties) {
        pushUserPropertiesEntry(properties)
      },
      trace: <Data>(
        traceDef: DefinedTelemetryTrace<Data>,
        context: unknown,
      ) => {
        const traceId = createTraceId()
        return createTrace(traceId, traceDef, context)
      },
      log,
    },
  }
}
