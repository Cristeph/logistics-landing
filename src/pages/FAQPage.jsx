import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import PublicLayout, { PageHero } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui';
import { cn } from '@/lib/cn';

export const FAQ = [
  ['What areas or countries do you cover?', 'We provide shipping services to over 50 countries, covering regions in North America, Europe, Asia and Africa. Our network lets us ship to even remote locations.'],
  ['What types of goods do you handle?', 'General cargo, hazardous materials, perishable items and oversized cargo. Our team is equipped to manage specialised shipments with care and precision.'],
  ['What are your shipping options and transit times?', 'Air, sea, road and rail. Air shipping takes 2-5 days, sea shipping 15-30 days, and road/rail times vary by region.'],
  ['How do you calculate shipping costs?', 'By weight, volume, distance and type of goods. Extra services such as insurance or special handling can affect the final price.'],
  ['What documents are required for international shipping?', 'Typically the commercial invoice, bill of lading, certificate of origin and customs forms for the destination country. We guide you through the paperwork.'],
  ['Do you offer door-to-door delivery?', 'Yes. Door-to-door delivery includes customs clearance and last-mile delivery to the final destination.'],
  ['How do I track my shipment?', 'Enter your tracking number on the Track page to see the status and every update on a map, from pickup to delivery. Signed-in customers also get in-app notifications.'],
  ['How do you keep goods safe?', 'Secure packaging, insurance options and tracking on every shipment. Our warehouses are monitored 24/7 to prevent theft or damage.'],
  ['How do you handle customs clearance?', 'Our experienced customs brokers handle documentation and communication with customs authorities for quick, smooth clearance.'],
  ['What happens if a shipment is delayed or lost?', 'We keep you informed at every step. For lost or damaged shipments we help you file a claim, with compensation depending on the insurance cover selected.'],
];

export function FaqList({ items = FAQ }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white shadow-soft">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q}>
            <h3 className="font-sans">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-ink-900 hover:text-brand-700"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {q}
                <ChevronDown className={cn('size-5 shrink-0 text-ink-400 transition-transform', isOpen && 'rotate-180')} aria-hidden />
              </button>
            </h3>
            <div id={`faq-${i}`} role="region" hidden={!isOpen} className="px-6 pb-6 text-sm leading-relaxed text-ink-600">
              {a}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function FAQPage() {
  const [query, setQuery] = useState('');
  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? FAQ.filter(([a, b]) => `${a} ${b}`.toLowerCase().includes(q)) : FAQ;
  }, [query]);

  return (
    <PublicLayout title="FAQ">
      <PageHero eyebrow="Help centre" title="Frequently asked questions" description="Quick answers about shipping, tracking, customs and payments.">
        <div className="mt-8 flex max-w-xl items-center gap-2 rounded-xl bg-white/10 px-4 ring-1 ring-white/20">
          <Search className="size-4 text-white/70" aria-hidden />
          <label htmlFor="faq-search" className="sr-only">Search questions</label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            className="h-12 flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none"
          />
        </div>
      </PageHero>
      <section className="bg-ink-50/60 py-16">
        <div className="container-page max-w-3xl">
          {items.length ? (
            <FaqList key={query} items={items} />
          ) : (
            <p className="rounded-2xl bg-white p-8 text-center text-ink-600 shadow-soft">No questions match &ldquo;{query}&rdquo;.</p>
          )}
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <p className="text-ink-600">Still have questions?</p>
            <Button to="/contact" variant="dark">Contact our team</Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
