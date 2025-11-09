# Quick Start Guide - Dynamic Fare Calculation

## Run the Application

```bash
npm run dev
```

Then navigate to the **Fare Calculator** section on the website.

## How to Test

### 1. **See Weather Impact** 🌧️
Try entering a location during rainy weather:
- The system fetches real-time weather for that location
- Rainy conditions = 1.5x multiplier (+50%)
- Storm conditions = 1.8x multiplier (+80%)

### 2. **See Peak Hour Impact** ⏰
Try calculating fares at different times:
- **7-10 AM**: Morning rush = 1.3x multiplier
- **4-8 PM**: Evening rush = 1.3x multiplier
- **8 PM-6 AM**: Night = 1.5x multiplier
- **10 AM-4 PM**: Off-peak = 1.0x (normal price)

### 3. **See Traffic Impact** 🚗
The system automatically adjusts based on time:
- **Weekday mornings/evenings**: Heavy traffic = 1.5x multiplier
- **Weekday afternoons**: Moderate traffic = 1.2x multiplier
- **Weekends**: Light traffic = 1.0x multiplier
- **Late night**: Light traffic = 1.0x multiplier

## Example Fares

### Scenario 1: Off-Peak, Clear Weather, Light Traffic
```
Distance: 5 km
Vehicle: Auto (₹10/km base)
Time: 2 PM (off-peak = 1.0x)
Weather: Clear (1.0x)
Traffic: Light (1.0x)

Fare = 5 × 10 × 1.0 × 1.0 × 1.0 = ₹50
```

### Scenario 2: Peak Rain Rush
```
Distance: 10 km
Vehicle: Car (₹15/km base)
Time: 8 AM (peak = 1.3x)
Weather: Rainy (1.5x)
Traffic: Heavy (1.5x)

Fare = 10 × 15 × 1.3 × 1.5 × 1.5 = ₹438.75
```

### Scenario 3: Night Emergency
```
Distance: 8 km
Vehicle: Bike (₹7/km base)
Time: 11 PM (night = 1.5x)
Weather: Clear (1.0x)
Traffic: Light (1.0x)

Fare = 8 × 7 × 1.5 × 1.0 × 1.0 = ₹84
```

## Customize Multipliers

Edit `services/fareCalculationService.js`:

```javascript
export const MULTIPLIERS = {
  weather: {
    clear: 1.0,      // Change this
    cloudy: 1.1,     // Change this
    rainy: 1.5,      // Change this
    storm: 1.8,      // Change this
  },
  traffic: {
    light: 1.0,      // Change this
    moderate: 1.2,   // Change this
    heavy: 1.5,      // Change this
    severe: 1.8,     // Change this
  },
  time: {
    offPeak: 1.0,    // Change this
    peak: 1.3,       // Change this
    nightSurge: 1.5, // Change this
  },
};
```

## Change Base Prices

In `services/fareCalculationService.js`:

```javascript
export const BASE_PRICES = {
  bike: 7,    // Price per km - change here
  auto: 10,   // Price per km - change here
  car: 15,    // Price per km - change here
};
```

## Change Time Periods

In `services/fareCalculationService.js`, edit the `getTimeMultiplier()` function:

```javascript
export function getTimeMultiplier() {
  const hour = new Date().getHours();

  // Night surge: 8 PM (20) to 6 AM (6) - CHANGE THESE HOURS
  if (hour >= 20 || hour < 6) {
    return MULTIPLIERS.time.nightSurge;
  }

  // Peak hours: 7-10 AM and 4-8 PM - CHANGE THESE HOURS
  if ((hour >= 7 && hour < 10) || (hour >= 16 && hour < 20)) {
    return MULTIPLIERS.time.peak;
  }

  // Off-peak: 10 AM - 4 PM - CHANGE THESE HOURS
  return MULTIPLIERS.time.offPeak;
}
```

## Rebuild After Changes

```bash
npm run build
```

Then test with:
```bash
npm run dev
```

## API Keys (Not Needed!)

✅ **Weather (Open-Meteo)**: Free - no API key
✅ **Maps (Leaflet)**: Free - no API key
✅ **Geocoding (Nominatim)**: Free - no API key

## Troubleshooting

### "Could not find one or both locations"
- Try entering city names with country (e.g., "Mumbai, India")
- Try street addresses instead of landmarks
- Check your internet connection

### Weather always shows "Clear"
- This is normal if you're in a remote area
- The API might not have data for that location
- System defaults to clear safely

### Fare calculation seems wrong
- Check the multipliers display in the breakdown
- Make sure you're looking at the correct time period
- Check if weather data has loaded

### Map not showing
- Zoom in on the map container
- Try refreshing the page
- Check if Leaflet API is accessible

## Files to Know

| File | Purpose |
|------|---------|
| `services/fareCalculationService.js` | Core calculation logic |
| `components/FareCalculator.jsx` | Main input component |
| `components/FareBreakdown.jsx` | Result display component |
| `FARE_CALCULATION.md` | Detailed documentation |
| `IMPLEMENTATION_SUMMARY.md` | What was built |

## What's Happening Behind the Scenes

1. **You enter locations**
   ↓
2. **Addresses are geocoded** (converted to coordinates)
   ↓
3. **Distance is calculated** (Haversine formula)
   ↓
4. **Weather API is called** (for real conditions)
   ↓
5. **Time multiplier is calculated** (current time)
   ↓
6. **Traffic multiplier is calculated** (day/time patterns)
   ↓
7. **Final fare is computed** (all factors combined)
   ↓
8. **Pretty breakdown is displayed** (with icons and colors)

## Performance Tips

- Calculations are fast (usually < 2 seconds)
- Weather data is cached for the same location
- No unnecessary API calls
- Map rendering is optimized

## Next Steps

1. Test with different locations and times
2. Customize multipliers for your market
3. Consider adding real traffic API (Google Maps)
4. Add user authentication
5. Integrate with payment system

---

**Need help?** Check `FARE_CALCULATION.md` for detailed documentation.
