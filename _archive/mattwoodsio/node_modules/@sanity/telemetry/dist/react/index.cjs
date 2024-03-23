'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var noopLogger = require('../_chunks/noopLogger-2d3d4fea.cjs');
function useTelemetryStoreLifeCycleEvents(store) {
  react.useEffect(() => noopLogger.onVisibilityHidden(store.flush), [store.flush]);
  react.useEffect(() => noopLogger.onPageHide(store.endWithBeacon), [store.endWithBeacon]);
}
const TelemetryLoggerContext = react.createContext(noopLogger.noopLogger);
function TelemetryProvider(_ref) {
  let {
    children,
    store
  } = _ref;
  useTelemetryStoreLifeCycleEvents(store);
  return /* @__PURE__ */jsxRuntime.jsx(TelemetryLoggerContext.Provider, {
    value: store.logger,
    children
  });
}
function useTelemetry() {
  return react.useContext(TelemetryLoggerContext);
}
exports.TelemetryProvider = TelemetryProvider;
exports.useTelemetry = useTelemetry;
exports.useTelemetryStoreLifeCycleEvents = useTelemetryStoreLifeCycleEvents;
//# sourceMappingURL=index.cjs.map
