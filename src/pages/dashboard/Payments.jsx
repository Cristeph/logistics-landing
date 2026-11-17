import { useMemo, useState } from 'react';
import { CheckCircle2, CreditCard, Receipt } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { useAuth } from '@/context/AuthContext';
import { useFeedback } from '@/context/FeedbackContext';
import { api } from '@/lib/api';
import { payWithPaystack } from '@/lib/paystack';
import { formatDate, formatMoney } from '@/lib/format';
import { AsyncContent, Badge, Button, Card, EmptyState, PageHeader, StatCard, StatusBadge, Table, Td } from '@/components/ui';

export default function Payments() {
  const { user } = useAuth();
  const { success, error: toastError, info } = useFeedback();
  const state = useAsync((signal) => api.get('/payments', { signal }), []);
  const [payingId, setPayingId] = useState(null);

  const summary = useMemo(() => {
    const list = state.data || [];
    const sum = (s) => list.filter((p) => p.status === s).reduce((a, p) => a + (p.amount || 0), 0);
    return { due: sum('pending'), paid: sum('completed'), count: list.length };
  }, [state.data]);

  const pay = async (payment) => {
    if (payingId) return; // one checkout at a time
    setPayingId(payment._id);
    try {
      const result = await payWithPaystack({
        email: user.email,
        amount: payment.amount,
        currency: payment.currency || 'NGN',
        metadata: { payment_id: payment._id, tracking_number: payment.order?.trackingNumber },
      });
      if (!result) {
        info('Payment window closed. You have not been charged.');
        return;
      }
      // The API checks the reference with Paystack before marking the invoice as paid.
      const updated = await api.post(`/payments/${payment._id}/verify`, { reference: result.reference });
      state.setData((list) => list.map((p) => (p._id === updated._id ? { ...p, ...updated, order: p.order } : p)));
      success('Payment confirmed. Thank you!');
    } catch (err) {
      toastError(err.message, { title: 'Payment not completed' });
      state.reload();
    } finally {
      setPayingId(null);
    }
  };

  return (
    <>
      <PageHeader title="Payments" description="Invoices for your shipments. Payments are processed securely by Paystack." />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Amount due" value={formatMoney(summary.due)} icon={CreditCard} tone="amber" loading={state.loading && !state.data} />
        <StatCard label="Paid to date" value={formatMoney(summary.paid)} icon={CheckCircle2} tone="green" loading={state.loading && !state.data} />
        <StatCard label="Invoices" value={summary.count} icon={Receipt} loading={state.loading && !state.data} />
      </div>
      <Card>
        <AsyncContent
          state={state}
          empty={<EmptyState icon={Receipt} title="No invoices yet" description="When we invoice a shipment it will appear here for you to pay." />}
        >
          {(payments) => (
            <Table head={['Shipment', 'Amount', 'Issued', 'Status', { key: 'a', label: <span className="sr-only">Action</span> }]}>
              {payments.map((p) => (
                <tr key={p._id}>
                  <Td className="font-mono font-semibold text-ink-900">{p.order?.trackingNumber || <span className="font-sans font-normal text-ink-400">Shipment removed</span>}</Td>
                  <Td className="font-semibold tabular-nums">{formatMoney(p.amount)}</Td>
                  <Td>{formatDate(p.createdAt)}</Td>
                  <Td><StatusBadge status={p.status} /></Td>
                  <Td className="text-right">
                    {p.status === 'completed' ? (
                      <Badge tone="success">Paid {p.paidAt ? formatDate(p.paidAt) : ''}</Badge>
                    ) : p.status === 'failed' ? (
                      <span className="text-xs text-ink-500">Contact support</span>
                    ) : (
                      <Button size="sm" onClick={() => pay(p)} loading={payingId === p._id} disabled={!!payingId && payingId !== p._id}>
                        Pay {formatMoney(p.amount)}
                      </Button>
                    )}
                  </Td>
                </tr>
              ))}
            </Table>
          )}
        </AsyncContent>
      </Card>
    </>
  );
}
