import {DefinedTelemetryTrace, TelemetryLogger, TelemetryTrace} from './types'

function createNoopLogger(): TelemetryLogger<unknown> {
  const logger = {
    updateUserProperties() {},
    trace,
    log,
  }
  function trace(
    telemetryTrace: DefinedTelemetryTrace<unknown, unknown>,
  ): TelemetryTrace<unknown, unknown> {
    return {
      start() {},
      log(data?: unknown) {},
      complete() {},
      newContext(name: string) {
        return logger
      },
      error(error: Error) {},
      await: (promise: Promise<unknown>) => promise,
    }
  }

  function log(event: unknown, data?: unknown) {}

  return logger
}

export const noopLogger = createNoopLogger()
