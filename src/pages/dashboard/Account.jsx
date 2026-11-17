import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import { useFeedback } from '@/context/FeedbackContext';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { maxLength, minLength, passwordRules, phone, strongPassword, validate } from '@/lib/validators';
import { Badge, Button, Card, CardHeader, Input, PageHeader } from '@/components/ui';

const ADDRESS_KEYS = ['street', 'city', 'state', 'postalCode', 'country'];
const fromUser = (u) => ({
  name: u?.name || '',
  phoneNumber: u?.phoneNumber || '',
  ...Object.fromEntries(ADDRESS_KEYS.map((k) => [k, u?.address?.[k] || ''])),
});

function ProfileForm() {
  const { user, setUser } = useAuth();
  const { success, error: toastError } = useFeedback();
  const [values, setValues] = useState(() => fromUser(user));
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  useEffect(() => setValues(fromUser(user)), [user]);

  const dirty = JSON.stringify(values) !== JSON.stringify(fromUser(user));
  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: '' }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(values, {
      name: minLength('Name', 2, 80),
      phoneNumber: phone({ optional: true }),
      street: maxLength('Street', 200),
      city: maxLength('City', 100),
      state: maxLength('State', 100),
      postalCode: maxLength('Postal code', 20),
      country: maxLength('Country', 100),
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    try {
      const updated = await api.put('/users/profile', {
        name: values.name.trim(),
        phoneNumber: values.phoneNumber.trim(),
        address: Object.fromEntries(ADDRESS_KEYS.map((k) => [k, values[k].trim()])),
      });
      setUser(updated);
      success('Profile updated');
    } catch (err) {
      toastError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card as="form" onSubmit={submit} noValidate>
      <CardHeader title="Profile" description="Used on your shipments and invoices." />
      <div className="grid gap-4 p-5 sm:grid-cols-2">
        <Input label="Full name" value={values.name} onChange={set('name')} error={errors.name} autoComplete="name" required maxLength={80} />
        <Input label="Email" value={user?.email || ''} disabled hint="Contact support to change your email." />
        <Input label="Phone number" type="tel" value={values.phoneNumber} onChange={set('phoneNumber')} error={errors.phoneNumber} autoComplete="tel" placeholder="+234 800 000 0000" />
        <div className="hidden sm:block" />
        <Input label="Street address" className="sm:col-span-2" value={values.street} onChange={set('street')} error={errors.street} autoComplete="street-address" maxLength={200} />
        <Input label="City" value={values.city} onChange={set('city')} error={errors.city} autoComplete="address-level2" maxLength={100} />
        <Input label="State" value={values.state} onChange={set('state')} error={errors.state} autoComplete="address-level1" maxLength={100} />
        <Input label="Postal code" value={values.postalCode} onChange={set('postalCode')} error={errors.postalCode} autoComplete="postal-code" maxLength={20} />
        <Input label="Country" value={values.country} onChange={set('country')} error={errors.country} autoComplete="country-name" maxLength={100} />
      </div>
      <div className="flex justify-end gap-2 border-t border-ink-100 bg-ink-50/50 px-5 py-4">
        <Button variant="ghost" disabled={!dirty || busy} onClick={() => { setValues(fromUser(user)); setErrors({}); }}>Discard</Button>
        <Button type="submit" loading={busy} disabled={!dirty}>Save changes</Button>
      </div>
    </Card>
  );
}

function PasswordForm() {
  const { success, error: toastError } = useFeedback();
  const [values, setValues] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: '' }));
  };
  const submit = async (e) => {
    e.preventDefault();
    const found = validate(values, {
      currentPassword: (v) => (v ? '' : 'Enter your current password'),
      newPassword: [strongPassword, (v, all) => (v && v === all.currentPassword ? 'New password must be different' : '')],
      confirm: (v, all) => (v !== all.newPassword ? 'Passwords do not match' : ''),
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    try {
      await api.put('/users/change-password', { currentPassword: values.currentPassword, newPassword: values.newPassword });
      setValues({ currentPassword: '', newPassword: '', confirm: '' });
      success('Password changed. Other devices have been signed out.');
    } catch (err) {
      if (/current password/i.test(err.message)) setErrors({ currentPassword: err.message });
      else toastError(err.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Card as="form" onSubmit={submit} noValidate>
      <CardHeader title="Password" description="Changing it signs you out everywhere else." />
      <div className="space-y-4 p-5">
        <Input label="Current password" type="password" autoComplete="current-password" value={values.currentPassword} onChange={set('currentPassword')} error={errors.currentPassword} maxLength={128} required />
        <Input
          label="New password"
          type="password"
          autoComplete="new-password"
          value={values.newPassword}
          onChange={set('newPassword')}
          error={errors.newPassword}
          maxLength={72}
          hint={passwordRules.map((r) => r.label).join(' · ')}
          required
        />
        <Input label="Confirm new password" type="password" autoComplete="new-password" value={values.confirm} onChange={set('confirm')} error={errors.confirm} maxLength={72} required />
      </div>
      <div className="flex justify-end border-t border-ink-100 bg-ink-50/50 px-5 py-4">
        <Button type="submit" loading={busy}>Update password</Button>
      </div>
    </Card>
  );
}

export default function Account() {
  const { user, logout } = useAuth();
  const { confirm } = useFeedback();
  const navigate = useNavigate();
  const signOut = async () => {
    if (await confirm({ title: 'Sign out?', confirmLabel: 'Sign out' })) {
      navigate('/', { replace: true });
      await logout().catch(() => {});
    }
  };
  return (
    <>
      <PageHeader
        title="Account"
        description={
          <span className="inline-flex flex-wrap items-center gap-2">
            Member since {formatDate(user?.createdAt)} <Badge tone={user?.role}>{user?.role}</Badge>
          </span>
        }
        actions={<Button variant="secondary" onClick={signOut}>Sign out</Button>}
      />
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <ProfileForm />
        <PasswordForm />
      </div>
    </>
  );
}
