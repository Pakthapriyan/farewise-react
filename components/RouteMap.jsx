// RouteMap.jsx
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useRef } from "react";

// Guard against LRM occasional clearLines null errors
if (L?.Routing?.Control && L.Routing.Control.prototype._clearLines) {
  const orig = L.Routing.Control.prototype._clearLines;
  L.Routing.Control.prototype._clearLines = function () {
    try { return orig.call(this); } catch (e) { console.warn('LRM clearLines error ignored'); }
  };
}

function Routing({ startCoords, endCoords }) {
  const map = useMap();
  const controlRef = useRef(null);

  // Create control once
  useEffect(() => {
    if (!map || controlRef.current) return;

    const router = L.Routing.osrmv1({
      serviceUrl: 'https://router.project-osrm.org/route/v1',
      profile: 'driving',
      timeout: 10000,
      useHints: false,
    });

    const ctrl = L.Routing.control({
      waypoints: [],
      router,
      lineOptions: { styles: [{ color: "#3b82f6", weight: 5 }] },
      draggableWaypoints: false,
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      show: false,
      createMarker: () => null,
    })
      .on('routingerror', (e) => {
        console.warn('Routing error', e?.error || e);
      })
      .addTo(map);

    controlRef.current = ctrl;

    return () => {
      try { map.removeControl(ctrl); } catch (_) {}
      controlRef.current = null;
    };
  }, [map]);

  // Update waypoints when inputs change
  useEffect(() => {
    if (!controlRef.current) return;
    if (startCoords && endCoords) {
      controlRef.current.setWaypoints([
        L.latLng(startCoords.lat, startCoords.lng),
        L.latLng(endCoords.lat, endCoords.lng),
      ]);
    }
  }, [startCoords, endCoords]);

  return null;
}

export default function RouteMap({ startCoords, endCoords }) {
  const center = startCoords || { lat: 19.076, lng: 72.8777 }; // e.g., Mumbai
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
      className="rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {startCoords && endCoords && (
        <Routing startCoords={startCoords} endCoords={endCoords} />
      )}
    </MapContainer>
  );
}
