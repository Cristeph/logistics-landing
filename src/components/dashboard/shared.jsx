import { Box, MapPin, Ruler, User as UserIcon, Truck } from 'lucide-react';
import { Input } from '@/components/ui';
import { StatusSteps, Timeline } from '@/components/tracking/Progress';
import { formatAddress, formatDate, formatNumber } from '@/lib/format';

export function AddressFields({ prefix, legend, values, errors, onChange }) {
  const f = (k) => `${prefix}.${k}`;
  return (
    <fieldset className="space-y-4">
      <legend className="mb-1 text-sm font-semibold text-ink-900">{legend}</legend>
      <Input label="Street address" value={values.street} onChange={onChange(f('street'))} error={errors[f('street')]} autoComplete="street-address" required maxLength={200} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="City" value={values.city} onChange={onChange(f('city'))} error={errors[f('city')]} autoComplete="address-level2" required maxLength={100} />
        <Input label="State / province" value={values.state} onChange={onChange(f('state'))} error={errors[f('state')]} autoComplete="address-level1" required maxLength={100} />
        <Input label="Postal code" value={values.postalCode} onChange={onChange(f('postalCode'))} error={errors[f('postalCode')]} autoComplete="postal-code" maxLength={20} hint="Optional" />
        <Input label="Country" value={values.country} onChange={onChange(f('country'))} error={errors[f('country')]} autoComplete="country-name" required maxLength={100} />
      </div>
    </fieldset>
  );
}

function Row({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-ink-400" aria-hidden />
      <div className="min-w-0">
        <dt className="text-xs text-ink-500">{label}</dt>
        <dd className="text-sm break-words text-ink-900">{children}</dd>
      </div>
    </div>
  );
}

/** Read-only order summary used by both the customer and admin views. */
export function OrderDetails({ order, showCustomer = false }) {
  const p = order.packageDetails || {};
  const d = p.dimensions || {};
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-sm font-semibold tracking-wide text-ink-900">{order.trackingNumber}</p>
        <p className="text-xs text-ink-500">Created {formatDate(order.createdAt)}</p>
      </div>
      <StatusSteps status={order.status} />
      <dl className="grid gap-4 rounded-xl bg-ink-50/70 p-4 sm:grid-cols-2">
        {showCustomer && (
          <Row icon={UserIcon} label="Customer">
            {order.customer ? (
              <>
                {order.customer.name}
                <span className="block text-xs text-ink-500">{order.customer.email}</span>
              </>
            ) : (
              <span className="text-ink-500">Deleted account</span>
            )}
          </Row>
        )}
        <Row icon={Truck} label="Courier">{order.courier?.name || 'Not assigned yet'}</Row>
        <Row icon={MapPin} label="Pickup">{formatAddress(order.pickupAddress)}</Row>
        <Row icon={MapPin} label="Drop-off">{formatAddress(order.dropoffAddress)}</Row>
        <Row icon={Box} label="Package">
          {p.description || 'No description'} · {formatNumber(p.weight)} kg
        </Row>
        <Row icon={Ruler} label="Dimensions">
          {d.length && d.width && d.height ? `${d.length} × ${d.width} × ${d.height} cm` : '-'}
        </Row>
      </dl>
      <div>
        <h3 className="mb-4 font-sans text-sm font-semibold text-ink-900">History</h3>
        <Timeline history={order.history} />
      </div>
    </div>
  );
}

/** Minimal SVG bar chart (replaces @mui/x-charts + emotion, ~300 kB). */
export function BarChart({ data, height = 200, valueLabel = (v) => v, emptyLabel = 'No data yet' }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  if (!data.length || data.every((d) => !d.value)) {
    return <p className="flex items-center justify-center text-sm text-ink-500" style={{ height }}>{emptyLabel}</p>;
  }
  return (
    <div className="flex items-end gap-2" style={{ height }} role="img" aria-label={data.map((d) => `${d.label}: ${valueLabel(d.value)}`).join(', ')}>
      {data.map((d) => (
        <div key={d.label} className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
          <span className="text-[0.65rem] font-medium text-ink-500 opacity-0 transition-opacity group-hover:opacity-100">{valueLabel(d.value)}</span>
          <div
            className="w-full max-w-10 rounded-t-md bg-ink-800 transition-colors group-hover:bg-brand-700"
            style={{ height: `${Math.max(d.value ? 4 : 0, (d.value / max) * 100)}%` }}
          />
          <span className="w-full truncate text-center text-[0.65rem] text-ink-500">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
