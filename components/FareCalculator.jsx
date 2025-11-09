import { useState } from "react";
import InputField from './InputField';
import Button1 from './Button1';
import RouteMap from "./RouteMap";
import FareBreakdown from './FareBreakdown';
import {
  calculateDistance,
  calculateFare,
  getConditionsLabels,
} from '../services/fareCalculationService';

// Geocoding helper function with fallback and timeout
async function geocode(addr) {
  const q = encodeURIComponent(addr);
  const attempts = [
    `/api/geocode?format=jsonv2&limit=1&q=${q}`,
    // Fallback public proxy (best‑effort)
    `https://geocode.maps.co/search?format=json&limit=1&q=${q}`,
  ];

  for (const url of attempts) {
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(t);
      if (!res.ok) {
        // If first proxy isn’t active, hint to restart dev server
        if (url.startsWith('/api/') && (res.status === 404 || res.status === 502)) {
          console.warn('Dev proxy might not be active for', url);
          continue;
        }
        // Try next provider
        continue;
      }
      const data = await res.json();
      if (data && data.length > 0) {
        const item = data[0];
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon || item.lng);
        if (!Number.isNaN(lat) && !Number.isNaN(lng)) return { lat, lng };
      }
    } catch (e) {
      console.warn('Geocode attempt failed for', url, e);
      // try next
    }
  }
  throw new Error('Unable to geocode location');
}

export default function FareCalculator({ start, end, onStartChange, onEndChange }) {
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [vehicle, setVehicle] = useState('auto');
  const [fare, setFare] = useState(null);
  const [conditions, setConditions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    try {
      setLoading(true);
      setError(null);
      const sc = await geocode(start);
      const ec = await geocode(end);
      
      if (!sc || !ec) {
        setError('Could not find one or both locations. Please try again.');
        setFare(null);
        setLoading(false);
        return;
      }
      
      setStartCoords(sc);
      setEndCoords(ec);
      
      const distance = calculateDistance(sc, ec);
      if (distance > 0) {
        const fareData = await calculateFare(distance, vehicle, sc);
        const conditionsData = await getConditionsLabels(sc);
        
        setFare(fareData);
        setConditions(conditionsData);
      } else {
        setError('Could not calculate distance. Please try different locations.');
        setFare(null);
      }
    } catch (err) {
      console.error('Error calculating fare:', err);
      setError('An error occurred while calculating fare. Please try again.');
      setFare(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white py-6 md:py-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-14 px-4">Fare Calculator</h2>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-0">
        {/* Form and Map Row */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-14 items-start mb-6 md:mb-8">
          {/* Left: Form column */}
          <form
            className="flex flex-col gap-5 md:gap-7 w-full"
            onSubmit={e => { e.preventDefault(); handleCalculate(); }}
          >
          <label className="font-semibold text-sm md:text-base mb-1">From</label>
            <InputField
              placeholder="Enter start location"
              value={start}
              onChange={onStartChange}
              className="rounded-full bg-gray-100 border-none px-4 md:px-7 py-3 md:py-4 text-gray-700 text-sm md:text-base placeholder:text-gray-500 focus:ring-2 focus:ring-[#FE7743] focus:border-none"
            />
            <label className="font-semibold text-sm md:text-base mb-1 mt-2">To</label>
            <InputField
              placeholder="Enter destination"
              value={end}
              onChange={onEndChange}
              className="rounded-full bg-gray-100 border-none px-4 md:px-7 py-3 md:py-4 text-gray-700 text-sm md:text-base placeholder:text-gray-500 focus:ring-2 focus:ring-[#FE7743] focus:border-none"
            />
          <div className="mt-3 md:mt-2">
            <label className="font-semibold text-sm md:text-base mb-2 block">Choose Vehicle</label>
            <div className="flex gap-4 md:gap-8 items-center mt-2 flex-wrap">
              {["bike", "auto", "car"].map(v => (
                <label
                  key={v}
                  className={`flex items-center gap-2 text-sm md:text-base font-normal ${vehicle === v ? 'text-[#FE7743]' : 'text-gray-800'}`}
                >
                  <input
                    type="radio"
                    name="vehicle"
                    value={v}
                    checked={vehicle === v}
                    onChange={() => setVehicle(v)}
                    className="accent-[#FE7743] w-4 md:w-5 h-4 md:h-5"
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
                disabled={loading}
                className="mt-4 md:mt-6 w-full py-3 md:py-4 rounded-full bg-[#FE7743] hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-base md:text-lg shadow-none transition"
              >
                {loading ? 'Calculating...' : 'Get Fare'}
              </Button1>
              {error && !fare && (
                <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm">
                  {error}
                </div>
              )}
          </form>
          {/* Right: Live map */}
          <div className="flex items-center justify-center w-full h-[350px] bg-gray-200 rounded-2xl overflow-hidden">
            <RouteMap startCoords={startCoords} endCoords={endCoords} />
          </div>
        </div>
        {/* Full Width: Fare Breakdown */}
        {fare && <FareBreakdown fare={fare} conditions={conditions} />}
      </div>
    </section>
  );
}
