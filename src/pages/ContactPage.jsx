import { Mail, Phone } from 'lucide-react';
import PublicLayout, { PageHero } from '@/components/layout/PublicLayout';
import { Offices } from '@/components/home/Sections';
import QuoteSection from '@/components/home/QuoteSection';
import { Card } from '@/components/ui';
import { CONTACT } from '@/lib/constants';
import { useReveal } from '@/hooks/misc';

export default function ContactPage() {
  const ref = useReveal();
  return (
    <PublicLayout title="Contact">
      <div ref={ref}>
        <PageHero eyebrow="Contact" title="Let's get in touch." description="Call, email or visit one of our offices in Nigeria and China." />
        <section className="bg-white py-16">
          <div className="container-page grid gap-5 md:grid-cols-2">
            <Card className="flex items-start gap-4 p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Mail className="size-5" aria-hidden /></span>
              <div className="min-w-0">
                <p className="font-semibold text-ink-900">Email</p>
                <a href={`mailto:${CONTACT.email}`} className="mt-1 block text-sm break-all text-ink-600 hover:text-brand-700">{CONTACT.email}</a>
              </div>
            </Card>
            <Card className="flex items-start gap-4 p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Phone className="size-5" aria-hidden /></span>
              <div>
                <p className="font-semibold text-ink-900">Phone</p>
                {CONTACT.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="mt-1 block text-sm text-ink-600 hover:text-brand-700">{p}</a>
                ))}
              </div>
            </Card>
          </div>
          <div className="container-page mt-16">
            <h2 className="text-2xl">Our offices</h2>
            <div className="mt-6">
              <Offices />
            </div>
          </div>
        </section>
        <QuoteSection />
      </div>
    </PublicLayout>
  );
}
