import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { formatDateTime } from '@/lib/format';

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 1) map.setView(points[0], 6);
    else if (points.length > 1) map.fitBounds(points, { padding: [40, 40], maxZoom: 8 });
  }, [map, points]);
  return null;
}

/** Map of every history entry that has valid coordinates. Uses vector markers (no CDN images). */
export default function TrackingMap({ history }) {
  const stops = history.filter(
    (h) => Number.isFinite(h.latitude) && Number.isFinite(h.longitude) && Math.abs(h.latitude) <= 90 && Math.abs(h.longitude) <= 180
  );
  if (!stops.length) return null;
  const points = stops.map((h) => [h.latitude, h.longitude]);
  const last = stops.length - 1;

  return (
    <MapContainer center={points[last]} zoom={5} scrollWheelZoom={false} className="h-80 w-full sm:h-[26rem]" attributionControl>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FitBounds points={points} />
      {points.length > 1 && <Polyline positions={points} pathOptions={{ color: '#9d1111', weight: 3, dashArray: '6 8' }} />}
      {stops.map((h, i) => (
        <CircleMarker
          key={`${h.updatedAt}-${i}`}
          center={points[i]}
          radius={i === last ? 9 : 6}
          pathOptions={{ color: '#fff', weight: 2, fillColor: i === last ? '#9d1111' : '#36456b', fillOpacity: 1 }}
        >
          <Popup>
            <strong>{h.location}</strong>
            <br />
            {h.event}
            <br />
            <small>{formatDateTime(h.updatedAt)}</small>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
