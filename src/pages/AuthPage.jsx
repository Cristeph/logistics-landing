import { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router';
import { Check, X } from 'lucide-react';
import authBg from '@/assets/images/auth-bg.webp';
import logo from '@/assets/images/logo-transparent.webp';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { useFeedback } from '@/context/FeedbackContext';
import { safeNext } from '@/components/layout/guards';
import { useDocumentTitle } from '@/hooks/misc';
import { email, minLength, passwordRules, strongPassword, validate } from '@/lib/validators';
import { cn } from '@/lib/cn';

function PasswordChecklist({ value }) {
  return (
    <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1" aria-label="Password requirements">
      {passwordRules.map((r) => {
        const ok = r.test(value);
        return (
          <li key={r.label} className={cn('flex items-center gap-1.5 text-xs', ok ? 'text-emerald-600' : 'text-ink-500')}>
            {ok ? <Check className="size-3.5" aria-hidden /> : <X className="size-3.5 text-ink-300" aria-hidden />}
            {r.label}
            <span className="sr-only">{ok ? '(met)' : '(not met)'}</span>
          </li>
        );
      })}
    </ul>
  );
}

function LoginForm({ onDone }) {
  const { login } = useAuth();
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: '' }));
    setFormError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(values, { email, password: (v) => (v ? '' : 'Password is required') });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    try {
      const user = await login(values.email.trim(), values.password);
      onDone(user);
    } catch (err) {
      setFormError(err.message);
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {formError && <p role="alert" className="rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-700">{formError}</p>}
      <Input label="Email" type="email" autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} required autoFocus />
      <Input label="Password" type="password" autoComplete="current-password" value={values.password} onChange={set('password')} error={errors.password} required maxLength={128} />
      <Button type="submit" size="lg" className="w-full" loading={busy}>
        Sign in
      </Button>
      <p className="text-center text-xs text-ink-500">
        Forgot your password? Contact <Link to="/contact" className="font-medium text-brand-700 hover:underline">support</Link> to reset it.
      </p>
    </form>
  );
}

function SignupForm({ onDone }) {
  const { register } = useAuth();
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: '' }));
    setFormError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(values, {
      name: minLength('Full name', 2, 80),
      email,
      password: strongPassword,
      confirm: (v, all) => (!v ? 'Please confirm your password' : v !== all.password ? 'Passwords do not match' : ''),
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    try {
      const user = await register({ name: values.name.trim(), email: values.email.trim(), password: values.password });
      onDone(user, true);
    } catch (err) {
      setFormError(err.message);
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {formError && <p role="alert" className="rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-700">{formError}</p>}
      <Input label="Full name" autoComplete="name" value={values.name} onChange={set('name')} error={errors.name} required maxLength={80} autoFocus />
      <Input label="Email" type="email" autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} required maxLength={254} />
      <div>
        <Input label="Password" type="password" autoComplete="new-password" value={values.password} onChange={set('password')} error={errors.password} required maxLength={72} />
        <PasswordChecklist value={values.password} />
      </div>
      <Input label="Confirm password" type="password" autoComplete="new-password" value={values.confirm} onChange={set('confirm')} error={errors.confirm} required maxLength={72} />
      <Button type="submit" size="lg" className="w-full" loading={busy}>
        Create account
      </Button>
    </form>
  );
}

export default function AuthPage() {
  const [params, setParams] = useSearchParams();
  const mode = params.get('mode') === 'signup' ? 'signup' : 'login';
  const next = safeNext(params.get('next'));
  const navigate = useNavigate();
  const { status, isAdmin } = useAuth();
  const { success } = useFeedback();
  useDocumentTitle(mode === 'signup' ? 'Create account' : 'Sign in');

  if (status === 'authenticated') return <Navigate to={next || (isAdmin ? '/dashboard/admin' : '/dashboard/overview')} replace />;

  const switchTo = (m) => {
    const p = new URLSearchParams(params);
    if (m === 'signup') p.set('mode', 'signup');
    else p.delete('mode');
    setParams(p, { replace: true });
  };

  const onDone = (user, isNew) => {
    success(isNew ? `Welcome to Cristeph, ${user.name.split(' ')[0]}!` : `Welcome back, ${user.name.split(' ')[0]}.`);
    navigate(next || (user.role === 'admin' ? '/dashboard/admin' : '/dashboard/overview'), { replace: true });
  };

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <Link to="/" className="self-start" aria-label="Cristeph Logistics home">
          <img src={logo} alt="Cristeph Logistics" width="160" height="49" className="h-10 w-auto" />
        </Link>
        <main id="main" className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <h1 className="font-sans text-2xl font-bold">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h1>
          <p className="mt-2 text-sm text-ink-500">
            {mode === 'signup' ? 'Book shipments, pay invoices and track everything in one place.' : 'Sign in to manage your shipments.'}
          </p>
          <div className="mt-8 grid grid-cols-2 rounded-xl bg-ink-50 p-1" role="tablist" aria-label="Sign in or create account">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => switchTo(m)}
                className={cn('rounded-lg py-2 text-sm font-semibold transition', mode === m ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-800')}
              >
                {m === 'login' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>
          <div className="mt-8">{mode === 'signup' ? <SignupForm onDone={onDone} /> : <LoginForm onDone={onDone} />}</div>
        </main>
        <p className="text-center text-xs text-ink-400">© {new Date().getFullYear()} Cristeph International Trade &amp; Logistics</p>
      </div>
      <div className="relative hidden overflow-hidden bg-ink-950 lg:block">
        <img src={authBg} alt="" aria-hidden className="absolute inset-0 size-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 p-12 text-white">
          <p className="font-display text-3xl leading-tight">&ldquo;They handled all the paperwork and customs details for us.&rdquo;</p>
          <p className="mt-4 text-sm text-ink-300">Martha R., Global logistics coordinator</p>
        </div>
      </div>
    </div>
  );
}
