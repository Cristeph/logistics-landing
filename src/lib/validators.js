// Client-side checks mirror the API's Joi rules so users get instant, specific feedback.
// The API remains the source of truth and re-validates everything.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const TRACKING_RE = /^TRK-[A-Z0-9]{6,12}$/;

export const normaliseTracking = (s = '') => s.trim().toUpperCase().replace(/\s+/g, '');

export const required = (label) => (v) => (String(v ?? '').trim() ? '' : `${label} is required`);

export const email = (v) => {
  const s = String(v ?? '').trim();
  if (!s) return 'Email is required';
  return EMAIL_RE.test(s) && s.length <= 254 ? '' : 'Enter a valid email address';
};

export const passwordRules = [
  { test: (p) => p.length >= 8, label: 'At least 8 characters' },
  { test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p), label: 'Upper and lower case letters' },
  { test: (p) => /[0-9]/.test(p), label: 'A number' },
  { test: (p) => /[^A-Za-z0-9]/.test(p), label: 'A symbol' },
];

export const strongPassword = (v) => {
  const p = String(v ?? '');
  if (!p) return 'Password is required';
  if (p.length > 72) return 'Password must be at most 72 characters';
  const failed = passwordRules.find((r) => !r.test(p));
  return failed ? `Password needs: ${failed.label.toLowerCase()}` : '';
};

export const phone = ({ optional = false } = {}) => (v) => {
  const s = String(v ?? '').replace(/[\s().-]/g, '');
  if (!s) return optional ? '' : 'Phone number is required';
  return /^\+?[0-9]{7,15}$/.test(s) ? '' : 'Enter a valid phone number (7-15 digits)';
};

export const positiveNumber = (label, max) => (v) => {
  if (v === '' || v === null || v === undefined) return `${label} is required`;
  const n = Number(v);
  if (!Number.isFinite(n) || n <= 0) return `${label} must be greater than 0`;
  if (max && n > max) return `${label} must be at most ${max.toLocaleString()}`;
  return '';
};

export const minLength = (label, min, max) => (v) => {
  const s = String(v ?? '').trim();
  if (!s) return `${label} is required`;
  if (s.length < min) return `${label} must be at least ${min} characters`;
  if (max && s.length > max) return `${label} must be at most ${max} characters`;
  return '';
};

export const maxLength = (label, max) => (v) =>
  String(v ?? '').trim().length > max ? `${label} must be at most ${max} characters` : '';

/** Runs a { field: validator | validator[] } map and returns { field: message } for failures. */
export const validate = (values, rules) => {
  const errors = {};
  Object.entries(rules).forEach(([field, fns]) => {
    for (const fn of [].concat(fns)) {
      const msg = fn(values[field], values);
      if (msg) {
        errors[field] = msg;
        break;
      }
    }
  });
  return errors;
};
