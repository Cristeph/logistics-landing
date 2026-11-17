import PublicLayout from '@/components/layout/PublicLayout';
import Hero from '@/components/home/Hero';
import { About, CallToAction, Features, Offices, SectionHeading, Services, Testimonials } from '@/components/home/Sections';
import QuoteSection from '@/components/home/QuoteSection';
import { Button } from '@/components/ui';
import { useReveal } from '@/hooks/misc';

export default function HomePage() {
  const ref = useReveal();
  return (
    <PublicLayout overlay>
      <div ref={ref}>
        <Hero />
        <About />
        <Features />
        <Services />
        <Testimonials />
        <QuoteSection />
        <section id="contact" className="scroll-mt-20 bg-white py-24 sm:py-28">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow="Our offices" title="Come visit us." description="With offices across Nigeria and China, there's always a team nearby to help with your shipment." />
              <Button to="/contact" variant="secondary" data-reveal>
                All offices &amp; contacts
              </Button>
            </div>
            <div className="mt-12">
              <Offices compact />
            </div>
          </div>
        </section>
        <CallToAction />
      </div>
    </PublicLayout>
  );
}
