import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ArrowRight, Copy, Package, Plus, Search } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { useFeedback } from '@/context/FeedbackContext';
import { api } from '@/lib/api';
import { formatAddress, formatDate } from '@/lib/format';
import { maxLength, minLength, positiveNumber, validate } from '@/lib/validators';
import { ORDER_STATUSES, STATUS_LABEL } from '@/lib/constants';
import { AddressFields, OrderDetails } from '@/components/dashboard/shared';
import { AsyncContent, Button, Card, CardHeader, EmptyState, Input, Modal, PageHeader, Select, StatusBadge, Table, Td } from '@/components/ui';
import { cn } from '@/lib/cn';

const ADDRESS_KEYS = ['street', 'city', 'state', 'postalCode', 'country'];
const EMPTY = {
  ...Object.fromEntries(ADDRESS_KEYS.flatMap((k) => [[`pickup.${k}`, ''], [`dropoff.${k}`, '']])),
  weight: '',
  length: '',
  width: '',
  height: '',
  description: '',
};

const addressRules = (p) => ({
  [`${p}.street`]: minLength('Street address', 2, 200),
  [`${p}.city`]: minLength('City', 2, 100),
  [`${p}.state`]: minLength('State', 2, 100),
  [`${p}.postalCode`]: maxLength('Postal code', 20),
  [`${p}.country`]: minLength('Country', 2, 100),
});
const RULES = {
  ...addressRules('pickup'),
  ...addressRules('dropoff'),
  weight: positiveNumber('Weight', 100000),
  length: positiveNumber('Length', 10000),
  width: positiveNumber('Width', 10000),
  height: positiveNumber('Height', 10000),
  description: maxLength('Description', 500),
};

const pick = (values, p) => Object.fromEntries(ADDRESS_KEYS.map((k) => [k, values[`${p}.${k}`].trim()]));

function NewShipment({ onCreated }) {
  const { success, error: toastError } = useFeedback();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState(null);

  const onChange = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: '' }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(values, RULES);
    setErrors(found);
    if (Object.keys(found).length) {
      document.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    setBusy(true);
    try {
      const { order } = await api.post('/orders', {
        pickupAddress: pick(values, 'pickup'),
        dropoffAddress: pick(values, 'dropoff'),
        packageDetails: {
          weight: Number(values.weight),
          dimensions: { length: Number(values.length), width: Number(values.width), height: Number(values.height) },
          description: values.description.trim(),
        },
      });
      setValues(EMPTY);
      setCreated(order);
      success(`Shipment ${order.trackingNumber} created.`);
      onCreated?.(order);
    } catch (err) {
      toastError(err.message, { title: 'Could not create shipment' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <form onSubmit={submit} noValidate>
        <Card>
          <CardHeader title="Book a new shipment" description="We'll notify you as soon as it's received and at every step after." />
          <div className="grid gap-8 p-5 lg:grid-cols-2">
            <AddressFields prefix="pickup" legend="Pickup address" values={pick(values, 'pickup')} errors={errors} onChange={onChange} />
            <AddressFields prefix="dropoff" legend="Delivery address" values={pick(values, 'dropoff')} errors={errors} onChange={onChange} />
          </div>
          <div className="border-t border-ink-100 p-5">
            <fieldset>
              <legend className="mb-4 text-sm font-semibold text-ink-900">Package</legend>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Input label="Weight (kg)" type="number" inputMode="decimal" min="0" step="0.01" value={values.weight} onChange={onChange('weight')} error={errors.weight} required />
                <Input label="Length (cm)" type="number" inputMode="decimal" min="0" step="0.1" value={values.length} onChange={onChange('length')} error={errors.length} required />
                <Input label="Width (cm)" type="number" inputMode="decimal" min="0" step="0.1" value={values.width} onChange={onChange('width')} error={errors.width} required />
                <Input label="Height (cm)" type="number" inputMode="decimal" min="0" step="0.1" value={values.height} onChange={onChange('height')} error={errors.height} required />
                <Input
                  label="What's inside?"
                  placeholder="e.g. 3 boxes of ceramic tiles"
                  className="sm:col-span-2 lg:col-span-4"
                  value={values.description}
                  onChange={onChange('description')}
                  error={errors.description}
                  maxLength={500}
                  hint="Optional, but it helps customs and handling."
                />
              </div>
            </fieldset>
          </div>
          <div className="flex justify-end gap-2 border-t border-ink-100 bg-ink-50/50 px-5 py-4">
            <Button variant="ghost" onClick={() => { setValues(EMPTY); setErrors({}); }} disabled={busy}>
              Clear
            </Button>
            <Button type="submit" loading={busy}>
              Book shipment
            </Button>
          </div>
        </Card>
      </form>

      <Modal
        open={!!created}
        onClose={() => setCreated(null)}
        title="Shipment booked"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setCreated(null)}>Done</Button>
            <Button to={`/track/${created?.trackingNumber}`}>
              Track it <ArrowRight className="size-4" />
            </Button>
          </>
        }
      >
        <p className="text-sm text-ink-600">Your tracking number is:</p>
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-ink-50 px-4 py-3">
          <span className="font-mono text-lg font-semibold tracking-wide text-ink-900">{created?.trackingNumber}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigator.clipboard?.writeText(created.trackingNumber).then(() => success('Copied to clipboard'), () => {})}
            aria-label="Copy tracking number"
          >
            <Copy className="size-4" />
          </Button>
        </div>
        <p className="mt-3 text-xs text-ink-500">Share it with the recipient so they can follow the delivery.</p>
      </Modal>
    </>
  );
}

