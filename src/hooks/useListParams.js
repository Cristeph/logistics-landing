import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

/** List filters/pagination kept in the URL, so refresh, back button and shared links work. */
export function useListParams(defaults = {}) {
  const [params, setParams] = useSearchParams();
  const get = (k) => params.get(k) ?? defaults[k] ?? '';
  const page = Math.max(1, Number.parseInt(params.get('page'), 10) || 1);

  const update = useCallback(
    (changes, { resetPage = true } = {}) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          Object.entries(changes).forEach(([k, v]) => (v === '' || v === undefined || v === null ? next.delete(k) : next.set(k, String(v))));
          if (resetPage && !('page' in changes)) next.delete('page');
          return next;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  return { get, page, update, setPage: (p) => update({ page: p > 1 ? p : '' }, { resetPage: false }) };
}
