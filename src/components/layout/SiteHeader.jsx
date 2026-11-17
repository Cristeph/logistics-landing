import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Menu, PackageSearch, X } from 'lucide-react';
import logoWhite from '@/assets/images/logo-white.webp';
import logoColor from '@/assets/images/logo-transparent.webp';
import { useScrolled } from '@/hooks/misc';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui';
import { cn } from '@/lib/cn';

export const NAV = [
  { to: '/#about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/track', label: 'Track' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

/** `overlay` = transparent over a dark hero until the user scrolls. */
export default function SiteHeader({ overlay = false }) {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const { status, isAdmin } = useAuth();
  const solid = !overlay || scrolled || open;

  useEffect(() => setOpen(false), [pathname, hash]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const authed = status === 'authenticated';
  const dashboardHref = isAdmin ? '/dashboard/admin' : '/dashboard/overview';

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300',
        solid ? 'bg-white/90 shadow-[0_1px_0_rgb(11_21_48/0.06)] backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm">
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link to="/" className="shrink-0" aria-label="Cristeph Logistics home">
          <img src={solid ? logoColor : logoWhite} alt="Cristeph Logistics" width="160" height="49" className="h-9 w-auto lg:h-10" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  solid ? 'text-ink-700 hover:bg-ink-50 hover:text-ink-900' : 'text-white/85 hover:bg-white/10 hover:text-white',
                  isActive && !item.to.includes('#') && (solid ? 'text-brand-700' : 'text-white')
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {authed ? (
            <Button to={dashboardHref} variant={solid ? 'primary' : 'light'} size="md">
              Dashboard
            </Button>
          ) : (
            <>
              <Button to="/auth" variant={solid ? 'ghost' : 'outlineLight'}>
                Sign in
              </Button>
              <Button to="/auth?mode=signup" variant="primary">
                Get started
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className={cn('rounded-lg p-2 md:hidden', solid ? 'text-ink-800 hover:bg-ink-50' : 'text-white hover:bg-white/10')}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="animate-fade-in border-t border-ink-100 bg-white md:hidden" aria-label="Mobile">
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="rounded-lg px-3 py-3 text-base font-medium text-ink-800 hover:bg-ink-50">
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-ink-100 pt-4">
              {authed ? (
                <Button to={dashboardHref} className="col-span-2">
                  Go to dashboard
                </Button>
              ) : (
                <>
                  <Button to="/auth" variant="secondary">
                    Sign in
                  </Button>
                  <Button to="/auth?mode=signup">Get started</Button>
                </>
              )}
              <Button to="/track" variant="ghost" className="col-span-2">
                <PackageSearch className="size-4" /> Track a shipment
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
