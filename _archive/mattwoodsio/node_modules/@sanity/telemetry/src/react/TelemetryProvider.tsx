import type React from 'react'
import {createContext} from 'react'
import {TelemetryLogger, TelemetryStore} from '../types'
import {useTelemetryStoreLifeCycleEvents} from './useTelemetryStoreLifeCycleEvents'
import {noopLogger} from '../noopLogger'

/**
 * @internal
 */
export const TelemetryLoggerContext =
  createContext<TelemetryLogger<unknown>>(noopLogger)

export function TelemetryProvider<UserProperties>({
  children,
  store,
}: {
  children: React.ReactNode
  store: TelemetryStore<UserProperties>
}) {
  // Hook the telemetry store up to page life cycle events like hide/unload
  useTelemetryStoreLifeCycleEvents(store)

  return (
    <TelemetryLoggerContext.Provider value={store.logger}>
      {children}
    </TelemetryLoggerContext.Provider>
  )
}
