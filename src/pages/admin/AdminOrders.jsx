import { useEffect, useState } from 'react';
import { ClipboardList, Search } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { useDebounce } from '@/hooks/misc';
import { useListParams } from '@/hooks/useListParams';
import { useFeedback } from '@/context/FeedbackContext';
import { api } from '@/lib/api';
import { formatAddress, formatDate, formatMoney } from '@/lib/format';
import { ORDER_STATUSES, PAYMENT_METHODS, STATUS_LABEL } from '@/lib/constants';
import { minLength, positiveNumber, validate } from '@/lib/validators';
import { OrderDetails } from '@/components/dashboard/shared';
import LocationSearch from '@/components/dashboard/LocationSearch';
import { AsyncContent, Button, Card, EmptyState, Input, Modal, PageHeader, Pagination, Select, StatusBadge, Table, Td } from '@/components/ui';
import { cn } from '@/lib/cn';

function StatusForm({ order, onSaved }) {
  const { success, error: toastError } = useFeedback();
  const [status, setStatus] = useState(order.status);
  const [busy, setBusy] = useState(false);
  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { order: updated } = await api.put(`/orders/${order._id}/status`, { status });
      success(`Status set to ${STATUS_LABEL[status]}. The customer was notified.`);
      onSaved(updated);
    } catch (err) {
      toastError(err.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={save} className="space-y-4">
      <Select label="Order status" value={status} onChange={(e) => setStatus(e.target.value)}>
        {ORDER_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
      </Select>
      <Button type="submit" loading={busy} disabled={status === order.status}>Update status</Button>
    </form>
  );
}

const EMPTY_LOC = { location: '', latitude: undefined, longitude: undefined };

export function HistoryForm({ submit, buttonLabel = 'Add update' }) {
  const [loc, setLoc] = useState(EMPTY_LOC);
  const [event, setEvent] = useState('');
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate({ location: loc.location, event }, { location: minLength('Location', 2, 300), event: minLength('Update', 2, 500) });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    const ok = await submit({ location: loc.location.trim(), event: event.trim(), ...(Number.isFinite(loc.latitude) ? { latitude: loc.latitude, longitude: loc.longitude } : {}) });
    setBusy(false);
    if (ok) {
      setLoc(EMPTY_LOC);
      setEvent('');
    }
  };
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <LocationSearch value={loc} onChange={(v) => { setLoc(v); setErrors((er) => ({ ...er, location: '' })); }} error={errors.location} required />
      <Input label="Update" placeholder="e.g. Arrived at Lagos sorting hub" value={event} onChange={(e) => { setEvent(e.target.value); setErrors((er) => ({ ...er, event: '' })); }} error={errors.event} maxLength={500} required />
      <Button type="submit" loading={busy}>{buttonLabel}</Button>
    </form>
  );
}

