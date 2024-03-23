export interface TelemetryLogOptions {
  /** Unique name of the event */
  name: string
  /** Event version. Increment this by 1 whenever the shape of the data changes in a non-backwards compatible way */
  version: number
  /** Description of log event */
  description: string
}
export interface TelemetryUserPropertyOptions {
  /** Data format version. Increment this by 1 whenever the shape of the data changes in a non-backwards compatible way */
  version: number
}

export interface TelemetryTraceOptions {
  /** Unique name of the event */
  name: string
  /** Event version. Increment this by 1 whenever the shape of the data changes in a non-backwards compatible way */
  version: number
  /** Description of log event */
  description: string
}

export interface DefinedTelemetryLog<Schema> {
  type: 'log'
  /** Unique name of the event */
  name: string

  /** Event version. Increment this by 1 whenever the shape of the data changes in a non-backwards compatible way */
  version: number

  /** Description of log event */
  description?: string
  /** Data schema. Will not be accessible at runtime */
  schema: Schema
}

export interface DefinedUserProperties<Schema> {
  type: 'userProperties'
  /** Unique name of the event */

  /** Data format version. Increment this by 1 whenever the shape of the data changes in a non-backwards compatible way */
  version: number

  /** Data schema. Will not be accessible at runtime */
  schema: Schema
}

export interface DefinedTelemetryTrace<Data = void, Context = void> {
  type: 'trace'
  /** Unique name of the trace */
  name: string
  /** Trace version. Increment this by 1 whenever the shape of the data changes in a non-backwards compatible way */
  version: number
  /** Description of trace */
  description?: string
  /** Data schema. Will not be accessible at runtime */
  schema: Data
  /** Contextual data schema. Will not be accessible at runtime */
  context: Context
}

export interface TelemetryTrace<UserProperties, Data> {
  start(): void
  log(data: Data): void
  error(error: Error): void
  complete(): void
  newContext(name: string): TelemetryLogger<UserProperties>
  await<P extends Promise<Data>>(promise: P): P
  await<P extends Promise<unknown>>(promise: P, finalData: Data): P
}

/**
 * Note that `sessionId` is removed from the signature of these functions
 */
export interface TelemetryLogger<UserProperties> {
  updateUserProperties(properties: UserProperties): void

  /*
   * Log a single event, typically a user action, e.g. "Publish"-button clicked
   */
  log<Data>(event: DefinedTelemetryLog<Data>, data: Data): void
  log<Data extends void>(event: DefinedTelemetryLog<Data>): void

  /*
   * Trace an operation that may take some time and consist of multiple steps, and that could potentially fail, e.g. request to mutate a document
   * Suitable for use with async/await or Observables
   */
  trace<Data>(
    event: DefinedTelemetryTrace<Data>,
    context?: unknown,
  ): TelemetryTrace<UserProperties, Data>
}

export type TelemetryLogEvent = {
  type: 'log'
  name: string // pre-defined event name
  version: number // version of event
  sessionId: string
  createdAt: string
  data: unknown
}

export type TelemetryUserPropertiesEvent = {
  type: 'userProperties'
  sessionId: string
  createdAt: string
  properties: unknown
}

export type TelemetryTraceStartEvent<Context = unknown> = {
  type: 'trace.start'
  name: string // pre-defined event name
  version: number // version of event
  traceId: string
  context: Context
  sessionId: string
  createdAt: string
}

export type TelemetryTraceLogEvent<T = unknown, Context = unknown> = {
  type: 'trace.log'
  name: string // pre-defined event name
  version: number // version of pre-defined event
  traceId: string
  sessionId: string
  createdAt: string
  data: T
  context: Context
}
export type TelemetryTraceErrorEvent<T = unknown, Context = unknown> = {
  type: 'trace.error'
  name: string // pre-defined event name
  version: number // version of pre-defined event
  traceId: string
  sessionId: string
  createdAt: string
  data: T
  context: Context
}
export type TelemetryTraceCompleteEvent<T = unknown, Context = unknown> = {
  type: 'trace.complete'
  name: string // pre-defined event name
  version: number // version of pre-defined event
  traceId: string
  sessionId: string
  createdAt: string
  data: T
  context: Context
}

export type TelemetryTraceEvent =
  | TelemetryTraceStartEvent
  | TelemetryTraceLogEvent
  | TelemetryTraceErrorEvent
  | TelemetryTraceCompleteEvent

export type TelemetryEvent =
  | TelemetryLogEvent
  | TelemetryTraceEvent
  | TelemetryUserPropertiesEvent

export interface TelemetryStore<UserProperties> {
  logger: TelemetryLogger<UserProperties>
  end: () => void
  endWithBeacon: () => boolean
  flush: () => Promise<void>
}
