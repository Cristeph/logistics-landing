import { Link } from 'react-router';
import { ArrowRight, ClipboardList, CreditCard, Truck, Users, Wallet } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';
import { formatAddress, formatDate, formatMoney, formatNumber } from '@/lib/format';
import { ORDER_STATUSES, STATUS_LABEL } from '@/lib/constants';
import { Card, CardHeader, ErrorState, LoadingBlock, PageHeader, StatCard, StatusBadge } from '@/components/ui';
import { BarChart } from '@/components/dashboard/shared';

export default function AdminOverview() {
  const stats = useAsync((signal) => api.get('/orders/admin/stats', { signal }), []);
  const recent = useAsync((signal) => api.get('/orders/admin', { signal, query: { limit: 6 } }), []);
  const s = stats.data;
  const loading = stats.loading && !s;

  // Fill the last 14 days so quiet days show as empty bars rather than disappearing.
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const key = d.toISOString().slice(0, 10);
    const label = i === 0 || d.getDate() === 1 ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : String(d.getDate());
    return { label, value: s?.ordersLast30Days?.find((x) => x.date === key)?.count || 0 };
  });

  if (stats.error && !s) return <ErrorState error={stats.error} onRetry={stats.reload} />;

  return (
    <>
      <PageHeader title="Operations overview" description="Orders, revenue and activity across Cristeph." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total orders" value={formatNumber(s?.totalOrders)} icon={ClipboardList} loading={loading} hint={s && `${formatNumber(s.totalOrders - (s.ordersByStatus?.delivered || 0))} in progress`} />
        <StatCard label="Revenue collected" value={formatMoney(s?.revenue)} icon={Wallet} tone="green" loading={loading} hint={s && `${formatNumber(s.completedPayments)} paid invoices`} />
        <StatCard label="Outstanding" value={formatMoney(s?.outstanding)} icon={CreditCard} tone="amber" loading={loading} hint={s && `${formatNumber(s.pendingPayments)} unpaid invoices`} />
        <StatCard label="Customers" value={formatNumber(s?.customers)} icon={Users} tone="brand" loading={loading} hint={s && `${formatNumber(s.activeCouriers)} active couriers`} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader title="New orders" description="Last 14 days" />
          <div className="p-5">{loading ? <LoadingBlock /> : <BarChart data={days} height={220} />}</div>
        </Card>
        <Card>
          <CardHeader title="Orders by status" />
          <ul className="space-y-4 p-5">
            {ORDER_STATUSES.map((st) => {
              const count = s?.ordersByStatus?.[st] || 0;
              const pct = s?.totalOrders ? Math.round((count / s.totalOrders) * 100) : 0;
              return (
                <li key={st}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <Link to={`/dashboard/ordermanagement?status=${encodeURIComponent(st)}`} className="font-medium text-ink-800 hover:text-brand-700">{STATUS_LABEL[st]}</Link>
                    <span className="text-ink-500 tabular-nums">{formatNumber(count)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-ink-100">
                    <div className="h-full rounded-full bg-ink-800" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader
          title="Latest orders"
          action={<Link to="/dashboard/ordermanagement" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">Manage orders <ArrowRight className="size-4" /></Link>}
        />
        {recent.loading && !recent.data ? (
          <LoadingBlock />
        ) : recent.error ? (
          <ErrorState error={recent.error} onRetry={recent.reload} />
        ) : !recent.data?.data.length ? (
          <p className="px-5 py-8 text-center text-sm text-ink-500">No orders yet.</p>
        ) : (
          <ul className="divide-y divide-ink-100">
            {recent.data.data.map((o) => (
              <li key={o._id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="font-mono text-sm font-semibold text-ink-900">{o.trackingNumber}</p>
                  <p className="truncate text-xs text-ink-500">
                    {o.customer?.name || 'Deleted account'} · {formatAddress(o.pickupAddress, { short: true })} → {formatAddress(o.dropoffAddress, { short: true })} · {formatDate(o.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {o.courier ? <span className="hidden items-center gap-1 text-xs text-ink-500 sm:inline-flex"><Truck className="size-3.5" />{o.courier.name}</span> : null}
                  <StatusBadge status={o.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
