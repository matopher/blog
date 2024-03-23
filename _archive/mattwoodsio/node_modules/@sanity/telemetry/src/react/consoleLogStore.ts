/* eslint-disable no-console */
import type {
  TelemetryEvent,
  TelemetryLogEvent,
  TelemetryTraceEvent,
} from '../types'
import {TelemetryStore} from '../types'
import {createStore} from '../createStore'
import {SessionId} from '../createSessionId'

function formatLogEvent(event: TelemetryLogEvent) {
  return [
    `[telemetry][${event.name}@${event.version}][${event.type}]}`,
    event.data,
  ]
}

function formatTraceEvent(trace: TelemetryTraceEvent) {
  return [
    `[telemetry][${trace.name}@${trace.version}][${trace.type}]}`,
    ...(trace.type === 'trace.log' ? [trace.data] : []),
  ]
}

function formatEvent(event: TelemetryEvent) {
  if (event.type === 'userProperties') {
    return [`[telemetry][${event.type}]`, event.properties]
  }
  return event.type == 'log' ? formatLogEvent(event) : formatTraceEvent(event)
}

export function createConsoleLogStore<UserProperties>(
  sessionId: SessionId,
): TelemetryStore<UserProperties> {
  const store = createStore<UserProperties>(sessionId)

  function log(event: TelemetryEvent) {
    console.log(...formatEvent(event))
  }

  const subscription = store.events$.subscribe(log)
  return {
    logger: store.logger,
    end: () => {
      subscription.unsubscribe()
    },
    flush: () => {
      /* noop as all events are logged to the console immediately */
      return Promise.resolve()
    },
    endWithBeacon: () => {
      return true
    },
  }
}
