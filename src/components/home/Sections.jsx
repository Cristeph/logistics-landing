import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Headset, MapPinned, PackageCheck, Plane, Quote, Ship, ShieldCheck, Truck, Zap, Container, Building2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { OFFICES } from '@/lib/constants';
import { initials } from '@/lib/format';
import ctaBg from '@/assets/images/cta-bg.webp';

export function SectionHeading({ eyebrow, title, description, align = 'left', light = false }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} data-reveal>
      {eyebrow && <p className={`eyebrow ${light ? 'text-brand-300' : ''}`}>{eyebrow}</p>}
      <h2 className={`mt-3 text-3xl sm:text-4xl ${light ? 'text-white' : ''}`}>{title}</h2>
      {description && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-ink-300' : 'text-ink-500'}`}>{description}</p>}
    </div>
  );
}

function Counter({ end, suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setValue(end);
      return undefined;
    }
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        setValue(Math.round(end * (1 - (1 - p) ** 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export function About() {
  const stats = [
    { end: 20, suffix: '+', label: 'Years of experience' },
    { end: 500, suffix: '+', label: 'Happy clients' },
    { end: OFFICES.length, suffix: '', label: 'Offices in China & Nigeria' },
  ];
  return (
    <section id="about" className="scroll-mt-20 bg-white py-24 sm:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Who we are"
            title="We reach globally, and deliver locally."
            description="Seamless global logistics connecting key markets like China and Nigeria. With trusted partnerships and expertise in ocean, air and road freight, we provide reliable, cost-effective solutions for large and small shipments, with smooth delivery and customs clearance worldwide."
          />
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-ink-100 pt-8" data-reveal>
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-3xl text-ink-900 sm:text-4xl">
                  <Counter end={s.end} suffix={s.suffix} />
                </dd>
                <dt className="mt-1 text-xs text-ink-500 sm:text-sm">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 gap-4" data-reveal style={{ '--reveal-delay': '150ms' }}>
          {[
            [Ship, 'Ocean freight', 'FCL & LCL from Chinese ports'],
            [Plane, 'Air freight', '2-5 day priority cargo'],
            [Truck, 'Road freight', 'Last-mile across Nigeria'],
            [ShieldCheck, 'Customs', 'Clearance handled for you'],
          ].map(([Icon, t, d], i) => (
            <div
              key={t}
              className={`rounded-2xl p-6 ${i % 3 === 0 ? 'bg-ink-950 text-white' : 'bg-ink-50 text-ink-900'} ${i === 1 ? 'translate-y-6' : ''} ${i === 3 ? 'translate-y-6' : ''}`}
            >
              <Icon className={`size-7 ${i % 3 === 0 ? 'text-brand-400' : 'text-brand-700'}`} aria-hidden />
              <p className="mt-6 font-semibold">{t}</p>
              <p className={`mt-1 text-sm ${i % 3 === 0 ? 'text-ink-300' : 'text-ink-500'}`}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: Zap, title: 'Fast delivery', description: 'We prioritise speed without compromising the safety of your goods.' },
  { icon: PackageCheck, title: 'Trusted by clients', description: 'Thousands of satisfied customers globally.' },
  { icon: Headset, title: '24/7 support', description: 'Always here to assist you with your shipping needs.' },
  { icon: MapPinned, title: 'Real-time tracking', description: 'Follow your shipment from pickup to delivery on a live map.' },
];

export function Features() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-white sm:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(50rem 30rem at 100% 0%, rgb(157 17 17 / 0.28), transparent 60%)' }}
        aria-hidden
      />
      <div className="container-page relative">
        <SectionHeading
          light
          eyebrow="Why Cristeph"
          title="Your packages are in safe hands."
          description="Trust is at the core of what we do. Every shipment is handled with care and arrives intact and on time."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="bg-ink-950 p-7" data-reveal style={{ '--reveal-delay': `${i * 90}ms` }}>
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand-700/20 text-brand-300 ring-1 ring-brand-400/20">
                <f.icon className="size-5" aria-hidden />
              </div>
              <h3 className="mt-6 font-sans text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const SERVICES = [
  { icon: Zap, title: 'Express delivery', description: 'Same-day or guaranteed delivery for urgent packages across local, national and international routes.' },
  { icon: Container, title: 'Cargo services', description: 'Comprehensive freight by air, sea or land, with secure and timely delivery of large shipments.' },
  { icon: MapPinned, title: 'Track and trace', description: 'Monitor shipments in real time from pickup to delivery, with in-app notifications at every step.' },
  { icon: Truck, title: 'Road freight', description: 'Flexible ground transport for short-haul and long-distance loads across cities, states and borders.' },
  { icon: Ship, title: 'Ocean freight', description: 'Cost-effective shipping for large or bulky goods, with access to global ports for international trade.' },
  { icon: Plane, title: 'Air freight', description: 'High-priority air transport for time-sensitive cargo, connecting major global hubs.' },
];

export function Services({ heading = true }) {
  return (
    <section id="services" className="scroll-mt-20 bg-ink-50/60 py-24 sm:py-28">
      <div className="container-page">
        {heading && (
          <SectionHeading
            eyebrow="What we do"
            title="Delivery solutions for every shipment."
            description="Whether it's an urgent parcel or a full container, we have a service designed for it."
          />
        )}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <article
              key={s.title}
              className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              data-reveal
              style={{ '--reveal-delay': `${(i % 3) * 90}ms` }}
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                <s.icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-6 font-sans text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{s.description}</p>
              <a href="/#quote" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-600">
                Get a quote <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    quote:
      'I love that Cristeph provides real-time tracking updates for every shipment. The notifications are timely, and the customer service team is very responsive if I ever have questions.',
    name: 'Laura M.',
    title: 'Small business owner',
  },
  {
    quote:
      'We use Cristeph for both express and bulk cargo. Whether it’s same-day delivery or complex cargo logistics, they always deliver on time with secure handling of our goods.',
    name: 'Brian T.',
    title: 'Supply chain manager',
  },
  {
    quote:
      'Cristeph made international shipping seamless. Their team handled all the paperwork and customs details for us. We trust them with all our major shipments.',
    name: 'Martha R.',
    title: 'Global logistics coordinator',
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by businesses that can't afford delays."
          align="center"
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-ink-100 bg-white p-8 shadow-soft"
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              <Quote className="size-8 text-brand-200" aria-hidden />
              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-700">{t.quote}</blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-ink-100 pt-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-ink-900 text-sm font-semibold text-white" aria-hidden>
                  {initials(t.name)}
                </span>
                <div>
                  <p className="font-semibold text-ink-900">{t.name}</p>
                  <p className="text-sm text-ink-500">{t.title}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CallToAction() {
  return (
    <section className="bg-white px-4 pb-24 sm:px-6 lg:px-8">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-ink-950 bg-cover bg-center px-6 py-16 text-center sm:px-16 sm:py-20"
        style={{ backgroundImage: `linear-gradient(120deg, rgb(6 12 30 / 0.92), rgb(124 18 18 / 0.85)), url(${ctaBg})` }}
        data-reveal
      >
        <h2 className="mx-auto max-w-2xl text-3xl text-white sm:text-4xl">Ready to ship with us?</h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-200">Create a free account to book pickups, pay invoices and follow every shipment in one place.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/auth?mode=signup" variant="light" size="lg">
            Create free account
          </Button>
          <Button href="#quote" variant="outlineLight" size="lg">
            Request a quote
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Offices({ compact = false }) {
  const list = compact ? OFFICES.slice(0, 6) : OFFICES;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((o, i) => (
        <div key={`${o.city}-${i}`} className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft" data-reveal style={{ '--reveal-delay': `${(i % 3) * 70}ms` }}>
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ink-50 text-ink-700">
            <Building2 className="size-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-ink-900">
              {o.city} <span className="font-normal text-ink-400">· {o.country}</span>
            </p>
            <p className="mt-1 text-sm text-ink-500">{o.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
