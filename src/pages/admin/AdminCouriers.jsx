import { useEffect, useState } from 'react';
import { History, MapPin, PackagePlus, Plus, RefreshCw, Search, Truck, X } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { useDebounce } from '@/hooks/misc';
import { useFeedback } from '@/context/FeedbackContext';
import { api } from '@/lib/api';
import { ORDER_STATUSES, STATUS_LABEL, VEHICLE_TYPES } from '@/lib/constants';
import { email, minLength, phone, validate } from '@/lib/validators';
import LocationSearch from '@/components/dashboard/LocationSearch';
import { HistoryForm } from './AdminOrders';
import { AsyncContent, Badge, Button, Card, EmptyState, Input, Modal, PageHeader, Select, StatusBadge, Table, Td } from '@/components/ui';

function CreateCourier({ onCreated, onClose }) {
  const { success, error: toastError } = useFeedback();
  const [v, setV] = useState({ name: '', phoneNumber: '', email: '', type: 'bike', licensePlate: '' });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => {
    setV((x) => ({ ...x, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: '' }));
  };
  const submit = async (e) => {
    e.preventDefault();
    const found = validate(v, {
      name: minLength('Name', 2, 80),
      phoneNumber: phone(),
      email,
      licensePlate: (x) => (/^[A-Za-z0-9 -]{2,15}$/.test(String(x).trim()) ? '' : 'Use 2-15 letters, numbers, spaces or dashes'),
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    try {
      const courier = await api.post('/couriers', {
        name: v.name.trim(),
        phoneNumber: v.phoneNumber.trim(),
        email: v.email.trim(),
        vehicle: { type: v.type, licensePlate: v.licensePlate.trim() },
      });
      success(`${courier.name} added`);
      onCreated(courier);
    } catch (err) {
      if (err.status === 409) setErrors({ email: 'A courier with this email already exists' });
      else toastError(err.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Modal open onClose={onClose} title="Add courier" size="md">
      <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
        <Input label="Full name" className="sm:col-span-2" value={v.name} onChange={set('name')} error={errors.name} required maxLength={80} autoFocus />
        <Input label="Phone" type="tel" value={v.phoneNumber} onChange={set('phoneNumber')} error={errors.phoneNumber} required />
        <Input label="Email" type="email" value={v.email} onChange={set('email')} error={errors.email} required />
        <Select label="Vehicle" value={v.type} onChange={set('type')}>
          {VEHICLE_TYPES.map((t) => <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>)}
        </Select>
        <Input label="Licence plate" value={v.licensePlate} onChange={set('licensePlate')} error={errors.licensePlate} required maxLength={15} inputClassName="uppercase" />
        <div className="flex justify-end gap-2 sm:col-span-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={busy}>Add courier</Button>
        </div>
      </form>
    </Modal>
  );
}

function AssignOrders({ courier, onDone, onClose }) {
  const { success, error: toastError } = useFeedback();
  const [q, setQ] = useState('');
  const dq = useDebounce(q.trim(), 300);
  const [picked, setPicked] = useState([]);
  const [busy, setBusy] = useState(false);
  const results = useAsync(
    (signal) => api.get('/orders/admin', { signal, query: { q: dq, limit: 8 } }).then((r) => r.data.filter((o) => o.status !== 'delivered')),
    [dq],
    { enabled: dq.length >= 3 }
  );
  const toggle = (o) => setPicked((p) => (p.some((x) => x._id === o._id) ? p.filter((x) => x._id !== o._id) : [...p, o]));
  const submit = async () => {
    setBusy(true);
    try {
      const updated = await api.put(`/couriers/${courier._id}/assign-orders`, { orderIds: picked.map((o) => o._id) });
      success(`${picked.length} order${picked.length === 1 ? '' : 's'} assigned to ${courier.name}`);
      onDone(updated);
    } catch (err) {
      toastError(err.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Modal open onClose={onClose} title={`Assign orders to ${courier.name}`} size="md"
      footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button onClick={submit} loading={busy} disabled={!picked.length}>Assign {picked.length || ''}</Button></>}>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" aria-hidden />
        <label htmlFor="assign-search" className="sr-only">Search orders by tracking number</label>
        <input id="assign-search" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type at least 3 characters of a tracking number" maxLength={20}
          className="h-10 w-full rounded-lg pr-3 pl-9 text-sm uppercase ring-1 ring-ink-200 ring-inset placeholder:normal-case focus:ring-2 focus:ring-brand-600 focus:outline-none" />
      </div>
      <div className="mt-3 min-h-24">
        {dq.length < 3 ? null : results.loading ? (
          <p className="py-4 text-center text-sm text-ink-500">Searching…</p>
        ) : !results.data?.length ? (
          <p className="py-4 text-center text-sm text-ink-500">No open orders match.</p>
        ) : (
          <ul className="divide-y divide-ink-100 rounded-xl border border-ink-100">
            {results.data.map((o) => {
              const on = picked.some((x) => x._id === o._id);
              return (
                <li key={o._id}>
                  <label className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-ink-50">
                    <input type="checkbox" checked={on} onChange={() => toggle(o)} className="size-4 accent-brand-700" />
                    <span className="flex-1 font-mono text-sm font-semibold">{o.trackingNumber}</span>
                    {o.courier && <span className="text-xs text-ink-500">now: {o.courier.name}</span>}
                    <StatusBadge status={o.status} />
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {picked.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {picked.map((o) => (
            <span key={o._id} className="inline-flex items-center gap-1 rounded-full bg-ink-900 py-1 pr-1 pl-3 font-mono text-xs text-white">
              {o.trackingNumber}
              <button type="button" onClick={() => toggle(o)} className="rounded-full p-0.5 hover:bg-white/20" aria-label={`Remove ${o.trackingNumber}`}><X className="size-3" /></button>
            </span>
          ))}
        </div>
      )}
    </Modal>
  );
}

function BulkStatus({ courier, onClose }) {
  const { success, error: toastError } = useFeedback();
  const [status, setStatus] = useState('in transit');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await api.put(`/couriers/${courier._id}/orders/status`, { status });
      success(r.matched ? `Updated ${r.matched} order${r.matched === 1 ? '' : 's'}` : 'No open orders to update');
      onClose();
    } catch (err) {
      toastError(err.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Modal open onClose={onClose} title={`Update all of ${courier.name}'s orders`} description="Delivered orders are left unchanged." size="sm">
      <form onSubmit={submit} className="space-y-4">
        <Select label="New status" value={status} onChange={(e) => setStatus(e.target.value)}>
          {ORDER_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
        </Select>
        <Button type="submit" loading={busy} className="w-full">Apply to open orders</Button>
      </form>
    </Modal>
  );
}

function BulkHistory({ courier, onClose }) {
  const { success, error: toastError } = useFeedback();
  return (
    <Modal open onClose={onClose} title={`Add an update to ${courier.name}'s orders`} description="Customers of every open order get notified." size="md">
      <HistoryForm
        buttonLabel="Add to all open orders"
        submit={async (entry) => {
          try {
            const r = await api.put(`/couriers/${courier._id}/orders/history`, entry);
            success(r.matched ? `Added to ${r.matched} order${r.matched === 1 ? '' : 's'}` : 'No open orders to update');
            onClose();
            return true;
          } catch (err) {
            toastError(err.message);
            return false;
          }
        }}
      />
    </Modal>
  );
}

function UpdateLocation({ courier, onDone, onClose }) {
  const { success, error: toastError } = useFeedback();
  const [loc, setLoc] = useState({ location: '', latitude: undefined, longitude: undefined });
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!Number.isFinite(loc.latitude)) return toastError('Pick a place from the suggestions');
    setBusy(true);
    try {
      const updated = await api.put(`/couriers/${courier._id}/location`, { latitude: loc.latitude, longitude: loc.longitude });
      success('Location updated');
      onDone(updated);
    } catch (err) {
      toastError(err.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Modal open onClose={onClose} title={`Set ${courier.name}'s location`} size="md">
      <form onSubmit={submit} className="space-y-4">
        <LocationSearch value={loc} onChange={setLoc} required />
        <Button type="submit" loading={busy} disabled={!Number.isFinite(loc.latitude)}>Save location</Button>
      </form>
    </Modal>
  );
}

export default function AdminCouriers() {
  const [active, setActive] = useState('');
  const state = useAsync((signal) => api.get('/couriers', { signal, query: { active } }), [active]);
  const [modal, setModal] = useState(null); // { type, courier }
  const close = () => setModal(null);
  const replace = (c) => state.setData((list) => list.map((x) => (x._id === c._id ? c : x)));

  useEffect(close, [active]);

  return (
    <>
      <PageHeader
        title="Couriers"
        description="Your delivery team and the orders they carry."
        actions={<><Button variant="secondary" onClick={state.reload} aria-label="Refresh"><RefreshCw className="size-4" /></Button><Button onClick={() => setModal({ type: 'create' })}><Plus className="size-4" /> Add courier</Button></>}
      />
      <Card>
        <div className="flex gap-1 border-b border-ink-100 p-2" role="tablist">
          {[['', 'All'], ['true', 'Active'], ['false', 'Inactive']].map(([k, l]) => (
            <button key={k || 'all'} type="button" role="tab" aria-selected={active === k} onClick={() => setActive(k)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${active === k ? 'bg-ink-100 text-ink-900' : 'text-ink-500 hover:text-ink-800'}`}>{l}</button>
          ))}
        </div>
        <AsyncContent state={state} empty={<EmptyState icon={Truck} title="No couriers yet" action={<Button size="sm" onClick={() => setModal({ type: 'create' })}>Add your first courier</Button>} />}>
          {(list) => (
            <Table head={['Courier', 'Contact', 'Vehicle', 'Orders', 'Status', { key: 'a', label: <span className="sr-only">Actions</span> }]}>
              {list.map((c) => (
                <tr key={c._id} className="hover:bg-ink-50/50">
                  <Td className="font-medium text-ink-900">{c.name}</Td>
                  <Td><span className="block">{c.phoneNumber}</span><span className="text-xs text-ink-500">{c.email}</span></Td>
                  <Td className="capitalize">{c.vehicle?.type || '-'} <span className="font-mono text-xs text-ink-500">{c.vehicle?.licensePlate}</span></Td>
                  <Td className="tabular-nums">{c.ordersAssigned?.length || 0}</Td>
                  <Td><Badge tone={c.active ? 'active' : 'inactive'}>{c.active ? 'Active' : 'Inactive'}</Badge></Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" title="Assign orders" aria-label={`Assign orders to ${c.name}`} onClick={() => setModal({ type: 'assign', courier: c })} disabled={!c.active}><PackagePlus className="size-4" /></Button>
                      <Button variant="ghost" size="icon" title="Update status of all orders" aria-label={`Update status for ${c.name}'s orders`} onClick={() => setModal({ type: 'status', courier: c })} disabled={!c.ordersAssigned?.length}><RefreshCw className="size-4" /></Button>
                      <Button variant="ghost" size="icon" title="Add tracking update" aria-label={`Add tracking update for ${c.name}'s orders`} onClick={() => setModal({ type: 'history', courier: c })} disabled={!c.ordersAssigned?.length}><History className="size-4" /></Button>
                      <Button variant="ghost" size="icon" title="Set location" aria-label={`Set location for ${c.name}`} onClick={() => setModal({ type: 'location', courier: c })}><MapPin className="size-4" /></Button>
                    </div>
                  </Td>
                </tr>
              ))}
            </Table>
          )}
        </AsyncContent>
      </Card>

      {modal?.type === 'create' && <CreateCourier onClose={close} onCreated={(c) => { state.setData((l) => [c, ...(l || [])]); close(); }} />}
      {modal?.type === 'assign' && <AssignOrders courier={modal.courier} onClose={close} onDone={(c) => { state.reload(); replace(c); close(); }} />}
      {modal?.type === 'status' && <BulkStatus courier={modal.courier} onClose={close} />}
      {modal?.type === 'history' && <BulkHistory courier={modal.courier} onClose={close} />}
      {modal?.type === 'location' && <UpdateLocation courier={modal.courier} onClose={close} onDone={(c) => { replace(c); close(); }} />}
    </>
  );
}
