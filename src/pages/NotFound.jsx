import notFound from '@/assets/images/not-found-404.svg';
import PublicLayout from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <PublicLayout title="Page not found">
      <section className="container-page flex min-h-[70dvh] flex-col items-center justify-center py-16 text-center">
        <img src={notFound} alt="" aria-hidden className="w-full max-w-sm" />
        <h1 className="mt-8 text-3xl">This page took a wrong turn.</h1>
        <p className="mt-3 max-w-md text-ink-500">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex gap-3">
          <Button to="/">Back home</Button>
          <Button to="/track" variant="secondary">Track a shipment</Button>
        </div>
      </section>
    </PublicLayout>
  );
}
