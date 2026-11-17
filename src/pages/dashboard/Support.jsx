import { Bell, BookOpen, CreditCard, Mail, PackageSearch, Phone, ShieldCheck, UserCog } from 'lucide-react';
import { Link } from 'react-router';
import { Card, PageHeader } from '@/components/ui';
import { FaqList, FAQ } from '@/pages/FAQPage';
import { CONTACT } from '@/lib/constants';

const TOPICS = [
  { icon: BookOpen, title: 'Booking a shipment', text: 'Enter pickup and delivery addresses plus package size and weight.', to: '/dashboard/booking?tab=new' },
  { icon: PackageSearch, title: 'Tracking', text: 'Every shipment gets a TRK- number you can share with the recipient.', to: '/track' },
  { icon: CreditCard, title: 'Payments', text: 'Invoices appear under Payments and can be paid by card via Paystack.', to: '/dashboard/payment' },
  { icon: Bell, title: 'Notifications', text: 'We notify you when your shipment moves or an invoice is ready.', to: '/dashboard/notifications' },
  { icon: UserCog, title: 'Your account', text: 'Update your contact details and password at any time.', to: '/dashboard/accountmanagement' },
  { icon: ShieldCheck, title: 'Safety & claims', text: 'Insurance options and claim support for lost or damaged goods.', to: '/faq' },
];

export default function Support() {
  return (
    <>
      <PageHeader title="Help & support" description="Answers to common questions, and how to reach us." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {TOPICS.map((t) => (
          <Link key={t.title} to={t.to} className="group rounded-2xl border border-ink-100 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white">
              <t.icon className="size-5" aria-hidden />
            </span>
            <p className="mt-4 font-semibold text-ink-900">{t.title}</p>
            <p className="mt-1 text-sm text-ink-500">{t.text}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="mb-4 font-sans text-lg font-semibold">Frequently asked</h2>
          <FaqList items={FAQ.slice(0, 6)} />
        </div>
        <Card className="h-fit p-6">
          <h2 className="font-sans text-lg font-semibold">Contact us</h2>
          <p className="mt-1 text-sm text-ink-500">Include your tracking number so we can help faster.</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 text-brand-700" aria-hidden />
              <a className="break-all text-ink-800 hover:text-brand-700" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            {CONTACT.phones.map((p) => (
              <li key={p} className="flex gap-3">
                <Phone className="mt-0.5 size-4 text-brand-700" aria-hidden />
                <a className="text-ink-800 hover:text-brand-700" href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
