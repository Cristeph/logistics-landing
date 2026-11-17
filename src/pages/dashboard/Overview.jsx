import { useMemo } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Bell, CreditCard, Package, PackageCheck, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';
import { formatMoney, formatDate, timeAgo, formatAddress } from '@/lib/format';
import { Button, Card, CardHeader, EmptyState, ErrorState, LoadingBlock, PageHeader, StatCard, StatusBadge } from '@/components/ui';
import { BarChart } from '@/components/dashboard/shared';

const MONTHS = 6;

export default function Overview() {
  const { user } = useAuth();
  const state = useAsync(
    (signal) =>
      Promise.all([
        api.get('/orders/my-orders', { signal }),
        api.get('/payments', { signal }),
        api.get('/notifications', { signal }),
      ]).then(([orders, payments, notifications]) => ({ orders, payments, notifications })),
    []
  );

  const stats = useMemo(() => {
    const { orders = [], payments = [], notifications = [] } = state.data || {};
    const active = orders.filter((o) => o.status !== 'delivered').length;
    const due = payments.filter((p) => p.status === 'pending');
    const now = new Date();
    const months = Array.from({ length: MONTHS }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (MONTHS - 1 - i), 1);
      return { key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleString('en', { month: 'short' }), value: 0 };
    });
    orders.forEach((o) => {
      const d = new Date(o.createdAt);
      const m = months.find((x) => x.key === `${d.getFullYear()}-${d.getMonth()}`);
      if (m) m.value += 1;
    });
    return {
      total: orders.length,
      active,
      dueCount: due.length,
      dueAmount: due.reduce((s, p) => s + (p.amount || 0), 0),
      unread: notifications.filter((n) => !n.read).length,
      months,
    };
  }, [state.data]);

  const firstName = user?.name?.split(' ')[0] || 'there';

  if (state.error && !state.data) return <ErrorState error={state.error} onRetry={state.reload} />;

  return (
    <>
      <PageHeader
        title={`Hello, ${firstName}`}
        description="Here's what's happening with your shipments."
        actions={
          <Button to="/dashboard/booking">
            <Plus className="size-4" /> New shipment
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total shipments" value={stats.total} icon={Package} loading={state.loading} />
        <StatCard label="In progress" value={stats.active} icon={PackageCheck} tone="brand" loading={state.loading} />
        <StatCard label="Amount due" value={formatMoney(stats.dueAmount)} icon={CreditCard} tone="amber" hint={`${stats.dueCount} unpaid invoice${stats.dueCount === 1 ? '' : 's'}`} loading={state.loading} />
        <StatCard label="Unread notifications" value={stats.unread} icon={Bell} tone="green" loading={state.loading} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader
            title="Recent shipments"
            action={
              <Link to="/dashboard/booking" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-600">
                View all <ArrowRight className="size-4" />
              </Link>
            }
          />
          {state.loading && !state.data ? (
            <LoadingBlock />
          ) : !state.data?.orders.length ? (
            <EmptyState icon={Package} title="No shipments yet" description="Book your first pickup and it will show up here." action={<Button to="/dashboard/booking" size="sm">Book a shipment</Button>} />
          ) : (
            <ul className="divide-y divide-ink-100">
              {state.data.orders.slice(0, 5).map((o) => (
                <li key={o._id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                  <div className="min-w-0">
                    <Link to={`/track/${o.trackingNumber}`} className="font-mono text-sm font-semibold text-ink-900 hover:text-brand-700">
                      {o.trackingNumber}
                    </Link>
                    <p className="mt-0.5 truncate text-xs text-ink-500">
                      {formatAddress(o.pickupAddress, { short: true })} → {formatAddress(o.dropoffAddress, { short: true })} · {formatDate(o.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={o.status} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Shipments per month" description={`Last ${MONTHS} months`} />
            <div className="p-5">
              <BarChart data={stats.months} />
            </div>
          </Card>
          <Card>
            <CardHeader
              title="Latest notifications"
              action={<Link to="/dashboard/notifications" className="text-sm font-semibold text-brand-700 hover:text-brand-600">View all</Link>}
            />
            {!state.data?.notifications.length ? (
              <p className="px-5 py-6 text-sm text-ink-500">You&apos;re all caught up.</p>
            ) : (
              <ul className="divide-y divide-ink-100">
                {state.data.notifications.slice(0, 4).map((n) => (
                  <li key={n._id} className="flex gap-3 px-5 py-3.5">
                    <span className={`mt-1.5 size-2 shrink-0 rounded-full ${n.read ? 'bg-ink-200' : 'bg-brand-600'}`} aria-hidden />
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm text-ink-800">{n.message}</p>
                      <p className="mt-0.5 text-xs text-ink-500">{timeAgo(n.createdAt)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
