const naira = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0, maximumFractionDigits: 2 });
const number = new Intl.NumberFormat('en-NG');
const dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const dateTimeFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const relative = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const toDate = (v) => {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const formatMoney = (amount) => (Number.isFinite(Number(amount)) ? naira.format(Number(amount)) : '-');
export const formatNumber = (n) => (Number.isFinite(Number(n)) ? number.format(Number(n)) : '-');
export const formatDate = (v) => (toDate(v) ? dateFmt.format(toDate(v)) : '-');
export const formatDateTime = (v) => (toDate(v) ? dateTimeFmt.format(toDate(v)) : '-');

export const timeAgo = (v) => {
  const d = toDate(v);
  if (!d) return '';
  const seconds = Math.round((d.getTime() - Date.now()) / 1000);
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [unit, s] of units) {
    if (Math.abs(seconds) >= s) return relative.format(Math.round(seconds / s), unit);
  }
  return 'just now';
};

/** Joins the non-empty parts of an address, tolerating missing objects/fields. */
export const formatAddress = (a, { short = false } = {}) => {
  if (!a) return '-';
  const parts = short ? [a.city, a.country] : [a.street, a.city, a.state, a.postalCode, a.country];
  const text = parts.filter((p) => p && String(p).trim()).join(', ');
  return text || '-';
};

export const titleCase = (s = '') => s.replace(/\b\w/g, (c) => c.toUpperCase());

export const initials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || '')
    .join('') || '?';
