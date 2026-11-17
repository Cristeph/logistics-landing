import PublicLayout, { PageHero } from '@/components/layout/PublicLayout';
import { CallToAction, Features, Services } from '@/components/home/Sections';
import QuoteSection from '@/components/home/QuoteSection';
import { Button } from '@/components/ui';
import { useReveal } from '@/hooks/misc';

export default function ServicesPage() {
  const ref = useReveal();
  return (
    <PublicLayout title="Services">
      <div ref={ref}>
        <PageHero
          eyebrow="Services"
          title="Freight and delivery, end to end."
          description="Air, ocean and road freight, customs clearance and door-to-door delivery, with tracking at every step."
        >
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#quote" size="lg">Request a quote</Button>
            <Button to="/track" variant="outlineLight" size="lg">Track a shipment</Button>
          </div>
        </PageHero>
        <Services heading={false} />
        <Features />
        <QuoteSection />
        <div className="pt-24">
          <CallToAction />
        </div>
      </div>
    </PublicLayout>
  );
}
