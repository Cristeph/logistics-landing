import { lazy, Suspense } from 'react';
import { useParams } from 'react-router';
import { CalendarClock, MapPin, PackageX, Route as RouteIcon } from 'lucide-react';
import PublicLayout, { PageHero } from '@/components/layout/PublicLayout';
import { TrackForm } from '@/components/home/Hero';
import { StatusSteps, Timeline } from '@/components/tracking/Progress';
import { Card, CardHeader, ErrorState, LoadingBlock, Skeleton, StatusBadge } from '@/components/ui';
import { FaqList, FAQ } from '@/pages/FAQPage';
import { useAsync } from '@/hooks/useAsync';
import { api } from '@/lib/api';
import { formatAddress, formatDate } from '@/lib/format';
import { normaliseTracking, TRACKING_RE } from '@/lib/validators';

const TrackingMap = lazy(() => import('@/components/tracking/TrackingMap'));

function Result({ id }) {
  const valid = TRACKING_RE.test(id);
  const state = useAsync((signal) => api.get(`/orders/${encodeURIComponent(id)}`, { signal, auth: false }), [id], { enabled: valid });

  if (!valid) {
    return (
      <Card className="p-2">
        <ErrorState error={{ message: `"${id}" isn't a valid tracking number. It should look like TRK-7KQ2M9XHPA.` }} />
      </Card>
    );
  }
  if (state.loading) return <Card className="p-6"><LoadingBlock label="Finding your shipment…" /></Card>;
  if (state.error) {
    const missing = state.error.status === 404;
    return (
      <Card className="p-2">
        {missing ? (
          <div className="flex flex-col items-center px-6 py-12 text-center">
            <PackageX className="size-10 text-ink-300" aria-hidden />
            <p className="mt-4 font-semibold text-ink-900">We couldn&apos;t find shipment {id}</p>
            <p className="mt-1 max-w-sm text-sm text-ink-500">Check the number on your receipt and try again. New shipments can take a few minutes to appear.</p>
          </div>
        ) : (
          <ErrorState error={state.error} onRetry={state.reload} />
        )}
      </Card>
    );
  }

  const t = state.data;
  const latest = t.history?.length ? [...t.history].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0] : null;
  const hasCoords = t.history?.some((h) => Number.isFinite(h.latitude) && Number.isFinite(h.longitude));

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-ink-500">Tracking number</p>
            <p className="mt-1 font-mono text-xl font-semibold tracking-wide text-ink-900">{t.trackingNumber}</p>
          </div>
          <StatusBadge status={t.status} />
        </div>
        <dl className="mt-6 grid gap-4 border-y border-ink-100 py-6 sm:grid-cols-3">
          <div className="flex gap-3">
            <RouteIcon className="mt-0.5 size-5 text-ink-400" aria-hidden />
            <div>
              <dt className="text-xs text-ink-500">Route</dt>
              <dd className="text-sm font-medium text-ink-900">{formatAddress(t.origin, { short: true })} → {formatAddress(t.destination, { short: true })}</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-5 text-ink-400" aria-hidden />
            <div>
              <dt className="text-xs text-ink-500">Last location</dt>
              <dd className="text-sm font-medium text-ink-900">{latest?.location || 'Awaiting first scan'}</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <CalendarClock className="mt-0.5 size-5 text-ink-400" aria-hidden />
            <div>
              <dt className="text-xs text-ink-500">{t.deliveredAt ? 'Delivered' : 'Estimated delivery'}</dt>
              <dd className="text-sm font-medium text-ink-900">
                {t.deliveredAt ? formatDate(t.deliveredAt) : t.estimatedDeliveryTime ? formatDate(t.estimatedDeliveryTime) : 'To be confirmed'}
              </dd>
            </div>
          </div>
        </dl>
        <div className="mt-8">
          <StatusSteps status={t.status} />
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Card>
          <CardHeader title="Shipment history" description={`${t.history?.length || 0} update${t.history?.length === 1 ? '' : 's'}`} />
          <div className="p-6">
            <Timeline history={t.history} />
          </div>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader title="Route map" />
          {hasCoords ? (
            <Suspense fallback={<Skeleton className="h-80 rounded-none sm:h-[26rem]" />}>
              <TrackingMap history={t.history} />
            </Suspense>
          ) : (
            <p className="p-6 text-sm text-ink-500">The map will appear once your shipment has its first located scan.</p>
          )}
        </Card>
      </div>
    </div>
  );
}

export default function TrackingPage() {
  const { trackingID } = useParams();
  const id = trackingID ? normaliseTracking(decodeURIComponent(trackingID)) : '';

  return (
    <PublicLayout title={id ? `Tracking ${id}` : 'Track a shipment'}>
      <PageHero eyebrow="Track & trace" title={id ? 'Shipment status' : 'Where is my shipment?'} description={!id ? 'Enter the tracking number from your receipt or notification.' : undefined}>
        <div className="mt-8">
          <TrackForm key={id} initial={id} autoFocus={!id} />
        </div>
      </PageHero>
      <section className="bg-ink-50/60 py-12 sm:py-16">
        <div className="container-page">
          {id ? <Result id={id} /> : null}
          <div className={id ? 'mt-16' : ''}>
            <h2 className="mb-6 text-2xl">Tracking questions</h2>
            <FaqList items={FAQ.filter(([q]) => /track|delay|lost|delivery/i.test(q))} />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