function MyShipments({ state }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toUpperCase();
    return (state.data || []).filter(
      (o) =>
        (!status || o.status === status) &&
        (!q || o.trackingNumber.includes(q) || formatAddress(o.dropoffAddress).toUpperCase().includes(q) || (o.packageDetails?.description || '').toUpperCase().includes(q))
    );
  }, [state.data, query, status]);

  return (
    <Card>
      <div className="flex flex-wrap items-center gap-3 border-b border-ink-100 p-4">
        <div className="relative min-w-48 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" aria-hidden />
          <label htmlFor="ship-search" className="sr-only">Search shipments</label>
          <input
            id="ship-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tracking number, destination or contents"
            className="h-10 w-full rounded-lg bg-white pr-3 pl-9 text-sm ring-1 ring-ink-200 ring-inset focus:ring-2 focus:ring-brand-600 focus:outline-none"
          />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className="w-44">
          <option value="">All statuses</option>
          {ORDER_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
        </Select>
      </div>
      <AsyncContent
        state={state}
        empty={<EmptyState icon={Package} title="No shipments yet" description="Shipments you book will appear here." />}
      >
        {() =>
          filtered.length === 0 ? (
            <EmptyState icon={Search} title="No matching shipments" description="Try a different search or status." />
          ) : (
            <Table head={['Tracking', 'Route', 'Package', 'Created', 'Status', { key: 'a', label: <span className="sr-only">Actions</span> }]}>
              {filtered.map((o) => (
                <tr key={o._id} className="hover:bg-ink-50/50">
                  <Td className="font-mono font-semibold text-ink-900">{o.trackingNumber}</Td>
                  <Td>
                    {formatAddress(o.pickupAddress, { short: true })} → {formatAddress(o.dropoffAddress, { short: true })}
                  </Td>
                  <Td className="max-w-48 truncate">{o.packageDetails?.description || `${o.packageDetails?.weight ?? '-'} kg`}</Td>
                  <Td>{formatDate(o.createdAt)}</Td>
                  <Td><StatusBadge status={o.status} /></Td>
                  <Td className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => setSelected(o)}>Details</Button>
                  </Td>
                </tr>
              ))}
            </Table>
          )
        }
      </AsyncContent>
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Shipment details" size="lg"
        footer={<Button to={`/track/${selected?.trackingNumber}`} variant="secondary">Open tracking page</Button>}>
        {selected && <OrderDetails order={selected} />}
      </Modal>
    </Card>
  );
}

export default function Bookings() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') === 'new' ? 'new' : 'list';
  const state = useAsync((signal) => api.get('/orders/my-orders', { signal }), []);
  const setTab = (t) => setParams(t === 'new' ? { tab: 'new' } : {}, { replace: true });

  return (
    <>
      <PageHeader
        title="Shipments"
        description="Book pickups and keep an eye on everything you're sending."
        actions={tab === 'list' && <Button onClick={() => setTab('new')}><Plus className="size-4" /> New shipment</Button>}
      />
      <div className="mb-6 inline-flex rounded-xl bg-white p-1 shadow-soft ring-1 ring-ink-100" role="tablist">
        {[['list', `My shipments${state.data ? ` (${state.data.length})` : ''}`], ['new', 'Book a shipment']].map(([k, label]) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
            className={cn('rounded-lg px-4 py-2 text-sm font-semibold transition', tab === k ? 'bg-ink-900 text-white' : 'text-ink-600 hover:text-ink-900')}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'new' ? (
        <NewShipment onCreated={(o) => state.setData((list) => [o, ...(list || [])])} />
      ) : (
        <MyShipments state={state} />
      )}
    </>
  );
}