function InvoiceForm({ order, onDone }) {
  const { success, error: toastError } = useFeedback();
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('credit_card');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const msg = positiveNumber('Amount', 1e9)(amount) || (!/^\d+(\.\d{1,2})?$/.test(String(amount).trim()) ? 'Use at most 2 decimal places' : '');
    setError(msg);
    if (msg) return;
    setBusy(true);
    try {
      await api.post('/payments', { orderId: order._id, amount: Number(amount), method });
      success(`Invoice of ${formatMoney(amount)} sent to ${order.customer?.name || 'the customer'}.`);
      onDone();
    } catch (err) {
      if (err.status === 409) setError(err.message);
      else toastError(err.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <Input label="Amount (₦)" type="number" inputMode="decimal" min="0" step="0.01" value={amount} onChange={(e) => { setAmount(e.target.value); setError(''); }} error={error} required />
      <Select label="Payment method" value={method} onChange={(e) => setMethod(e.target.value)}>
        {PAYMENT_METHODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
      </Select>
      <p className="text-xs text-ink-500">The customer is notified and can pay it from their Payments page.</p>
      <Button type="submit" loading={busy} disabled={!order.customer}>Create invoice</Button>
    </form>
  );
}

function OrderPanel({ order, onChange, onClose }) {
  const [tab, setTab] = useState('details');
  const { success, error: toastError } = useFeedback();
  const tabs = [['details', 'Details'], ['status', 'Status'], ['history', 'Add update'], ['invoice', 'Invoice']];
  return (
    <Modal open onClose={onClose} title={`Order ${order.trackingNumber}`} description={order.customer?.email} size="lg">
      <div className="-mt-1 mb-5 flex gap-1 overflow-x-auto rounded-xl bg-ink-50 p-1" role="tablist">
        {tabs.map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
            className={cn('flex-1 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap', tab === k ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-800')}>
            {l}
          </button>
        ))}
      </div>
      {tab === 'details' && <OrderDetails order={order} showCustomer />}
      {tab === 'status' && <StatusForm order={order} onSaved={(u) => onChange({ ...order, status: u.status, deliveredAt: u.deliveredAt })} />}
      {tab === 'history' && (
        <HistoryForm
          submit={async (entry) => {
            try {
              const updated = await api.put(`/orders/${order._id}/history`, entry);
              onChange({ ...order, history: updated.history });
              success('Update added. The customer was notified.');
              setTab('details');
              return true;
            } catch (err) {
              toastError(err.message);
              return false;
            }
          }}
        />
      )}
      {tab === 'invoice' && <InvoiceForm order={order} onDone={() => setTab('details')} />}
    </Modal>
  );
}

export default function AdminOrders() {
  const { get, page, update, setPage } = useListParams();
  const status = get('status');
  const [q, setQ] = useState(get('q'));
  const debouncedQ = useDebounce(q.trim(), 350);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (debouncedQ !== get('q')) update({ q: debouncedQ });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ]);

  const state = useAsync(
    (signal) => api.get('/orders/admin', { signal, query: { page, limit: 20, status, q: get('q') } }),
    [page, status, get('q')]
  );

  const replaceOrder = (o) => {
    setSelected(o);
    state.setData((d) => d && { ...d, data: d.data.map((x) => (x._id === o._id ? o : x)) });
  };

  return (
    <>
      <PageHeader title="Orders" description="Update statuses, add tracking events and invoice customers." />
      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-ink-100 p-4">
          <div className="relative min-w-52 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" aria-hidden />
            <label htmlFor="order-search" className="sr-only">Search by tracking number</label>
            <input id="order-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tracking number" maxLength={20}
              className="h-10 w-full rounded-lg bg-white pr-3 pl-9 text-sm uppercase ring-1 ring-ink-200 ring-inset placeholder:normal-case focus:ring-2 focus:ring-brand-600 focus:outline-none" />
          </div>
          <Select aria-label="Filter by status" className="w-48" value={status} onChange={(e) => update({ status: e.target.value })}>
            <option value="">All statuses</option>
            {ORDER_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
          </Select>
        </div>
        <AsyncContent
          state={state}
          isEmpty={(d) => !d?.data?.length}
          empty={<EmptyState icon={ClipboardList} title={status || get('q') ? 'No matching orders' : 'No orders yet'} description={status || get('q') ? 'Try clearing the filters.' : undefined} />}
        >
          {(d) => (
            <div className={cn(state.loading && 'opacity-60 transition-opacity')}>
              <Table
                head={[
                  'Tracking',
                  'Customer',
                  'Route',
                  { key: 'courier', label: 'Courier', className: 'hidden 2xl:table-cell' },
                  { key: 'created', label: 'Created', className: 'hidden lg:table-cell' },
                  'Status',
                  { key: 'a', label: <span className="sr-only">Actions</span> },
                ]}
              >
                {d.data.map((o) => (
                  <tr key={o._id} className="hover:bg-ink-50/50">
                    <Td className="font-mono font-semibold text-ink-900">{o.trackingNumber}</Td>
                    <Td>
                      {o.customer ? (
                        <>
                          <span className="block font-medium text-ink-900">{o.customer.name}</span>
                          <span className="text-xs text-ink-500">{o.customer.email}</span>
                        </>
                      ) : <span className="text-ink-400">Deleted account</span>}
                    </Td>
                    <Td className="min-w-44 whitespace-normal">{formatAddress(o.pickupAddress, { short: true })} → {formatAddress(o.dropoffAddress, { short: true })}</Td>
                    <Td className="hidden 2xl:table-cell">{o.courier?.name || <span className="text-ink-400">Unassigned</span>}</Td>
                    <Td className="hidden lg:table-cell">{formatDate(o.createdAt)}</Td>
                    <Td><StatusBadge status={o.status} /></Td>
                    <Td className="text-right"><Button variant="secondary" size="sm" onClick={() => setSelected(o)}>Manage</Button></Td>
                  </tr>
                ))}
              </Table>
              <Pagination page={d.page} totalPages={d.totalPages} total={d.total} onPage={setPage} label="orders" />
            </div>
          )}
        </AsyncContent>
      </Card>
      {selected && <OrderPanel key={selected._id} order={selected} onChange={replaceOrder} onClose={() => setSelected(null)} />}
    </>
  );
}
