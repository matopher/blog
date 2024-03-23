/**
 * Trigger a callback after hot-module reloads (any, not only the module using the hook).
 * Use it to force recomputation of stale values and state that do not automatically update.
 * This should be an escape hatch - ideally you shouldn't need this.
 *
 * @param callback - The callback to be triggered after hot-module reloads.
 */
declare function useHotModuleReload(callback: () => void): void;

export { useHotModuleReload };
