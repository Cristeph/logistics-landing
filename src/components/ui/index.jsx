import { AlertCircle, ChevronLeft, ChevronRight, Inbox, Loader2, RotateCw } from 'lucide-react';
import { cn } from '@/lib/cn';
import { STATUS_LABEL } from '@/lib/constants';
import { Button } from './Button';

export { Button, buttonClass } from './Button';
export { Input, Select, Textarea } from './Field';
export { Modal } from './Modal';

export function Card({ className, children, as: Tag = 'div', ...props }) {
  return (
    <Tag className={cn('rounded-2xl border border-ink-100 bg-white shadow-soft', className)} {...props}>
      {children}
    </Tag>
  );
}

export function CardHeader({ title, description, action, className }) {
  return (
    <div className={cn('flex flex-wrap items-start justify-between gap-3 border-b border-ink-100 px-5 py-4', className)}>
      <div className="min-w-0">
        <h2 className="font-sans text-base font-semibold text-ink-900">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-ink-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="font-sans text-2xl font-bold tracking-tight text-ink-900 sm:text-[1.65rem]">{title}</h1>
        {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

const TONES = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  received: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  'in transit': 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  'out for delivery': 'bg-violet-50 text-violet-700 ring-violet-600/20',
  delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  completed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  failed: 'bg-brand-50 text-brand-700 ring-brand-600/20',
  info: 'bg-ink-50 text-ink-700 ring-ink-600/15',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  error: 'bg-brand-50 text-brand-700 ring-brand-600/20',
  admin: 'bg-ink-900 text-white ring-ink-900',
  customer: 'bg-ink-50 text-ink-700 ring-ink-600/15',
  active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  inactive: 'bg-ink-50 text-ink-500 ring-ink-600/15',
};

export function Badge({ tone = 'info', children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap capitalize ring-1 ring-inset',
        TONES[tone] || TONES.info,
        className
      )}
    >
      {children}
    </span>
  );
}

export const StatusBadge = ({ status }) => <Badge tone={status}>{STATUS_LABEL[status] || status || 'Unknown'}</Badge>;

export function Spinner({ className, label = 'Loading' }) {
  return (
    <span role="status" className={cn('inline-flex items-center gap-2 text-sm text-ink-500', className)}>
      <Loader2 className="size-5 animate-spin" aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function LoadingBlock({ label = 'Loading…', className }) {
  return (
    <div className={cn('flex min-h-40 items-center justify-center gap-3 text-sm text-ink-500', className)} role="status">
      <Loader2 className="size-5 animate-spin" aria-hidden />
      {label}
    </div>
  );
}

export function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-md bg-ink-100', className)} aria-hidden />;
}

export function EmptyState({ icon: Icon = Inbox, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-12 text-center', className)}>
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-ink-50 text-ink-400">
        <Icon className="size-6" aria-hidden />
      </div>
      <p className="font-semibold text-ink-900">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-ink-500">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ error, onRetry, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-12 text-center', className)} role="alert">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <AlertCircle className="size-6" aria-hidden />
      </div>
      <p className="font-semibold text-ink-900">Couldn&apos;t load this</p>
      <p className="mt-1 max-w-sm text-sm text-ink-500">{error?.message || 'Something went wrong.'}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-5" onClick={onRetry}>
          <RotateCw className="size-3.5" /> Try again
        </Button>
      )}
    </div>
  );
}

/** Renders loading / error / empty / content for a useAsync result. */
export function AsyncContent({ state, empty, isEmpty, loadingLabel, children }) {
  const { data, error, loading, reload } = state;
  if (loading && (data === null || data === undefined)) return <LoadingBlock label={loadingLabel} />;
  if (error && !data) return <ErrorState error={error} onRetry={reload} />;
  if (isEmpty ? isEmpty(data) : Array.isArray(data) && data.length === 0) return empty;
  return children(data);
}

export function Pagination({ page, totalPages, total, onPage, label: plural = 'results' }) {
  const label = total === 1 ? plural.replace(/s$/, '') : plural;
  if (!totalPages || totalPages <= 1) {
    return total ? <p className="px-5 py-3 text-xs text-ink-500">{total.toLocaleString()} {label}</p> : null;
  }
  return (
    <nav className="flex items-center justify-between gap-3 border-t border-ink-100 px-5 py-3" aria-label="Pagination">
      <p className="text-xs text-ink-500">
        Page <span className="font-medium text-ink-800">{page}</span> of {totalPages} · {total.toLocaleString()} {label}
      </p>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => onPage(page - 1)} aria-label="Previous page">
          <ChevronLeft className="size-4" />
        </Button>
        <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => onPage(page + 1)} aria-label="Next page">
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </nav>
  );
}

export function Table({ head, children, className }) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="min-w-full divide-y divide-ink-100 text-left text-sm">
        <thead className="bg-ink-50/60">
          <tr>
            {head.map((h) => (
              <th
                key={typeof h === 'string' ? h : h.key}
                scope="col"
                className={cn('px-5 py-3 text-xs font-semibold tracking-wide whitespace-nowrap text-ink-500 uppercase', h.className)}
              >
                {typeof h === 'string' ? h : h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100 bg-white">{children}</tbody>
      </table>
    </div>
  );
}

export const Td = ({ className, children, ...props }) => (
  <td className={cn('px-5 py-3.5 align-middle whitespace-nowrap text-ink-700', className)} {...props}>
    {children}
  </td>
);

export function StatCard({ label, value, icon: Icon, hint, tone = 'ink', loading }) {
  const tones = {
    ink: 'bg-ink-50 text-ink-700',
    brand: 'bg-brand-50 text-brand-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink-500">{label}</p>
          {loading ? (
            <Skeleton className="mt-2 h-8 w-24" />
          ) : (
            <p className="mt-1 text-xl font-bold tracking-tight break-words text-ink-900 tabular-nums sm:text-2xl">{value}</p>
          )}
        </div>
        {Icon && (
          <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl', tones[tone])}>
            <Icon className="size-5" aria-hidden />
          </div>
        )}
      </div>
      {hint && <p className="mt-3 text-xs text-ink-500">{hint}</p>}
    </Card>
  );
}
