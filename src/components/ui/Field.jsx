import { forwardRef, useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/cn';

const control =
  'block w-full rounded-lg border-0 bg-white px-3.5 py-2.5 text-sm text-ink-900 shadow-sm ring-1 ring-ink-200 ring-inset ' +
  'placeholder:text-ink-400 transition focus:ring-2 focus:ring-brand-600 focus:outline-none ' +
  'disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-500';
const invalid = 'ring-brand-500 focus:ring-brand-600';

function FieldShell({ id, label, hint, error, required, className, children }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-700">
          {label}
          {required && <span className="text-brand-600"> *</span>}
        </label>
      )}
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-brand-600" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id, error, hint) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);

export const Input = forwardRef(function Input({ label, hint, error, className, inputClassName, id, required, type = 'text', ...props }, ref) {
  const auto = useId();
  const fid = id || auto;
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <FieldShell id={fid} label={label} hint={hint} error={error} required={required} className={className}>
      <div className="relative">
        <input
          ref={ref}
          id={fid}
          type={isPassword && show ? 'text' : type}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy(fid, error, hint)}
          required={required}
          className={cn(control, error && invalid, isPassword && 'pr-10', inputClassName)}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-ink-400 hover:text-ink-700"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
      </div>
    </FieldShell>
  );
});

export const Select = forwardRef(function Select({ label, hint, error, className, id, required, children, ...props }, ref) {
  const auto = useId();
  const fid = id || auto;
  return (
    <FieldShell id={fid} label={label} hint={hint} error={error} required={required} className={className}>
      <select
        ref={ref}
        id={fid}
        aria-invalid={!!error || undefined}
        aria-describedby={describedBy(fid, error, hint)}
        required={required}
        className={cn(control, 'pr-9', error && invalid)}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
});

export const Textarea = forwardRef(function Textarea({ label, hint, error, className, id, required, rows = 4, ...props }, ref) {
  const auto = useId();
  const fid = id || auto;
  return (
    <FieldShell id={fid} label={label} hint={hint} error={error} required={required} className={className}>
      <textarea
        ref={ref}
        id={fid}
        rows={rows}
        aria-invalid={!!error || undefined}
        aria-describedby={describedBy(fid, error, hint)}
        required={required}
        className={cn(control, 'resize-y', error && invalid)}
        {...props}
      />
    </FieldShell>
  );
});
