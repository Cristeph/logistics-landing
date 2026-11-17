import { useEffect, useId, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Input, Spinner } from '@/components/ui';
import { useDebounce } from '@/hooks/misc';
import { searchPlaces } from '@/lib/geocode';

/**
 * Free-text location with OpenStreetMap suggestions. Picking a suggestion fills coordinates;
 * typing again clears them, so stale coordinates never get submitted with a new name.
 * value: { location, latitude, longitude }
 */
export default function LocationSearch({ label = 'Location', value, onChange, error, required }) {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [active, setActive] = useState(-1);
  const query = useDebounce(value.location, 500);
  const listId = useId();

  useEffect(() => {
    if (!open || value.latitude !== undefined || query.trim().length < 3) {
      setResults([]);
      return undefined;
    }
    const controller = new AbortController();
    setLoading(true);
    setLookupError('');
    searchPlaces(query, { signal: controller.signal })
      .then((r) => {
        setResults(r);
        setActive(-1);
      })
      .catch((e) => e.name !== 'AbortError' && setLookupError(e.message))
      .finally(() => !controller.signal.aborted && setLoading(false));
    return () => controller.abort();
  }, [query, open, value.latitude]);

  const choose = (p) => {
    onChange({ location: p.label.split(',').slice(0, 3).join(',').trim(), latitude: p.latitude, longitude: p.longitude });
    setOpen(false);
    setResults([]);
  };

  const onKeyDown = (e) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a <= 0 ? results.length - 1 : a - 1));
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const hasCoords = Number.isFinite(value.latitude);

  return (
    <div className="relative">
      <Input
        label={label}
        value={value.location}
        onChange={(e) => {
          onChange({ location: e.target.value, latitude: undefined, longitude: undefined });
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={onKeyDown}
        error={error}
        required={required}
        maxLength={300}
        autoComplete="off"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls={listId}
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        hint={
          hasCoords
            ? `Pinned on map (${value.latitude.toFixed(3)}, ${value.longitude.toFixed(3)})`
            : lookupError || 'Pick a suggestion to show this stop on the tracking map.'
        }
      />
      {loading && <Spinner className="absolute top-9 right-3" label="Searching places" />}
      {open && results.length > 0 && (
        <ul id={listId} role="listbox" className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-ink-100 bg-white py-1 shadow-lift">
          {results.map((p, i) => (
            <li
              key={p.id}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(p)}
              className={`flex cursor-pointer gap-2 px-3 py-2 text-sm ${i === active ? 'bg-ink-50' : 'hover:bg-ink-50'}`}
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-ink-400" aria-hidden />
              <span className="line-clamp-2 text-ink-700">{p.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
