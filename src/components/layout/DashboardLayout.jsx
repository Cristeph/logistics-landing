import { createContext, Suspense, useCallback, useContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import {
  Bell, CreditCard, HelpCircle, LayoutDashboard, LogOut, Menu, Package, PackageSearch, Settings, Truck, Users, Wallet, X, ClipboardList,
} from 'lucide-react';
import logo from '@/assets/images/logo-transparent.webp';
import { useAuth } from '@/context/AuthContext';
import { useFeedback } from '@/context/FeedbackContext';
import { LoadingBlock } from '@/components/ui';
import { api } from '@/lib/api';
import { initials } from '@/lib/format';
import { cn } from '@/lib/cn';

const CUSTOMER_NAV = [
  { to: 'overview', label: 'Overview', icon: LayoutDashboard },
  { to: 'booking', label: 'Shipments', icon: Package },
  { to: 'payment', label: 'Payments', icon: CreditCard },
  { to: 'notifications', label: 'Notifications', icon: Bell, badge: true },
  { to: 'accountmanagement', label: 'Account', icon: Settings },
  { to: 'support', label: 'Help & support', icon: HelpCircle },
];

const ADMIN_NAV = [
  { to: 'admin', label: 'Overview', icon: LayoutDashboard },
  { to: 'ordermanagement', label: 'Orders', icon: ClipboardList },
  { to: 'paymentmanagement', label: 'Payments', icon: Wallet },
  { to: 'couriermanagement', label: 'Couriers', icon: Truck },
  { to: 'usersmanagement', label: 'Customers', icon: Users },
  { to: 'notifications', label: 'Notifications', icon: Bell, badge: true },
  { to: 'accountmanagement', label: 'Account', icon: Settings },
];

// Lets pages (e.g. Notifications) refresh the unread badge after changing things.
const UnreadContext = createContext({ unread: 0, refreshUnread: () => {} });
export const useUnread = () => useContext(UnreadContext);

function useUnreadCount() {
  const [unread, setUnread] = useState(0);
  const refreshUnread = useCallback(async () => {
    try {
      const list = await api.get('/notifications');
      setUnread(list.filter((n) => !n.read).length);
    } catch {
      /* badge is best-effort */
    }
  }, []);
  useEffect(() => {
    refreshUnread();
    const t = setInterval(() => !document.hidden && refreshUnread(), 60_000);
    const onFocus = () => refreshUnread();
    window.addEventListener('focus', onFocus);
    return () => {
      clearInterval(t);
      window.removeEventListener('focus', onFocus);
    };
  }, [refreshUnread]);
  return { unread, refreshUnread };
}

function SidebarContent({ nav, unread, onNavigate, onLogout, user }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Link to="/" aria-label="Cristeph Logistics home" onClick={onNavigate}>
          <img src={logo} alt="Cristeph Logistics" width="140" height="43" className="h-9 w-auto" />
        </Link>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Dashboard">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={`/dashboard/${item.to}`}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
              )
            }
          >
            <item.icon className="size-[1.1rem] shrink-0" aria-hidden />
            <span className="flex-1">{item.label}</span>
            {item.badge && unread > 0 && (
              <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[0.65rem] font-bold text-white" aria-label={`${unread} unread`}>
                {unread > 99 ? '99+' : unread}
              </span>
            )}
          </NavLink>
        ))}
        <NavLink
          to="/track"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-ink-50 hover:text-ink-900"
        >
          <PackageSearch className="size-[1.1rem]" aria-hidden /> Public tracking
        </NavLink>
      </nav>
      <div className="border-t border-ink-100 p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white" aria-hidden>
            {initials(user?.name)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink-900">{user?.name}</p>
            <p className="truncate text-xs text-ink-500">{user?.email}</p>
          </div>
          <button type="button" onClick={onLogout} className="rounded-lg p-2 text-ink-400 hover:bg-ink-50 hover:text-brand-700" aria-label="Sign out" title="Sign out">
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  const { user, isAdmin, logout } = useAuth();
  const { confirm, info } = useFeedback();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const unreadState = useUnreadCount();
  const nav = isAdmin ? ADMIN_NAV : CUSTOMER_NAV;
  const current = nav.find((n) => pathname.startsWith(`/dashboard/${n.to}`));

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.title = `${current?.label || 'Dashboard'} | Cristeph Logistics`;
  }, [current]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const handleLogout = async () => {
    const ok = await confirm({ title: 'Sign out?', message: 'You will need to sign in again to access your dashboard.', confirmLabel: 'Sign out' });
    if (!ok) return;
    // Leave the protected area first, otherwise the auth guard redirects to /auth.
    navigate('/', { replace: true });
    await logout().catch(() => {});
    info('You have been signed out.');
  };

  const sidebar = (
    <SidebarContent nav={nav} unread={unreadState.unread} onNavigate={() => setOpen(false)} onLogout={handleLogout} user={user} />
  );

  return (
    <UnreadContext.Provider value={unreadState}>
      <div className="min-h-dvh bg-ink-50/70">
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-ink-100 bg-white lg:block">{sidebar}</aside>

        {open && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
            <div className="absolute inset-0 animate-fade-in bg-ink-950/40" onClick={() => setOpen(false)} aria-hidden />
            <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] animate-pop bg-white shadow-lift">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-3.5 right-3 rounded-lg p-2 text-ink-500 hover:bg-ink-50"
                aria-label="Close navigation"
              >
                <X className="size-5" />
              </button>
              {sidebar}
            </aside>
          </div>
        )}

        <div className="lg:pl-64">
          <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-ink-100 bg-white/85 px-4 backdrop-blur-lg sm:px-6 lg:px-8">
            <button
              type="button"
              className="-ml-1 rounded-lg p-2 text-ink-700 hover:bg-ink-50 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              aria-expanded={open}
            >
              <Menu className="size-5" />
            </button>
            <p className="flex-1 truncate text-sm font-semibold text-ink-900">
              {isAdmin && <span className="mr-2 rounded-md bg-ink-900 px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wide text-white uppercase">Admin</span>}
              {current?.label || 'Dashboard'}
            </p>
            <Link
              to="/dashboard/notifications"
              className="relative rounded-lg p-2 text-ink-500 hover:bg-ink-50 hover:text-ink-900"
              aria-label={`Notifications${unreadState.unread ? `, ${unreadState.unread} unread` : ''}`}
            >
              <Bell className="size-5" />
              {unreadState.unread > 0 && <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-brand-600 ring-2 ring-white" />}
            </Link>
          </header>
          <main id="main" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <Suspense fallback={<LoadingBlock />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </UnreadContext.Provider>
  );
}
