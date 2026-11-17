import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { useDocumentTitle } from '@/hooks/misc';

/** Header + footer for marketing pages. Pass `overlay` when the page opens with a dark hero. */
export default function PublicLayout({ title, overlay = false, children }) {
  useDocumentTitle(title);
  return (
    <>
      <SiteHeader overlay={overlay} />
      <main id="main" className={overlay ? '' : 'pt-16 lg:pt-20'}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

/** Dark band used at the top of inner marketing pages. */
export function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(60rem 30rem at 85% -10%, rgb(157 17 17 / 0.35), transparent 60%), radial-gradient(40rem 25rem at 0% 120%, rgb(54 69 107 / 0.6), transparent 60%)',
        }}
        aria-hidden
      />
      <div className="container-page relative py-16 sm:py-20">
        {eyebrow && <p className="eyebrow text-brand-300">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl text-white sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base text-ink-300 sm:text-lg">{description}</p>}
        {children}
      </div>
    </section>
  );
}
