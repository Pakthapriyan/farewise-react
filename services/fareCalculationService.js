/**
 * Fare Calculation Service
 * Handles dynamic pricing based on weather, traffic, and time factors
 */

// Base prices per kilometer (in rupees)
export const BASE_PRICES = {
  bike: 7,
  auto: 10,
  car: 15,
};

// Multiplier factors
export const MULTIPLIERS = {
  weather: {
    clear: 1.0,
    cloudy: 1.1,
    rainy: 1.5,      // Heavy rain surcharge
    storm: 1.8,      // Severe weather surcharge
  },
  traffic: {
    light: 1.0,
    moderate: 1.2,   // Moderate traffic
    heavy: 1.5,      // Heavy traffic/congestion
    severe: 1.8,     // Severe congestion
  },
  time: {
    offPeak: 1.0,        // 10 AM - 4 PM
    peak: 1.3,           // 7 AM - 10 AM, 4 PM - 8 PM
    nightSurge: 1.5,     // 8 PM - 6 AM
  },
};

/**
 * Get current time-based multiplier
 */
export function getTimeMultiplier() {
  const hour = new Date().getHours();

  // Night surge: 8 PM (20) to 6 AM (6)
  if (hour >= 20 || hour < 6) {
    return MULTIPLIERS.time.nightSurge;
  }

  // Peak hours: 7-10 AM and 4-8 PM
  if ((hour >= 7 && hour < 10) || (hour >= 16 && hour < 20)) {
    return MULTIPLIERS.time.peak;
  }

  // Off-peak: 10 AM - 4 PM
  return MULTIPLIERS.time.offPeak;
}

/**
 * Get weather-based multiplier (requires weather API)
 * For now, returns a mock value; in production, integrate with OpenWeatherMap API
 */
export async function getWeatherMultiplier(latitude, longitude) {
  try {
    // Using Open-Meteo free API (no API key required)
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,precipitation&timezone=auto`
    );
    const data = await response.json();
    const weatherCode = data.current?.weather_code;
    const precipitation = data.current?.precipitation || 0;

    // WMO Weather codes: https://www.weatherapi.com/docs/weather_codes.asp
    if (precipitation > 10) {
      return MULTIPLIERS.weather.storm; // Heavy rain or storm
    } else if (precipitation > 2 || [45, 48, 51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
      return MULTIPLIERS.weather.rainy; // Rainy
    } else if ([1, 2].includes(weatherCode)) {
      return MULTIPLIERS.weather.cloudy; // Mainly cloudy
    }
    return MULTIPLIERS.weather.clear;
  } catch (error) {
    console.error("Weather API error:", error);
    return MULTIPLIERS.weather.clear; // Default to clear if API fails
  }
}

/**
 * Get traffic-based multiplier (requires traffic API)
 * For now, returns a mock value; in production, integrate with Google Maps API or TomTom
 */
export async function getTrafficMultiplier() {
  try {
    // Mock traffic data based on time and location
    // In production, use Google Maps Traffic API or TomTom Traffic API
    const hour = new Date().getHours();
    const dayOfWeek = new Date().getDay();

    // Simulate traffic patterns
    // Peak traffic: 7-10 AM (weekdays) and 5-8 PM
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Weekdays
      if ((hour >= 7 && hour < 10) || (hour >= 17 && hour < 20)) {
        return MULTIPLIERS.traffic.heavy;
      }
    }

    // Weekend traffic is generally moderate
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      if (hour >= 10 && hour < 22) {
        return MULTIPLIERS.traffic.moderate;
      }
    }

    return MULTIPLIERS.traffic.light;
  } catch (error) {
    console.error("Traffic API error:", error);
    return MULTIPLIERS.traffic.light; // Default to light if API fails
  }
}

/**
 * Calculate distance using Haversine formula
 */
export function calculateDistance(coord1, coord2) {
  if (!coord1 || !coord2) return 0;

  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLon / 2) ** 2;

  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
}

/**
 * Calculate distance-based discount for long rides
 * Real-world: Longer rides get bulk discount (company saves on operational costs)
 */
function getDistanceDiscountMultiplier(distance) {
  if (distance >= 50) {
    return 0.90; // 10% discount for 50+ km
  } else if (distance >= 30) {
    return 0.93; // 7% discount for 30-49 km
  } else if (distance >= 15) {
    return 0.97; // 3% discount for 15-29 km
  }
  return 1.0; // No discount for short rides
}

/**
 * Calculate final fare with all multipliers
 */
export async function calculateFare(distance, vehicleType, startCoords) {
  if (!distance || distance <= 0 || !vehicleType) {
    return null;
  }

  const basePrice = BASE_PRICES[vehicleType];
  const timeMultiplier = getTimeMultiplier();
  const weatherMultiplier = await getWeatherMultiplier(startCoords.lat, startCoords.lng);
  const trafficMultiplier = await getTrafficMultiplier();
  const distanceDiscountMultiplier = getDistanceDiscountMultiplier(distance);

  const baseFare = distance * basePrice;
  let fareWithDynamicFactors = baseFare * timeMultiplier * weatherMultiplier * trafficMultiplier;
  const finalFare = fareWithDynamicFactors * distanceDiscountMultiplier;

  return {
    baseFare: Math.round(baseFare * 100) / 100,
    fareBeforeDiscount: Math.round(fareWithDynamicFactors * 100) / 100,
    finalFare: Math.round(finalFare * 100) / 100,
    distance: Math.round(distance * 100) / 100,
    distanceDiscount: Math.round((1 - distanceDiscountMultiplier) * 100),
    breakdown: {
      timeMultiplier: Math.round(timeMultiplier * 100) / 100,
      weatherMultiplier: Math.round(weatherMultiplier * 100) / 100,
      trafficMultiplier: Math.round(trafficMultiplier * 100) / 100,
      distanceDiscountMultiplier: Math.round(distanceDiscountMultiplier * 100) / 100,
    },
  };
}

/**
 * Get readable labels for current conditions
 */
export async function getConditionsLabels(startCoords) {
  const hour = new Date().getHours();
  let timeLabel = "Off-Peak";
  if (hour >= 20 || hour < 6) {
    timeLabel = "Night Surge";
  } else if ((hour >= 7 && hour < 10) || (hour >= 16 && hour < 20)) {
    timeLabel = "Peak Hours";
  }

  let weatherLabel = "Clear";
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${startCoords.lat}&longitude=${startCoords.lng}&current=weather_code,precipitation&timezone=auto`
    );
    const data = await response.json();
    const precipitation = data.current?.precipitation || 0;

    if (precipitation > 10) {
      weatherLabel = "Storm";
    } else if (precipitation > 2) {
      weatherLabel = "Rainy";
    } else if ([1, 2].includes(data.current?.weather_code)) {
      weatherLabel = "Cloudy";
    }
  } catch (error) {
    console.error("Error fetching weather labels:", error);
  }

  const dayOfWeek = new Date().getDay();
  let trafficLabel = "Light";
  if (dayOfWeek !== 0 && dayOfWeek !== 6) {
    if ((hour >= 7 && hour < 10) || (hour >= 17 && hour < 20)) {
      trafficLabel = "Heavy";
    } else {
      trafficLabel = "Moderate";
    }
  } else {
    trafficLabel = "Light";
  }

  return {
    time: timeLabel,
    weather: weatherLabel,
    traffic: trafficLabel,
  };
}
