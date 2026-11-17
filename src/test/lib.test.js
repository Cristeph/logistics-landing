import { describe, expect, it, vi, afterEach } from 'vitest';
import { email, phone, strongPassword, positiveNumber, validate, normaliseTracking, TRACKING_RE } from '@/lib/validators';
import { formatAddress, formatMoney, initials } from '@/lib/format';
import { safeNext } from '@/components/layout/guards';
import { api, ApiError, onUnauthorized } from '@/lib/api';

describe('validators', () => {
  it('validates emails', () => {
    expect(email('')).toMatch(/required/);
    expect(email('nope')).toMatch(/valid/);
    expect(email('a@b.co')).toBe('');
  });

  it('enforces the same password policy as the API', () => {
    expect(strongPassword('short1!')).not.toBe('');
    expect(strongPassword('alllowercase1!')).toMatch(/upper/);
    expect(strongPassword('NoNumbers!!')).toMatch(/number/);
    expect(strongPassword('NoSymbol123')).toMatch(/symbol/);
    expect(strongPassword('x'.repeat(73))).toMatch(/72/);
    expect(strongPassword('Str0ng!Pass')).toBe('');
  });

  it('accepts formatted phone numbers and optional blanks', () => {
    expect(phone()('+234 707-187-1127')).toBe('');
    expect(phone()('12')).not.toBe('');
    expect(phone({ optional: true })('')).toBe('');
  });

  it('rejects non-positive and out-of-range numbers', () => {
    const rule = positiveNumber('Weight', 100);
    expect(rule('')).toMatch(/required/);
    expect(rule('0')).toMatch(/greater/);
    expect(rule('-3')).toMatch(/greater/);
    expect(rule('abc')).toMatch(/greater/);
    expect(rule('101')).toMatch(/at most/);
    expect(rule('2.5')).toBe('');
  });

  it('runs rule maps and stops at the first failure per field', () => {
    const errors = validate({ a: '', b: 'ok' }, { a: [() => 'first', () => 'second'], b: () => '' });
    expect(errors).toEqual({ a: 'first' });
  });

  it('normalises tracking numbers', () => {
    expect(normaliseTracking('  trk-ab12 cd34 ')).toBe('TRK-AB12CD34');
    expect(TRACKING_RE.test('TRK-AB12CD34')).toBe(true);
    expect(TRACKING_RE.test('<script>')).toBe(false);
  });
});

describe('format', () => {
  it('formats addresses with missing parts', () => {
    expect(formatAddress(null)).toBe('-');
    expect(formatAddress({ city: 'Lagos', country: '' })).toBe('Lagos');
    expect(formatAddress({ street: '1 Rd', city: 'Kano', country: 'NG' }, { short: true })).toBe('Kano, NG');
  });
  it('formats money and initials safely', () => {
    expect(formatMoney('abc')).toBe('-');
    expect(formatMoney(1500)).toMatch(/1,500/);
    expect(initials('')).toBe('?');
    expect(initials('ada lovelace byron')).toBe('AL');
  });
});

describe('safeNext (open-redirect guard)', () => {
  it('allows same-site paths only', () => {
    expect(safeNext('/dashboard/payment')).toBe('/dashboard/payment');
    expect(safeNext('//evil.example')).toBeNull();
    expect(safeNext('https://evil.example')).toBeNull();
    expect(safeNext('javascript:alert(1)')).toBeNull();
    expect(safeNext(null)).toBeNull();
  });
});

describe('api client', () => {
  afterEach(() => vi.unstubAllGlobals());

  const respond = (status, body) =>
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(body === undefined ? null : JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json' },
    })));

  it('sends the CSRF header and same-origin credentials', async () => {
    respond(200, { ok: true });
    await api.post('/orders', { a: 1 });
    const [url, init] = fetch.mock.calls[0];
    expect(url).toBe('/api/orders');
    expect(init.credentials).toBe('same-origin');
    expect(init.headers['X-Requested-With']).toBe('XMLHttpRequest');
    expect(init.body).toBe('{"a":1}');
  });

  it('builds query strings and skips empty values', async () => {
    respond(200, []);
    await api.get('/orders/admin', { query: { page: 2, status: '', q: 'TRK A' } });
    expect(fetch.mock.calls[0][0]).toBe('/api/orders/admin?page=2&q=TRK+A');
  });

  it('turns API errors into ApiError with the server message', async () => {
    respond(409, { error: 'Already exists' });
    await expect(api.post('/x', {})).rejects.toMatchObject({ name: 'ApiError', status: 409, message: 'Already exists' });
  });

  it('notifies listeners on 401 unless auth is disabled for the call', async () => {
    const spy = vi.fn();
    const off = onUnauthorized(spy);
    respond(401, { error: 'expired' });
    await expect(api.get('/users/profile')).rejects.toBeInstanceOf(ApiError);
    expect(spy).toHaveBeenCalledTimes(1);
    respond(401, { error: 'bad login' });
    await expect(api.post('/users/login', {}, { auth: false })).rejects.toBeInstanceOf(ApiError);
    expect(spy).toHaveBeenCalledTimes(1);
    off();
  });

  it('reports network failures with a friendly message', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(api.get('/x')).rejects.toMatchObject({ status: 0, message: expect.stringMatching(/reach the server/) });
  });

  it('returns null for 204 responses', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 204 })));
    await expect(api.del('/notifications/1')).resolves.toBeNull();
  });
});
