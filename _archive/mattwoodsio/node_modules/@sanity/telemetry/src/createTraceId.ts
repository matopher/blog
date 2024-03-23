import {typeid} from 'typeid-js'

/**
 * @public
 */
export type TraceId = string & {__type: 'TraceId'}

export function createTraceId(): TraceId {
  return typeid('trace').toString() as TraceId
}
