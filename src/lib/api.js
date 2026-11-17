/**
 * Small fetch wrapper for the Cristeph API.
 * - Auth uses the API's httpOnly session cookie (nothing sensitive is kept in localStorage).
 * - Every request sends X-Requested-With, which the API requires for cookie-authenticated writes.
 * - Errors are normalised to ApiError with a user-friendly message.
 */

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

const listeners = new Set();
/** Subscribe to "session expired" (401 on an authenticated call). Returns an unsubscribe fn. */
export const onUnauthorized = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

const FRIENDLY = {
  0: 'We could not reach the server. Check your connection and try again.',
  429: 'Too many attempts. Please wait a moment and try again.',
  500: 'Something went wrong on our side. Please try again.',
  502: 'The server is waking up or unavailable. Please try again in a moment.',
  503: 'The service is temporarily unavailable. Please try again shortly.',
  504: 'The server took too long to respond. Please try again.',
};

const TIMEOUT_MS = 30_000; // the free-tier API can take a while to wake up

export async function request(path, { method = 'GET', body, query, signal, auth = true } = {}) {
  let url = path.startsWith('/api') ? path : `/api${path}`;
  if (query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') params.set(k, String(v));
    });
    const qs = params.toString();
    if (qs) url += `?${qs}`;
  }

  const timeout = AbortSignal.timeout(TIMEOUT_MS);
  const combined = signal && AbortSignal.any ? AbortSignal.any([signal, timeout]) : signal || timeout;

  let res;
  try {
    res = await fetch(url, {
      method,
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: combined,
    });
  } catch (err) {
    if (signal?.aborted) throw err; // caller cancelled: let it propagate as AbortError
    const timedOut = timeout.aborted;
    throw new ApiError(timedOut ? FRIENDLY[504] : FRIENDLY[0], 0);
  }

  if (res.status === 204) return null;

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    if (res.status === 401 && auth) listeners.forEach((fn) => fn());
    const message = data?.error || data?.message || FRIENDLY[res.status] || `Request failed (${res.status})`;
    throw new ApiError(message, res.status, data?.errors);
  }
  return data;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};
