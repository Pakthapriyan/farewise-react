# FareWise Dynamic Fare Calculation System

## Overview

The FareWise application now includes a sophisticated dynamic fare calculation system that adjusts prices based on real-world scenarios including weather conditions, traffic congestion, and peak demand hours.

## How It Works

### Base Pricing

Base prices per kilometer (in INR):
- **Bike**: ₹7/km
- **Auto**: ₹10/km
- **Car**: ₹15/km

### Dynamic Multipliers

The final fare is calculated by multiplying the base fare by three independent factors:

#### 1. **Time-Based Multiplier**
Varies based on the time of day:

| Time Period | Hours | Multiplier | Surcharge |
|-------------|-------|------------|-----------|
| Off-Peak | 10 AM - 4 PM | 1.0x | 0% |
| Peak Hours | 7-10 AM, 4-8 PM | 1.3x | +30% |
| Night Surge | 8 PM - 6 AM | 1.5x | +50% |

**Why?** Peak hours (morning/evening commute) see more demand and congestion, while night rides are riskier for drivers.

#### 2. **Weather-Based Multiplier**
Adjusts based on current weather conditions (using Open-Meteo API):

| Condition | Multiplier | Surcharge |
|-----------|------------|-----------|
| Clear | 1.0x | 0% |
| Cloudy | 1.1x | +10% |
| Rainy | 1.5x | +50% |
| Storm | 1.8x | +80% |

**Why?** Rainy weather makes driving hazardous, reduces visibility, and increases accident risk.

#### 3. **Traffic-Based Multiplier**
Simulates real-time traffic patterns:

| Condition | Multiplier | Surcharge |
|-----------|------------|-----------|
| Light Traffic | 1.0x | 0% |
| Moderate Traffic | 1.2x | +20% |
| Heavy Traffic | 1.5x | +50% |
| Severe Congestion | 1.8x | +80% |

**Why?** Heavy traffic increases trip duration and vehicle operating costs.

### Calculation Formula

```
Final Fare = (Distance × Base Price) × Time Multiplier × Weather Multiplier × Traffic Multiplier
```

**Example:**
- Distance: 10 km
- Vehicle: Auto (₹10/km)
- Time: 8 PM (Peak surge: 1.3x)
- Weather: Rainy (1.5x)
- Traffic: Heavy (1.5x)

```
Final Fare = (10 × 10) × 1.3 × 1.5 × 1.5
           = 100 × 1.3 × 1.5 × 1.5
           = 100 × 2.925
           = ₹292.50
```

## File Structure

### Service Layer (`services/fareCalculationService.js`)
Core calculation logic including:
- `calculateDistance(coord1, coord2)` - Haversine formula for distance
- `getTimeMultiplier()` - Current time-based pricing
- `getWeatherMultiplier(lat, lng)` - Real-time weather data via Open-Meteo API
- `getTrafficMultiplier(startCoords, endCoords)` - Traffic pattern simulation
- `calculateFare(distance, vehicleType, startCoords, endCoords)` - Main calculation function
- `getConditionsLabels(startCoords, endCoords)` - Readable labels for UI display

### Components

#### `FareCalculator.jsx`
Main component that:
- Takes start and end locations as input
- Geocodes addresses using OpenStreetMap Nominatim API
- Calls the calculation service
- Displays results and error states
- Integrates with the map and breakdown components

#### `FareBreakdown.jsx`
Display component showing:
- Distance traveled (km)
- Base fare amount
- **Final fare (with surcharges)**
- Individual multiplier breakdowns with percentages
- Visual indicators with icons for weather and traffic conditions
- Disclaimer about real-time conditions

## Data Sources

### Weather Data
- **API**: Open-Meteo (https://open-meteo.com/)
- **Cost**: Free, no API key required
- **Data Points**: Weather code, precipitation, timezone
- **WMO Weather Codes**: Standard meteorological codes

### Traffic Data
- **Current**: Simulated based on time and day patterns
- **Future Enhancement**: Can integrate with:
  - Google Maps Traffic API
  - TomTom Traffic API
  - OpenWeatherMap Real-time Traffic

### Geocoding
- **API**: OpenStreetMap Nominatim (https://nominatim.org/)
- **Cost**: Free, limited to 1 request/second
- **Data**: Location coordinates (latitude/longitude)

## Features

✅ **Real-time Weather Integration**: Automatically adjusts prices for rain/storms
✅ **Smart Traffic Pricing**: Higher prices during peak traffic hours
✅ **Peak Hour Surcharges**: Additional charges during busy times
✅ **Transparent Breakdown**: Users see exactly how the price is calculated
✅ **Visual Indicators**: Icons and colors show current conditions
✅ **Error Handling**: Graceful fallbacks if APIs are unavailable
✅ **Distance Calculation**: Accurate distance using Haversine formula
✅ **Loading States**: Shows "Calculating..." feedback

## Integration with UI

The fare calculation is displayed via `FareBreakdown` component showing:

```
Distance: 10 km

Base Fare: ₹100
Final Fare: ₹292.50

+₹192.50 surcharge (93%)

Price Factors:
⚡ Time: Peak Hours  →  ×1.3 (+30%)
🌧️ Weather: Rainy    →  ×1.5 (+50%)
⚡ Traffic: Heavy    →  ×1.5 (+50%)
```

## Future Enhancements

1. **Real-time Traffic API Integration**
   - Use Google Maps Distance Matrix API
   - Get actual traffic flow data

2. **Surge Pricing Algorithm**
   - Dynamic multiplier based on demand/supply ratio
   - Ride requests vs. available drivers

3. **User-Specific Discounts**
   - Loyalty program adjustments
   - Off-peak booking discounts

4. **Historical Data Analysis**
   - Machine learning to predict traffic
   - Seasonal pricing adjustments

5. **Payment Methods Integration**
   - Wallet balance checks
   - Promo code application

6. **Route Optimization**
   - Multiple route comparison
   - Toll road consideration

## Testing

### Manual Testing Scenarios

1. **Off-Peak Normal Weather**
   - Time: 2 PM, Clear sky
   - Distance: 5 km, Auto
   - Expected: 5 × 10 × 1.0 × 1.0 × 1.0 = ₹50

2. **Peak Hours with Rain**
   - Time: 8 AM, Rainy
   - Distance: 10 km, Car
   - Expected: 10 × 15 × 1.3 × 1.5 × 1.2 = ₹351

3. **Night Surge with Heavy Traffic**
   - Time: 11 PM, Clear
   - Distance: 8 km, Bike
   - Expected: 8 × 7 × 1.5 × 1.0 × 1.5 = ₹126

## API Rate Limits

- **Nominatim (Geocoding)**: 1 request/second
- **Open-Meteo (Weather)**: 100 requests/minute (free tier)
- **Leaflet Routing**: Limited based on service

## Error Handling

- If weather API fails → Defaults to clear weather (1.0x)
- If geocoding fails → Shows user-friendly error message
- If distance calculation fails → Suggests using different locations
- Network timeout → Retry mechanism with user feedback

## Performance Considerations

- Weather data is fetched once per calculation
- Distance calculation uses efficient Haversine formula
- Traffic simulation is computed locally (no API needed)
- UI updates are optimized with React state management
- Map rendering is separate from fare calculation

## Security Notes

- No sensitive user data is stored
- All API calls are made from the client
- Coordinates are not logged permanently
- Weather data is public information

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Dependencies

- **lucide-react**: Icon library for UI
- **react-leaflet**: Map component integration
- **framer-motion**: Animation support (already in project)
- **tailwindcss**: Styling framework (already in project)
