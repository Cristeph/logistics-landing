import { Link } from 'react-router';
import { Mail, MapPin, Phone } from 'lucide-react';
import logoWhite from '@/assets/images/logo-white.webp';
import { CONTACT } from '@/lib/constants';

const COLUMNS = [
  {
    title: 'Company',
    links: [
      { to: '/#about', label: 'About us' },
      { to: '/services', label: 'Services' },
      { to: '/contact', label: 'Offices' },
      { to: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Customers',
    links: [
      { to: '/track', label: 'Track a shipment' },
      { to: '/#quote', label: 'Request a quote' },
      { to: '/auth?mode=signup', label: 'Create an account' },
      { to: '/dashboard', label: 'Dashboard' },
    ],
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <img src={logoWhite} alt="Cristeph Logistics" width="160" height="49" className="h-10 w-auto" loading="lazy" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">
            Air, ocean and road freight connecting China, Nigeria and the world, with tracking at every step.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h2 className="font-sans text-sm font-semibold text-white">{col.title}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="font-sans text-sm font-semibold text-white">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden />
              <a href={`mailto:${CONTACT.email}`} className="break-all transition-colors hover:text-white">
                {CONTACT.email}
              </a>
            </li>
            {CONTACT.phones.map((p) => (
              <li key={p} className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden />
                <a href={`tel:${p.replace(/\s/g, '')}`} className="transition-colors hover:text-white">
                  {p}
                </a>
              </li>
            ))}
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden />
              <span>Lagos · Abuja · Kano · Guangzhou · Shenzhen</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-500 sm:flex-row sm:justify-between">
          <p>© {year} Cristeph International Trade &amp; Logistics Limited. All rights reserved.</p>
          <p>Lagos, Nigeria · Guangzhou, China</p>
        </div>
      </div>
    </footer>
  );
}
