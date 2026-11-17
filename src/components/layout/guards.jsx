import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import { LoadingBlock } from '@/components/ui';

/** Only allow same-site relative paths as post-login redirects (no open redirects). */
export const safeNext = (next) => (next && /^\/(?!\/)[\w\-/?=&#.%]*$/.test(next) ? next : null);

export function RequireAuth({ children }) {
  const { status } = useAuth();
  const location = useLocation();
  if (status === 'loading') return <LoadingBlock className="min-h-dvh" label="Checking your session…" />;
  if (status !== 'authenticated') {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/auth?next=${next}`} replace />;
  }
  return children ?? <Outlet />;
}

export function RequireAdmin() {
  const { isAdmin } = useAuth();
  return isAdmin ? <Outlet /> : <Navigate to="/dashboard/overview" replace />;
}

export function DashboardHome() {
  const { isAdmin } = useAuth();
  return <Navigate to={isAdmin ? '/dashboard/admin' : '/dashboard/overview'} replace />;
}
