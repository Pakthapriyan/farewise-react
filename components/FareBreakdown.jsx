import React from 'react';
import { Cloud, CloudRain, Zap, AlertCircle, MapPin } from 'lucide-react';

export default function FareBreakdown({ fare, conditions }) {
  if (!fare) return null;

  const surcharge = (fare.fareBeforeDiscount || fare.finalFare) - fare.baseFare;
  const surchargePercentage = Math.round(((surcharge / fare.baseFare) * 100));
  const hasDistanceDiscount = fare.distanceDiscount > 0;
  const finalSavings = hasDistanceDiscount ? (fare.fareBeforeDiscount || fare.finalFare) - fare.finalFare : 0;

  const getWeatherIcon = () => {
    if (conditions?.weather === 'Storm') return <AlertCircle className="w-5 h-5 text-red-500" />;
    if (conditions?.weather === 'Rainy') return <CloudRain className="w-5 h-5 text-blue-400" />;
    if (conditions?.weather === 'Cloudy') return <Cloud className="w-5 h-5 text-gray-400" />;
    return null;
  };

  const getDistanceDiscountText = () => {
    if (fare.distance >= 50) return "Long Distance Discount (50+ km)";
    if (fare.distance >= 30) return "Medium Distance Discount (30-49 km)";
    if (fare.distance >= 15) return "Distance Discount (15-29 km)";
    return null;
  };

  return (
    <div className="w-full p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border-2 border-[#FE7743] shadow-lg">
      {/* Main Fare Display */}
      <div className="mb-6 pb-6 border-b-2 border-[#FE7743]">
        {/* Distance info */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-[#FE7743]" />
          <p className="text-sm font-semibold text-gray-700">Distance: <span className="text-lg font-bold text-[#FE7743]">{fare.distance} km</span></p>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-1">Base Fare</p>
            <p className="text-xl font-bold text-gray-800">₹{fare.baseFare.toFixed(2)}</p>
          </div>
          {fare.fareBeforeDiscount && hasDistanceDiscount && (
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">Before Discount</p>
              <p className="text-xl font-bold text-gray-800">₹{fare.fareBeforeDiscount.toFixed(2)}</p>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-1">Final Fare</p>
            <p className="text-3xl font-bold text-[#FE7743]">₹{fare.finalFare.toFixed(2)}</p>
          </div>
        </div>

        {/* Surcharge indicator */}
        {surcharge > 0 && (
          <div className="mt-4 p-3 bg-orange-200 rounded-lg">
            <p className="text-sm font-semibold text-orange-900">
              +₹{surcharge.toFixed(2)} surcharge ({surchargePercentage}%)
            </p>
          </div>
        )}

        {/* Distance discount indicator */}
        {hasDistanceDiscount && (
          <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-300">
            <p className="text-sm font-semibold text-green-800">
              ✓ {getDistanceDiscountText()}
            </p>
            <p className="text-xs text-green-700 mt-1">
              You save ₹{finalSavings.toFixed(2)} ({fare.distanceDiscount}%)
            </p>
          </div>
        )}
      </div>

      {/* Multiplier Breakdown */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Price Factors</h3>
        <div className="space-y-3">
          {/* Time */}
          <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Time</p>
                <p className="text-xs text-gray-500">{conditions?.time || 'Off-Peak'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">×{fare.breakdown.timeMultiplier}</p>
              {fare.breakdown.timeMultiplier > 1 && (
                <p className="text-xs text-orange-600">
                  +{Math.round((fare.breakdown.timeMultiplier - 1) * 100)}%
                </p>
              )}
            </div>
          </div>

          {/* Weather */}
          <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition">
            <div className="flex items-center gap-2">
              {getWeatherIcon()}
              <div>
                <p className="text-sm font-semibold text-gray-700">Weather</p>
                <p className="text-xs text-gray-500">{conditions?.weather || 'Clear'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">×{fare.breakdown.weatherMultiplier}</p>
              {fare.breakdown.weatherMultiplier > 1 && (
                <p className="text-xs text-orange-600">
                  +{Math.round((fare.breakdown.weatherMultiplier - 1) * 100)}%
                </p>
              )}
            </div>
          </div>

          {/* Traffic */}
          <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Traffic</p>
                <p className="text-xs text-gray-500">{conditions?.traffic || 'Light'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">×{fare.breakdown.trafficMultiplier}</p>
              {fare.breakdown.trafficMultiplier > 1 && (
                <p className="text-xs text-orange-600">
                  +{Math.round((fare.breakdown.trafficMultiplier - 1) * 100)}%
                </p>
              )}
            </div>
          </div>

          {/* Distance Discount */}
          {hasDistanceDiscount && (
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:shadow-md transition border border-green-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Distance Discount</p>
                  <p className="text-xs text-gray-500">{getDistanceDiscountText()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-700">×{fare.breakdown.distanceDiscountMultiplier}</p>
                <p className="text-xs text-green-600">
                  -{fare.distanceDiscount}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-gray-700 leading-relaxed">
          <span className="font-semibold">Note:</span> Fares may vary based on real-time weather conditions, 
          traffic congestion, and peak demand hours. Actual prices may differ during extreme conditions.
        </p>
      </div>
    </div>
  );
}
