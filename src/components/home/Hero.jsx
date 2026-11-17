import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, PackageSearch, ShieldCheck, Timer, Globe2 } from 'lucide-react';
import ship from '@/assets/images/hero-ship.webp';
import plane from '@/assets/images/hero-plane.webp';
import truck from '@/assets/images/hero-truck.webp';
import { Button } from '@/components/ui';
import { normaliseTracking, TRACKING_RE } from '@/lib/validators';
import { cn } from '@/lib/cn';

const SLIDES = [
  { src: ship, word: 'Ocean' },
  { src: plane, word: 'Air' },
  { src: truck, word: 'Road' },
];

export function TrackForm({ dark = true, autoFocus = false, initial = '' }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(initial);
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    let id = normaliseTracking(value);
    if (!id) return setError('Enter your tracking number');
    if (!id.startsWith('TRK-')) id = `TRK-${id.replace(/^TRK/, '')}`;
    if (!TRACKING_RE.test(id)) return setError('That doesn’t look like a tracking number (e.g. TRK-7KQ2M9XHPA)');
    setError('');
    navigate(`/track/${encodeURIComponent(id)}`);
  };

  return (
    <form onSubmit={submit} noValidate className="w-full max-w-xl" role="search" aria-label="Track a shipment">
      <div
        className={cn(
          'flex items-center gap-2 rounded-2xl p-2 shadow-lift ring-1',
          dark ? 'bg-white/10 ring-white/20 backdrop-blur-md' : 'bg-white ring-ink-200'
        )}
      >
        <PackageSearch className={cn('ml-2 size-5 shrink-0', dark ? 'text-white/70' : 'text-ink-400')} aria-hidden />
        <label htmlFor="track-input" className="sr-only">
          Tracking number
        </label>
        <input
          id="track-input"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError('');
          }}
          placeholder="Enter tracking number, e.g. TRK-7KQ2M9XHPA"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          maxLength={20}
          autoFocus={autoFocus}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? 'track-error' : undefined}
          className={cn(
            'min-w-0 flex-1 bg-transparent py-2 text-base uppercase placeholder:normal-case focus:outline-none',
            dark ? 'text-white placeholder:text-white/55' : 'text-ink-900 placeholder:text-ink-400'
          )}
        />
        <Button type="submit" size="lg" className="h-11 px-5">
          Track <ArrowRight className="size-4" />
        </Button>
      </div>
      {error && (
        <p id="track-error" role="alert" className={cn('mt-2 text-sm font-medium', dark ? 'text-brand-200' : 'text-brand-600')}>
          {error}
        </p>
      )}
    </form>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-ink-950 pt-20 lg:min-h-dvh">
      {SLIDES.map((s, i) => (
        <img
          key={s.word}
          src={s.src}
          alt=""
          aria-hidden
          fetchPriority={i === 0 ? 'high' : 'low'}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className={cn(
            'absolute inset-0 -z-20 size-full object-cover transition-[opacity,transform] duration-[1600ms] ease-out',
            i === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          )}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/95 via-ink-950/65 to-ink-950/5" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-ink-950/55 sm:hidden" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-950/80 to-transparent" aria-hidden />

      <div className="container-page py-20">
        <div className="max-w-2xl animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
            <span className="size-1.5 rounded-full bg-brand-400" /> China ⇄ Nigeria · Worldwide
          </p>
          <h1 className="mt-6 text-4xl leading-[1.05] text-white sm:text-6xl">
            Fast, reliable{' '}
            <span className="relative inline-grid">
              {SLIDES.map((s, i) => (
                <span
                  key={s.word}
                  className={cn(
                    'col-start-1 row-start-1 text-brand-400 transition-all duration-700',
                    i === index ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                  )}
                  aria-hidden={i !== index}
                >
                  {s.word}
                </span>
              ))}
            </span>{' '}
            freight.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200">
            Delivering your packages safely and on time, anywhere in the world, with live tracking from pickup to doorstep.
          </p>
          <div className="mt-10">
            <TrackForm />
          </div>
          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-sm text-ink-200">
            {[
              [Timer, 'On-time', 'delivery focus'],
              [ShieldCheck, 'Insured', 'secure handling'],
              [Globe2, 'Door-to-door', 'customs included'],
            ].map(([Icon, a, b]) => (
              <div key={a} className="flex items-start gap-2">
                <Icon className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden />
                <div>
                  <dt className="font-semibold text-white">{a}</dt>
                  <dd className="text-xs text-ink-300">{b}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
