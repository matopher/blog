import {TelemetryStore as TelemetryStore_2} from '@sanity/telemetry'

/**
 * 'unknown' - we don't know if the user has consented or not (e.g. something went wrong)
 * 'unset' - the user has not yet been asked for consent
 * 'granted' - the user has consented
 * 'denied' - the user has denied consent
 */
export declare type ConsentStatus =
  | 'undetermined'
  | 'unset'
  | 'granted'
  | 'denied'

export declare function createBatchedStore<UserProperties>(
  sessionId: SessionId,
  options: CreateBatchedStoreOptions
): TelemetryStore<UserProperties>

export declare interface CreateBatchedStoreOptions {
  /**
   * Optionally provide a flush interval
   */
  flushInterval?: number
  /**
   *  Provide a strategy for resolving consent depending on context (e.g. studio/cli)
   *  @public
   */
  resolveConsent: () => Promise<{
    status: ConsentStatus
  }>
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

export declare function createSessionId(): SessionId

export declare interface DefinedTelemetryLog<Schema> {
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

export declare interface DefinedTelemetryTrace<Data = void, Context = void> {
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

export declare interface DefinedUserProperties<Schema> {
  type: 'userProperties'
  /** Unique name of the event */
  /** Data format version. Increment this by 1 whenever the shape of the data changes in a non-backwards compatible way */
  version: number
  /** Data schema. Will not be accessible at runtime */
  schema: Schema
}

/**
 * @param options
 */
export declare function defineEvent<Data = void>(
  options: TelemetryLogOptions
): DefinedTelemetryLog<Data>

/**
 * @param options
 * */
export declare function defineTrace<Data = void, Context = void>(
  options: TelemetryTraceOptions
): DefinedTelemetryTrace<Data, Context>

export declare const noopLogger: TelemetryLogger<unknown>

export declare function onPageHide(listener: () => void): () => void

export declare function onVisibilityHidden(cb: () => void): () => void

export declare function registerLifecycleEvents(
  store: TelemetryStore_2<unknown>
): () => void

/**
 * @public
 */
export declare type SessionId = string & {
  __type: 'SessionId'
}

export declare type TelemetryEvent =
  | TelemetryLogEvent
  | TelemetryTraceEvent
  | TelemetryUserPropertiesEvent

export declare type TelemetryLogEvent = {
  type: 'log'
  name: string
  version: number
  sessionId: string
  createdAt: string
  data: unknown
}

/**
 * Note that `sessionId` is removed from the signature of these functions
 */
export declare interface TelemetryLogger<UserProperties> {
  updateUserProperties(properties: UserProperties): void
  log<Data>(event: DefinedTelemetryLog<Data>, data: Data): void
  log<Data extends void>(event: DefinedTelemetryLog<Data>): void
  trace<Data>(
    event: DefinedTelemetryTrace<Data>,
    context?: unknown
  ): TelemetryTrace<UserProperties, Data>
}

export declare interface TelemetryLogOptions {
  /** Unique name of the event */
  name: string
  /** Event version. Increment this by 1 whenever the shape of the data changes in a non-backwards compatible way */
  version: number
  /** Description of log event */
  description: string
}

export declare interface TelemetryStore<UserProperties> {
  logger: TelemetryLogger<UserProperties>
  end: () => void
  endWithBeacon: () => boolean
  flush: () => Promise<void>
}

export declare interface TelemetryTrace<UserProperties, Data> {
  start(): void
  log(data: Data): void
  error(error: Error): void
  complete(): void
  newContext(name: string): TelemetryLogger<UserProperties>
  await<P extends Promise<Data>>(promise: P): P
  await<P extends Promise<unknown>>(promise: P, finalData: Data): P
}

export declare type TelemetryTraceCompleteEvent<
  T = unknown,
  Context = unknown
> = {
  type: 'trace.complete'
  name: string
  version: number
  traceId: string
  sessionId: string
  createdAt: string
  data: T
  context: Context
}

export declare type TelemetryTraceErrorEvent<T = unknown, Context = unknown> = {
  type: 'trace.error'
  name: string
  version: number
  traceId: string
  sessionId: string
  createdAt: string
  data: T
  context: Context
}

export declare type TelemetryTraceEvent =
  | TelemetryTraceStartEvent
  | TelemetryTraceLogEvent
  | TelemetryTraceErrorEvent
  | TelemetryTraceCompleteEvent

export declare type TelemetryTraceLogEvent<T = unknown, Context = unknown> = {
  type: 'trace.log'
  name: string
  version: number
  traceId: string
  sessionId: string
  createdAt: string
  data: T
  context: Context
}

export declare interface TelemetryTraceOptions {
  /** Unique name of the event */
  name: string
  /** Event version. Increment this by 1 whenever the shape of the data changes in a non-backwards compatible way */
  version: number
  /** Description of log event */
  description: string
}

export declare type TelemetryTraceStartEvent<Context = unknown> = {
  type: 'trace.start'
  name: string
  version: number
  traceId: string
  context: Context
  sessionId: string
  createdAt: string
}

export declare type TelemetryUserPropertiesEvent = {
  type: 'userProperties'
  sessionId: string
  createdAt: string
  properties: unknown
}

export declare interface TelemetryUserPropertyOptions {
  /** Data format version. Increment this by 1 whenever the shape of the data changes in a non-backwards compatible way */
  version: number
}

export {}
