import { useEffect, useState } from 'react';
import { Search, Trash2, Users } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { useDebounce } from '@/hooks/misc';
import { useListParams } from '@/hooks/useListParams';
import { useAuth } from '@/context/AuthContext';
import { useFeedback } from '@/context/FeedbackContext';
import { api } from '@/lib/api';
import { formatAddress, formatDate, initials } from '@/lib/format';
import { AsyncContent, Badge, Button, Card, EmptyState, Modal, PageHeader, Pagination, Select, Table, Td } from '@/components/ui';
import { cn } from '@/lib/cn';

function UserPanel({ user, onClose, onDeleted }) {
  const { user: me } = useAuth();
  const { confirm, success, error: toastError } = useFeedback();
  const [busy, setBusy] = useState(false);
  const canDelete = user.role !== 'admin' && user._id !== me?._id;
  const remove = async () => {
    const ok = await confirm({
      title: `Delete ${user.name}?`,
      message: 'Their account and notifications are permanently removed and they are signed out. Their orders and invoices are kept for your records. This cannot be undone.',
      confirmLabel: 'Delete account',
      tone: 'danger',
    });
    if (!ok) return;
    setBusy(true);
    try {
      await api.del(`/users/admin/${user._id}`);
      success(`${user.name}'s account was deleted`);
      onDeleted(user._id);
    } catch (err) {
      toastError(err.message);
      setBusy(false);
    }
  };
  return (
    <Modal open onClose={onClose} title={user.name} description={user.email} size="md"
      footer={canDelete && <Button variant="ghost" className="text-brand-700" onClick={remove} loading={busy}><Trash2 className="size-4" /> Delete account</Button>}>
      <dl className="grid grid-cols-2 gap-4 text-sm">
        <div><dt className="text-xs text-ink-500">Role</dt><dd className="mt-1"><Badge tone={user.role}>{user.role}</Badge></dd></div>
        <div><dt className="text-xs text-ink-500">Joined</dt><dd className="text-ink-900">{formatDate(user.createdAt)}</dd></div>
        <div><dt className="text-xs text-ink-500">Phone</dt><dd className="text-ink-900">{user.phoneNumber || '-'}</dd></div>
        <div><dt className="text-xs text-ink-500">User ID</dt><dd className="font-mono text-xs break-all text-ink-900">{user._id}</dd></div>
        <div className="col-span-2"><dt className="text-xs text-ink-500">Address</dt><dd className="text-ink-900">{formatAddress(user.address)}</dd></div>
      </dl>
    </Modal>
  );
}

export default function AdminUsers() {
  const { get, page, update, setPage } = useListParams();
  const role = get('role');
  const [q, setQ] = useState(get('q'));
  const dq = useDebounce(q.trim(), 350);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (dq !== get('q')) update({ q: dq });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dq]);

  const state = useAsync((signal) => api.get('/users/admin', { signal, query: { page, limit: 20, q: get('q'), role } }), [page, role, get('q')]);

  return (
    <>
      <PageHeader title="Customers" description="Everyone with an account on the platform." />
      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-ink-100 p-4">
          <div className="relative min-w-52 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" aria-hidden />
            <label htmlFor="user-search" className="sr-only">Search by name or email</label>
            <input id="user-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or email" maxLength={100}
              className="h-10 w-full rounded-lg pr-3 pl-9 text-sm ring-1 ring-ink-200 ring-inset focus:ring-2 focus:ring-brand-600 focus:outline-none" />
          </div>
          <Select aria-label="Filter by role" className="w-40" value={role} onChange={(e) => update({ role: e.target.value })}>
            <option value="">All roles</option>
            <option value="customer">Customers</option>
            <option value="admin">Admins</option>
          </Select>
        </div>
        <AsyncContent state={state} isEmpty={(d) => !d?.data?.length} empty={<EmptyState icon={Users} title={get('q') || role ? 'No matching accounts' : 'No accounts yet'} />}>
          {(d) => (
            <div className={cn(state.loading && 'opacity-60 transition-opacity')}>
              <Table head={['Name', 'Email', 'Phone', 'Role', 'Joined', { key: 'a', label: <span className="sr-only">Actions</span> }]}>
                {d.data.map((u) => (
                  <tr key={u._id} className="hover:bg-ink-50/50">
                    <Td>
                      <span className="flex items-center gap-3">
                        <span className="flex size-8 items-center justify-center rounded-full bg-ink-100 text-xs font-semibold text-ink-700" aria-hidden>{initials(u.name)}</span>
                        <span className="font-medium text-ink-900">{u.name}</span>
                      </span>
                    </Td>
                    <Td>{u.email}</Td>
                    <Td>{u.phoneNumber || '-'}</Td>
                    <Td><Badge tone={u.role}>{u.role}</Badge></Td>
                    <Td>{formatDate(u.createdAt)}</Td>
                    <Td className="text-right"><Button variant="secondary" size="sm" onClick={() => setSelected(u)}>View</Button></Td>
                  </tr>
                ))}
              </Table>
              <Pagination page={d.page} totalPages={d.totalPages} total={d.total} onPage={setPage} label="accounts" />
            </div>
          )}
        </AsyncContent>
      </Card>
      {selected && (
        <UserPanel
          user={selected}
          onClose={() => setSelected(null)}
          onDeleted={(id) => {
            setSelected(null);
            state.setData((d) => d && { ...d, data: d.data.filter((x) => x._id !== id), total: d.total - 1 });
          }}
        />
      )}
    </>
  );
}
