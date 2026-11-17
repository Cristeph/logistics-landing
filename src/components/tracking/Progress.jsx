import { Check } from 'lucide-react';
import { ORDER_STATUSES, STATUS_LABEL } from '@/lib/constants';
import { formatDateTime } from '@/lib/format';
import { cn } from '@/lib/cn';

export function StatusSteps({ status }) {
  const current = Math.max(0, ORDER_STATUSES.indexOf(status));
  return (
    <ol className="grid grid-cols-5 gap-1" aria-label="Shipment progress">
      {ORDER_STATUSES.map((s, i) => {
        const done = i < current || status === 'delivered';
        const active = i === current && status !== 'delivered';
        return (
          <li key={s} className="flex flex-col items-center text-center" aria-current={i === current ? 'step' : undefined}>
            <div className="flex w-full items-center">
              <span className={cn('h-0.5 flex-1', i === 0 ? 'opacity-0' : i <= current ? 'bg-brand-600' : 'bg-ink-200')} />
              <span
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-4 ring-white',
                  done && 'bg-brand-700 text-white',
                  active && 'bg-white text-brand-700 ring-brand-100 outline-2 outline-brand-600',
                  !done && !active && 'bg-ink-100 text-ink-400'
                )}
              >
                {done ? <Check className="size-4" aria-hidden /> : i + 1}
              </span>
              <span className={cn('h-0.5 flex-1', i === ORDER_STATUSES.length - 1 ? 'opacity-0' : i < current ? 'bg-brand-600' : 'bg-ink-200')} />
            </div>
            <span className={cn('mt-2 text-[0.7rem] leading-tight sm:text-xs', i <= current ? 'font-semibold text-ink-900' : 'text-ink-400')}>
              {STATUS_LABEL[s]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function Timeline({ history = [] }) {
  const items = [...history].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  if (!items.length) return <p className="text-sm text-ink-500">No updates yet.</p>;
  return (
    <ol className="relative space-y-6 border-l border-ink-200 pl-6">
      {items.map((h, i) => (
        <li key={`${h.updatedAt}-${i}`} className="relative">
          <span
            className={cn(
              'absolute top-1 -left-[1.95rem] size-3.5 rounded-full ring-4 ring-white',
              i === 0 ? 'bg-brand-700' : 'bg-ink-300'
            )}
            aria-hidden
          />
          <p className={cn('text-sm', i === 0 ? 'font-semibold text-ink-900' : 'font-medium text-ink-700')}>{h.event}</p>
          <p className="mt-0.5 text-xs text-ink-500">
            {h.location} · {formatDateTime(h.updatedAt)}
          </p>
        </li>
      ))}
    </ol>
  );
}
