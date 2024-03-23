import type {TelemetryStore} from '../types'
import {useEffect} from 'react'
import {onPageHide, onVisibilityHidden} from '../utils/browserEvents'

export function useTelemetryStoreLifeCycleEvents(
  store: TelemetryStore<unknown>,
) {
  // when visibility changes to hidden, flush events, but continue tracking
  useEffect(() => onVisibilityHidden(store.flush), [store.flush])
  // when browser navigates away, closes or reloads the page, use provided sendBeacon method to send events
  useEffect(() => onPageHide(store.endWithBeacon), [store.endWithBeacon])
}
