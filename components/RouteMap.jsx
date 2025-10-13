// RouteMap.jsx
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect } from "react";

function Routing({ startCoords, endCoords }) {
  const map = useMap();

  useEffect(() => {
    if (!startCoords || !endCoords) return;
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(startCoords.lat, startCoords.lng),
        L.latLng(endCoords.lat, endCoords.lng),
      ],
      lineOptions: { styles: [{ color: "#3b82f6", weight: 5 }] },
      draggableWaypoints: false,
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, startCoords, endCoords]);

  return null;
}

export default function RouteMap({ startCoords, endCoords }) {
  const center = startCoords || { lat: 19.076, lng: 72.8777 }; // e.g., Mumbai
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={7}
      style={{ height: "400px", width: "100%" }}
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
