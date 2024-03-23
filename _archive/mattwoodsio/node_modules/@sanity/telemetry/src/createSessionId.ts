import {typeid} from 'typeid-js'

/**
 * @public
 */
export type SessionId = string & {__type: 'SessionId'}

export function createSessionId(): SessionId {
  return typeid('session').toString() as SessionId
}
