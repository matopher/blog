import {DefinedTelemetryLog, TelemetryLogOptions} from './types'

/**
 * @param options
 */
export function defineEvent<Data = void>(
  options: TelemetryLogOptions,
): DefinedTelemetryLog<Data> {
  return {
    type: 'log',
    name: options.name,
    version: options.version,
    description: options.description,
    schema: undefined as unknown as Data,
  }
}
