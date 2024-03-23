import {TelemetryStore} from '@sanity/telemetry'

const capture = {capture: true}

function listen(target: EventTarget, type: string, cb: () => void) {
  target.addEventListener(type, cb, capture)
  return () => target.removeEventListener(type, cb, capture)
}

export function onPageHide(listener: () => void) {
  // prefer pagehide to unload event
  if ('onpagehide' in window) {
    return listen(window, 'pagehide', listener)
  }
  // only register beforeunload/unload in browsers that don't support
  // pagehide to avoid breaking bfcache
  const cleanupUnload = listen(window, 'unload', listener)
  const cleanupBeforeUnload = listen(window, 'unload', listener)
  return () => {
    cleanupUnload()
    cleanupBeforeUnload()
  }
}

export function onVisibilityHidden(cb: () => void) {
  return listen(document, 'visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      cb()
    }
  })
}

export function registerLifecycleEvents(store: TelemetryStore<unknown>) {
  const unregisterVisibilityHidden = onVisibilityHidden(() => store.flush())
  const unregisterPageHide = onPageHide(() => store.endWithBeacon())
  return () => {
    unregisterPageHide()
    unregisterVisibilityHidden()
  }
}
