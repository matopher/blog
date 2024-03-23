import {useContext} from 'react'
import {TelemetryLoggerContext} from './TelemetryProvider'
import type {TelemetryLogger} from '../'

export function useTelemetry<
  UserProperties,
>(): TelemetryLogger<UserProperties> {
  return useContext(TelemetryLoggerContext) as TelemetryLogger<UserProperties>
}
