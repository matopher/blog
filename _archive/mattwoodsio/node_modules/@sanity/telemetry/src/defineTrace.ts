import {DefinedTelemetryTrace, TelemetryTraceOptions} from './types'

/**
 * @param options
 * */
export function defineTrace<Data = void, Context = void>(
  options: TelemetryTraceOptions,
): DefinedTelemetryTrace<Data, Context> {
  return {
    type: 'trace',
    name: options.name,
    version: options.version,
    description: options.description,
    schema: undefined as unknown as Data,
    context: undefined as unknown as Context,
  }
}
