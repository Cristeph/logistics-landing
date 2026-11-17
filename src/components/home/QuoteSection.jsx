import { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import quoteBg from '@/assets/images/quote-bg.webp';
import { Button, Input, Select, Textarea } from '@/components/ui';
import { CONTACT } from '@/lib/constants';
import { email, minLength, maxLength, validate } from '@/lib/validators';
import { SectionHeading } from './Sections';

const EMPTY = { name: '', email: '', mode: 'Ocean freight', origin: '', destination: '', details: '' };
const RULES = {
  name: minLength('Name', 2, 80),
  email,
  origin: minLength('Origin', 2, 100),
  destination: minLength('Destination', 2, 100),
  details: [minLength('Package details', 3, 1000), maxLength('Package details', 1000)],
};

/**
 * There is no quote backend, so a valid request opens the visitor's mail app with everything
 * pre-filled (encoded via URLSearchParams, so input can't break out of the mailto URL).
 */
export default function QuoteSection() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: '' }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(values, RULES);
    setErrors(found);
    if (Object.keys(found).length) return;
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Service: ${values.mode}`,
      `From: ${values.origin.trim()}`,
      `To: ${values.destination.trim()}`,
      '',
      values.details.trim(),
    ].join('\n');
    const params = new URLSearchParams({ subject: `Quote request: ${values.origin.trim()} to ${values.destination.trim()}`, body });
    window.location.href = `mailto:${CONTACT.email}?${params.toString().replace(/\+/g, '%20')}`;
    setSent(true);
  };

  return (
    <section id="quote" className="relative scroll-mt-20 overflow-hidden bg-ink-950 py-24 sm:py-28">
      <img src={quoteBg} alt="" aria-hidden loading="lazy" className="absolute inset-0 size-full object-cover opacity-15" />
      <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            light
            eyebrow="Request a quote"
            title="Tell us what you're shipping."
            description="Share a few details and our team will get back to you with a price and the best route for your goods."
          />
          <ul className="mt-10 space-y-4 text-sm text-ink-200" data-reveal>
            <li className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-white/10"><Mail className="size-4" aria-hidden /></span>
              <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-white">{CONTACT.email}</a>
            </li>
            {CONTACT.phones.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-white/10"><Phone className="size-4" aria-hidden /></span>
                <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-white">{p}</a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={submit} noValidate className="rounded-2xl bg-white p-6 shadow-lift sm:p-8" data-reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Full name" value={values.name} onChange={set('name')} error={errors.name} autoComplete="name" required />
            <Input label="Email" type="email" value={values.email} onChange={set('email')} error={errors.email} autoComplete="email" required />
            <Input label="Shipping from" placeholder="e.g. Guangzhou, China" value={values.origin} onChange={set('origin')} error={errors.origin} required />
            <Input label="Shipping to" placeholder="e.g. Lagos, Nigeria" value={values.destination} onChange={set('destination')} error={errors.destination} required />
            <Select label="Service" value={values.mode} onChange={set('mode')} className="sm:col-span-2">
              {['Ocean freight', 'Air freight', 'Road freight', 'Express delivery', 'Not sure yet'].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </Select>
            <Textarea
              label="Package details"
              placeholder="What are you shipping? Approximate weight, size and quantity."
              value={values.details}
              onChange={set('details')}
              error={errors.details}
              className="sm:col-span-2"
              maxLength={1000}
              required
            />
          </div>
          <div className="mt-6 flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink-500">{sent ? 'Your email app should have opened. If not, email us directly.' : 'Opens your email app with the details filled in.'}</p>
            <Button type="submit" size="lg">
              <Send className="size-4" /> Request quote
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
