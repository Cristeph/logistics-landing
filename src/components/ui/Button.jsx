import { forwardRef } from 'react';
import { Link } from 'react-router';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

const VARIANTS = {
  primary: 'bg-brand-700 text-white shadow-sm hover:bg-brand-600 active:bg-brand-800',
  dark: 'bg-ink-900 text-white shadow-sm hover:bg-ink-800 active:bg-ink-950',
  secondary: 'bg-white text-ink-800 ring-1 ring-ink-200 ring-inset shadow-sm hover:bg-ink-50',
  ghost: 'text-ink-700 hover:bg-ink-50',
  danger: 'bg-brand-600 text-white shadow-sm hover:bg-brand-500',
  light: 'bg-white text-ink-900 shadow-sm hover:bg-ink-50',
  outlineLight: 'text-white ring-1 ring-white/40 ring-inset hover:bg-white/10',
};

const SIZES = {
  sm: 'h-8 gap-1.5 rounded-lg px-3 text-xs',
  md: 'h-10 gap-2 rounded-lg px-4 text-sm',
  lg: 'h-12 gap-2 rounded-xl px-6 text-base',
  icon: 'size-9 rounded-lg',
};

export const buttonClass = ({ variant = 'primary', size = 'md', className } = {}) =>
  cn(
    'inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap transition-colors duration-150 select-none',
    'disabled:pointer-events-none disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    className
  );

export const Button = forwardRef(function Button(
  { variant, size, className, loading = false, disabled, children, type = 'button', to, href, ...props },
  ref
) {
  const cls = buttonClass({ variant, size, className });
  const content = (
    <>
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {children}
    </>
  );
  if (to) {
    return (
      <Link ref={ref} to={to} className={cls} {...props}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a ref={ref} href={href} className={cls} {...props}>
        {content}
      </a>
    );
  }
  return (
    <button ref={ref} type={type} className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
      {content}
    </button>
  );
});
