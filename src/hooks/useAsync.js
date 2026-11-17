import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Runs an async loader on mount and whenever deps change. Cancels stale requests so a slow
 * earlier response can never overwrite a newer one, and never sets state after unmount.
 *   const { data, error, loading, reload, setData } = useAsync((signal) => api.get('/x', { signal }), [dep]);
 */
export function useAsync(loader, deps = [], { initialData = null, enabled = true } = {}) {
  const [state, setState] = useState({ data: initialData, error: null, loading: enabled });
  const controllerRef = useRef(null);
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  const run = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await loaderRef.current(controller.signal);
      if (!controller.signal.aborted) setState({ data, error: null, loading: false });
      return data;
    } catch (error) {
      if (controller.signal.aborted || error?.name === 'AbortError') return undefined;
      setState((s) => ({ ...s, error, loading: false }));
      return undefined;
    }
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    run();
    return () => controllerRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, run, ...deps]);

  const setData = useCallback((updater) => {
    setState((s) => ({ ...s, data: typeof updater === 'function' ? updater(s.data) : updater }));
  }, []);

  return { ...state, reload: run, setData };
}
