import { useState } from 'react';
import { Wallet } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { useListParams } from '@/hooks/useListParams';
import { useFeedback } from '@/context/FeedbackContext';
import { api } from '@/lib/api';
import { formatAddress, formatDate, formatDateTime, formatMoney } from '@/lib/format';
import { PAYMENT_METHODS } from '@/lib/constants';
import { AsyncContent, Button, Card, EmptyState, Input, Modal, PageHeader, Pagination, Select, StatusBadge, Table, Td } from '@/components/ui';
import { cn } from '@/lib/cn';

const methodLabel = (m) => PAYMENT_METHODS.find((x) => x.value === m)?.label || m;

function PaymentPanel({ payment, onChange, onDeleted, onClose }) {
  const { success, error: toastError, confirm } = useFeedback();
  const [reference, setReference] = useState('');
  const [busy, setBusy] = useState('');

  const setStatus = async (status) => {
    if (status === 'completed' && reference && !/^[A-Za-z0-9._=-]{1,100}$/.test(reference.trim())) {
      toastError('Reference may only contain letters, numbers and . _ = -');
      return;
    }
    const ok = await confirm({
      title: status === 'completed' ? 'Mark as paid?' : 'Mark as failed?',
      message: status === 'completed' ? 'Only do this if you have received the money outside the website (e.g. a bank transfer).' : 'The customer will no longer be able to pay this invoice online.',
      confirmLabel: status === 'completed' ? 'Mark as paid' : 'Mark as failed',
      tone: status === 'failed' ? 'danger' : 'primary',
    });
    if (!ok) return;
    setBusy(status);
    try {
      const updated = await api.put(`/payments/${payment._id}/status`, { status, ...(reference.trim() ? { transactionId: reference.trim() } : {}) });
      onChange({ ...payment, ...updated, order: payment.order, user: payment.user });
      success('Payment updated');
    } catch (err) {
      toastError(err.message);
    } finally {
      setBusy('');
    }
  };

  const remove = async () => {
    if (!(await confirm({ title: 'Delete this invoice?', message: 'The customer will no longer see it. This cannot be undone.', confirmLabel: 'Delete', tone: 'danger' }))) return;
    setBusy('delete');
    try {
      await api.del(`/payments/${payment._id}`);
      success('Invoice deleted');
      onDeleted(payment._id);
    } catch (err) {
      toastError(err.message);
      setBusy('');
    }
  };

  const o = payment.order;
  return (
    <Modal open onClose={onClose} title="Invoice" description={payment._id} size="md">
      <dl className="grid grid-cols-2 gap-4 text-sm">
        <div><dt className="text-xs text-ink-500">Amount</dt><dd className="text-lg font-bold text-ink-900">{formatMoney(payment.amount)}</dd></div>
        <div><dt className="text-xs text-ink-500">Status</dt><dd className="mt-1"><StatusBadge status={payment.status} /></dd></div>
        <div><dt className="text-xs text-ink-500">Customer</dt><dd className="text-ink-900">{payment.user?.name || 'Deleted account'}<span className="block text-xs text-ink-500">{payment.user?.email}</span></dd></div>
        <div><dt className="text-xs text-ink-500">Method</dt><dd className="text-ink-900">{methodLabel(payment.method)}</dd></div>
        <div><dt className="text-xs text-ink-500">Shipment</dt><dd className="font-mono text-ink-900">{o?.trackingNumber || '-'}</dd></div>
        <div><dt className="text-xs text-ink-500">Issued</dt><dd className="text-ink-900">{formatDateTime(payment.createdAt)}</dd></div>
        {o && <div className="col-span-2"><dt className="text-xs text-ink-500">Route</dt><dd className="text-ink-900">{formatAddress(o.pickupAddress, { short: true })} → {formatAddress(o.dropoffAddress, { short: true })}</dd></div>}
        {payment.transactionId && <div className="col-span-2"><dt className="text-xs text-ink-500">Reference</dt><dd className="font-mono break-all text-ink-900">{payment.transactionId}</dd></div>}
        {payment.paidAt && <div className="col-span-2"><dt className="text-xs text-ink-500">Paid</dt><dd className="text-ink-900">{formatDateTime(payment.paidAt)}</dd></div>}
      </dl>
      {payment.status !== 'completed' && (
        <div className="mt-6 space-y-4 border-t border-ink-100 pt-6">
          <Input label="Payment reference" hint="Optional: bank transfer or receipt reference" value={reference} onChange={(e) => setReference(e.target.value)} maxLength={100} />
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setStatus('completed')} loading={busy === 'completed'} disabled={!!busy}>Mark as paid</Button>
            {payment.status !== 'failed' && <Button variant="secondary" onClick={() => setStatus('failed')} loading={busy === 'failed'} disabled={!!busy}>Mark as failed</Button>}
            {payment.status === 'failed' && <Button variant="secondary" onClick={() => setStatus('pending')} loading={busy === 'pending'} disabled={!!busy}>Reopen</Button>}
            <Button variant="ghost" className="ml-auto text-brand-700" onClick={remove} loading={busy === 'delete'} disabled={!!busy}>Delete</Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default function AdminPayments() {
  const { get, page, update, setPage } = useListParams();
  const status = get('status');
  const [selected, setSelected] = useState(null);
  const state = useAsync((signal) => api.get('/payments/admin', { signal, query: { page, limit: 20, status } }), [page, status]);

  const patch = (p) => {
    setSelected(p);
    state.setData((d) => d && { ...d, data: d.data.map((x) => (x._id === p._id ? p : x)) });
  };

  return (
    <>
      <PageHeader title="Payments" description="Invoices across all customers. Create new invoices from an order." />
      <Card>
        <div className="flex flex-wrap gap-1 border-b border-ink-100 p-2" role="tablist">
          {[['', 'All'], ['pending', 'Unpaid'], ['completed', 'Paid'], ['failed', 'Failed']].map(([k, l]) => (
            <button key={k || 'all'} type="button" role="tab" aria-selected={status === k} onClick={() => update({ status: k })}
              className={cn('rounded-lg px-3 py-1.5 text-sm font-medium', status === k ? 'bg-ink-100 text-ink-900' : 'text-ink-500 hover:text-ink-800')}>
              {l}
            </button>
          ))}
        </div>
        <AsyncContent state={state} isEmpty={(d) => !d?.data?.length} empty={<EmptyState icon={Wallet} title="No invoices here" />}>
          {(d) => (
            <div className={cn(state.loading && 'opacity-60 transition-opacity')}>
              <Table
                head={[
                  { key: 'issued', label: 'Issued', className: 'hidden lg:table-cell' },
                  'Customer',
                  'Shipment',
                  { key: 'method', label: 'Method', className: 'hidden xl:table-cell' },
                  { key: 'amt', label: 'Amount', className: 'text-right' },
                  'Status',
                  { key: 'a', label: <span className="sr-only">Actions</span> },
                ]}
              >
                {d.data.map((p) => (
                  <tr key={p._id} className="hover:bg-ink-50/50">
                    <Td className="hidden lg:table-cell">{formatDate(p.createdAt)}</Td>
                    <Td>{p.user?.name || <span className="text-ink-400">Deleted account</span>}<span className="block text-xs text-ink-500">{p.user?.email}</span></Td>
                    <Td className="font-mono">{p.order?.trackingNumber || '-'}</Td>
                    <Td className="hidden xl:table-cell">{methodLabel(p.method)}</Td>
                    <Td className="text-right font-semibold tabular-nums">{formatMoney(p.amount)}</Td>
                    <Td><StatusBadge status={p.status} /></Td>
                    <Td className="text-right"><Button variant="secondary" size="sm" onClick={() => setSelected(p)}>View</Button></Td>
                  </tr>
                ))}
              </Table>
              <Pagination page={d.page} totalPages={d.totalPages} total={d.total} onPage={setPage} label="invoices" />
            </div>
          )}
        </AsyncContent>
      </Card>
      {selected && (
        <PaymentPanel
          key={selected._id}
          payment={selected}
          onChange={patch}
          onDeleted={(id) => {
            setSelected(null);
            state.setData((d) => d && { ...d, data: d.data.filter((x) => x._id !== id), total: d.total - 1 });
          }}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
