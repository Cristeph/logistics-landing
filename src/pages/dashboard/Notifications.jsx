import { useState } from 'react';
import { AlertTriangle, BellOff, CheckCheck, CheckCircle2, Info, Send, Trash2, XCircle } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { useAuth } from '@/context/AuthContext';
import { useFeedback } from '@/context/FeedbackContext';
import { useUnread } from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api';
import { formatDateTime, timeAgo } from '@/lib/format';
import { NOTIFICATION_TYPES } from '@/lib/constants';
import { email as emailRule, minLength, validate } from '@/lib/validators';
import { AsyncContent, Button, Card, CardHeader, EmptyState, Input, PageHeader, Select, Textarea } from '@/components/ui';
import { cn } from '@/lib/cn';

const ICON = {
  info: [Info, 'bg-ink-50 text-ink-600'],
  success: [CheckCircle2, 'bg-emerald-50 text-emerald-600'],
  warning: [AlertTriangle, 'bg-amber-50 text-amber-600'],
  error: [XCircle, 'bg-brand-50 text-brand-600'],
};

function SendNotification() {
  const { success, error: toastError } = useFeedback();
  const [values, setValues] = useState({ email: '', message: '', type: 'info' });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: '' }));
  };
  const submit = async (e) => {
    e.preventDefault();
    const found = validate(values, { email: emailRule, message: minLength('Message', 1, 1000) });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    try {
      await api.post('/notifications', { email: values.email.trim(), message: values.message.trim(), type: values.type });
      success(`Notification sent to ${values.email.trim()}`);
      setValues({ email: '', message: '', type: 'info' });
    } catch (err) {
      if (err.status === 404) setErrors({ email: 'No customer with that email' });
      else toastError(err.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Card as="form" onSubmit={submit} noValidate>
      <CardHeader title="Send a notification" description="Message a customer directly. It appears in their dashboard." />
      <div className="space-y-4 p-5">
        <Input label="Customer email" type="email" value={values.email} onChange={set('email')} error={errors.email} required />
        <Select label="Type" value={values.type} onChange={set('type')}>
          {NOTIFICATION_TYPES.map((t) => <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>)}
        </Select>
        <Textarea label="Message" value={values.message} onChange={set('message')} error={errors.message} maxLength={1000} required hint={`${values.message.length}/1000`} />
        <Button type="submit" loading={busy} className="w-full"><Send className="size-4" /> Send</Button>
      </div>
    </Card>
  );
}

export default function Notifications() {
  const { isAdmin } = useAuth();
  const { confirm, error: toastError } = useFeedback();
  const { refreshUnread } = useUnread();
  const state = useAsync((signal) => api.get('/notifications', { signal }), []);
  const [filter, setFilter] = useState('all');
  const list = state.data || [];
  const unread = list.filter((n) => !n.read).length;
  const shown = filter === 'unread' ? list.filter((n) => !n.read) : list;

  // Optimistic updates, rolled back if the API call fails.
  const mutate = async (apply, call) => {
    const before = state.data;
    state.setData(apply);
    try {
      await call();
    } catch (err) {
      state.setData(before);
      toastError(err.message);
    } finally {
      refreshUnread();
    }
  };

  const markRead = (id) => mutate((l) => l.map((n) => (n._id === id ? { ...n, read: true } : n)), () => api.put(`/notifications/${id}/read`));
  const markAll = () => mutate((l) => l.map((n) => ({ ...n, read: true })), () => api.put('/notifications/read-all'));
  const remove = (id) => mutate((l) => l.filter((n) => n._id !== id), () => api.del(`/notifications/${id}`));
  const removeAll = async () => {
    const ok = await confirm({ title: 'Delete all notifications?', message: 'This permanently removes every notification. It cannot be undone.', confirmLabel: 'Delete all', tone: 'danger' });
    if (ok) mutate(() => [], () => api.del('/notifications'));
  };

  return (
    <>
      <PageHeader
        title="Notifications"
        description={unread ? `You have ${unread} unread notification${unread === 1 ? '' : 's'}.` : 'You’re all caught up.'}
        actions={
          list.length > 0 && (
            <>
              <Button variant="secondary" onClick={markAll} disabled={!unread}><CheckCheck className="size-4" /> Mark all read</Button>
              <Button variant="ghost" onClick={removeAll}><Trash2 className="size-4" /> Delete all</Button>
            </>
          )
        }
      />
      <div className={cn('grid gap-6', isAdmin && 'xl:grid-cols-[1.6fr_1fr]')}>
        <Card>
          <div className="flex gap-1 border-b border-ink-100 p-2" role="tablist">
            {[['all', `All (${list.length})`], ['unread', `Unread (${unread})`]].map(([k, l]) => (
              <button key={k} type="button" role="tab" aria-selected={filter === k} onClick={() => setFilter(k)}
                className={cn('rounded-lg px-3 py-1.5 text-sm font-medium', filter === k ? 'bg-ink-100 text-ink-900' : 'text-ink-500 hover:text-ink-800')}>
                {l}
              </button>
            ))}
          </div>
          <AsyncContent state={state} empty={<EmptyState icon={BellOff} title="No notifications" description="Shipment updates and messages from our team will show up here." />}>
            {() =>
              shown.length === 0 ? (
                <EmptyState icon={CheckCheck} title="Nothing unread" />
              ) : (
                <ul className="divide-y divide-ink-100">
                  {shown.map((n) => {
                    const [Icon, tone] = ICON[n.type] || ICON.info;
                    return (
                      <li key={n._id} className={cn('group flex gap-4 px-5 py-4', !n.read && 'bg-brand-50/30')}>
                        <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-xl', tone)}><Icon className="size-4" aria-hidden /></span>
                        <div className="min-w-0 flex-1">
                          <p className={cn('text-sm break-words', n.read ? 'text-ink-600' : 'font-medium text-ink-900')}>{n.message}</p>
                          <p className="mt-1 text-xs text-ink-500" title={formatDateTime(n.createdAt)}>{timeAgo(n.createdAt)}</p>
                        </div>
                        <div className="flex shrink-0 items-start gap-1 sm:opacity-0 sm:transition-opacity sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
                          {!n.read && (
                            <Button variant="ghost" size="icon" onClick={() => markRead(n._id)} aria-label="Mark as read" title="Mark as read">
                              <CheckCheck className="size-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" onClick={() => remove(n._id)} aria-label="Delete notification" title="Delete">
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )
            }
          </AsyncContent>
        </Card>
        {isAdmin && <div><SendNotification /></div>}
      </div>
    </>
  );
}
