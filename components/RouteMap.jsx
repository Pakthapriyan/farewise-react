// RouteMap.jsx
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useRef, useState } from "react";

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
  const [controlReady, setControlReady] = useState(false);

  // Create control once (after map is ready)
  useEffect(() => {
    if (!map || controlRef.current) return;

    map.whenReady(() => {
      if (controlRef.current) return;

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
      setControlReady(true);
    });

    return () => {
      if (controlRef.current) {
        try { map.removeControl(controlRef.current); } catch (_) {}
        controlRef.current = null;
        setControlReady(false);
      }
    };
  }, [map]);

  // Update waypoints when inputs change
  useEffect(() => {
    const ctrl = controlRef.current;
    if (!ctrl || !controlReady) return;
    if (startCoords && endCoords) {
      try {
        ctrl.setWaypoints([
          L.latLng(startCoords.lat, startCoords.lng),
          L.latLng(endCoords.lat, endCoords.lng),
        ]);
      } catch (e) {
        console.warn('Failed to set waypoints', e);
      }
    }
  }, [startCoords, endCoords, controlReady]);

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
