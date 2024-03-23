import { useEffect, createContext, useContext } from 'react';
import { jsx } from 'react/jsx-runtime';
import { onVisibilityHidden, onPageHide, noopLogger } from '../_chunks/noopLogger-b5b1676e.js';
function useTelemetryStoreLifeCycleEvents(store) {
  useEffect(() => onVisibilityHidden(store.flush), [store.flush]);
  useEffect(() => onPageHide(store.endWithBeacon), [store.endWithBeacon]);
}
const TelemetryLoggerContext = createContext(noopLogger);
function TelemetryProvider(_ref) {
  let {
    children,
    store
  } = _ref;
  useTelemetryStoreLifeCycleEvents(store);
  return /* @__PURE__ */jsx(TelemetryLoggerContext.Provider, {
    value: store.logger,
    children
  });
}
function useTelemetry() {
  return useContext(TelemetryLoggerContext);
}
export { TelemetryProvider, useTelemetry, useTelemetryStoreLifeCycleEvents };
//# sourceMappingURL=index.js.map
