// OpenStreetMap Nominatim search. Usage policy: max ~1 req/s, so callers debounce input
// and we cache results for the session.
const cache = new Map();

export async function searchPlaces(query, { signal, limit = 5 } = {}) {
  const q = query.trim();
  if (q.length < 3) return [];
  const key = `${q.toLowerCase()}|${limit}`;
  if (cache.has(key)) return cache.get(key);

  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', q); // URLSearchParams encodes it: no query-string injection
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', String(limit));

  const res = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error('Location search is unavailable right now');
  const data = await res.json();
  const places = (Array.isArray(data) ? data : [])
    .map((p) => ({ id: p.place_id, label: p.display_name, latitude: Number(p.lat), longitude: Number(p.lon) }))
    .filter((p) => Number.isFinite(p.latitude) && Number.isFinite(p.longitude));
  cache.set(key, places);
  return places;
}
