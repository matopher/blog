const capture = {
  capture: true
};
function listen(target, type, cb) {
  target.addEventListener(type, cb, capture);
  return () => target.removeEventListener(type, cb, capture);
}
function onPageHide(listener) {
  if ("onpagehide" in window) {
    return listen(window, "pagehide", listener);
  }
  const cleanupUnload = listen(window, "unload", listener);
  const cleanupBeforeUnload = listen(window, "unload", listener);
  return () => {
    cleanupUnload();
    cleanupBeforeUnload();
  };
}
function onVisibilityHidden(cb) {
  return listen(document, "visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      cb();
    }
  });
}
function registerLifecycleEvents(store) {
  const unregisterVisibilityHidden = onVisibilityHidden(() => store.flush());
  const unregisterPageHide = onPageHide(() => store.endWithBeacon());
  return () => {
    unregisterPageHide();
    unregisterVisibilityHidden();
  };
}
function createNoopLogger() {
  const logger = {
    updateUserProperties() {},
    trace,
    log
  };
  function trace(telemetryTrace) {
    return {
      start() {},
      log(data) {},
      complete() {},
      newContext(name) {
        return logger;
      },
      error(error) {},
      await: promise => promise
    };
  }
  function log(event, data) {}
  return logger;
}
const noopLogger = createNoopLogger();
export { noopLogger, onPageHide, onVisibilityHidden, registerLifecycleEvents };
//# sourceMappingURL=noopLogger-b5b1676e.js.map
