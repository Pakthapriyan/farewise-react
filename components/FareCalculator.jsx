import { useState } from "react";
import InputField from './InputField';
import Button1 from './Button1';
import RouteMap from "./RouteMap";

// Geocoding helper function
async function geocode(addr) {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addr)}`);
  const data = await res.json();
  if (data && data.length > 0) {
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  }
  return null;
}

const basePrices = { auto: 10, car: 15, bike: 7 };

function calcDistance(c1, c2) {
  if (!c1 || !c2) return 0;
  const toRad = deg => deg * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(c2.lat - c1.lat);
  const dLon = toRad(c2.lng - c1.lng);
  const a = Math.sin(dLat/2)**2 +
    Math.cos(toRad(c1.lat)) *
    Math.cos(toRad(c2.lat)) *
    Math.sin(dLon/2)**2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * 10) / 10;
}

export default function FareCalculator({ start, end, onStartChange, onEndChange }) {
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [vehicle, setVehicle] = useState('auto');
  const [fare, setFare] = useState(null);

  const handleCalculate = async () => {
    const sc = await geocode(start);
    const ec = await geocode(end);
    setStartCoords(sc);
    setEndCoords(ec);
    const distance = calcDistance(sc, ec);
    if (distance > 0) {
      setFare(distance * basePrices[vehicle]);
    } else {
      setFare(null);
    }
  };

  return (
    <section className="w-full bg-white py-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h2 className="text-3xl font-semibold text-center mb-14">Fare Calculator</h2>
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
        {/* Left: Form column */}
        <form
          className="flex flex-col gap-7 px-2 md:px-0 max-w-[420px] w-full"
          onSubmit={e => { e.preventDefault(); handleCalculate(); }}
        >
          <label className="font-semibold text-base mb-1">From</label>
          <InputField
            placeholder="Enter start location"
            value={start}
            onChange={onStartChange}
            className="rounded-full bg-gray-100 border-none px-7 py-4 text-gray-700 text-base placeholder:text-gray-500 focus:ring-2 focus:ring-[#FE7743] focus:border-none"
          />
          <label className="font-semibold text-base mb-1 mt-2">To</label>
          <InputField
            placeholder="Enter destination"
            value={end}
            onChange={onEndChange}
            className="rounded-full bg-gray-100 border-none px-7 py-4 text-gray-700 text-base placeholder:text-gray-500 focus:ring-2 focus:ring-[#FE7743] focus:border-none"
          />
          <div className="mt-2">
            <label className="font-semibold text-base mb-2 block">Choose Vehicle</label>
            <div className="flex gap-8 items-center mt-2">
              {["bike", "auto", "car"].map(v => (
                <label
                  key={v}
                  className={`flex items-center gap-2 text-base font-normal ${vehicle === v ? 'text-[#FE7743]' : 'text-gray-800'}`}
                >
                  <input
                    type="radio"
                    name="vehicle"
                    value={v}
                    checked={vehicle === v}
                    onChange={() => setVehicle(v)}
                    className="accent-[#FE7743] w-5 h-5"
                  />
                  <span style={{ textTransform: "capitalize" }}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <Button1
              onClick={handleCalculate}
              className="mt-6 w-full py-4 rounded-full bg-[#FE7743] hover:bg-orange-500 text-white font-semibold text-lg shadow-none"
            >
              Get Fare
            </Button1>
            {fare !== null && (
              <div className="mt-4 text-lg font-semibold text-[#FE7743] text-center">
                Estimated Fare: ₹{fare.toFixed(2)}
              </div>
            )}
        </form>
        {/* Right: Live map always visible */}
        <div className="flex items-center justify-center w-full h-[350px] bg-gray-200 rounded-2xl overflow-hidden">
          <RouteMap startCoords={startCoords} endCoords={endCoords} />
        </div>
      </div>
    </section>
  );
}
