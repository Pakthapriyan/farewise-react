# Distance-Based Discount Feature

## Overview

The FareWise application now includes **realistic distance-based discounts** for longer rides, reflecting real-world ride-sharing pricing models where bulk/long-distance trips have reduced per-kilometer costs.

## Why This Feature?

In real-world ride-sharing services (Uber, Ola, Lyft):
- Long-distance rides have **lower per-kilometer costs** than short trips
- This is because drivers save on empty-trip costs and operational overhead
- Encourages customers to book longer rides instead of short hops
- Reflects actual business economics of the transport industry

## Discount Tiers

### Distance-Based Pricing

| Distance | Discount | Multiplier | Real-World Example |
|----------|----------|------------|-------------------|
| 0-14 km | None | 1.0x | Short urban trips |
| 15-29 km | 3% | 0.97x | Medium city trips |
| 30-49 km | 7% | 0.93x | Intercity short trips |
| 50+ km | 10% | 0.90x | Long-distance travel |

**Formula for applying discount:**
```
Final Fare = (Base Fare × Time × Weather × Traffic) × Distance Discount
```

## Examples

### Example 1: Short Trip (No Discount)
```
Distance: 8 km
Vehicle: Auto (₹10/km base)
Time: 2 PM (off-peak, 1.0x)
Weather: Clear (1.0x)
Traffic: Light (1.0x)
Distance: < 15 km (No discount, 1.0x)

Calculation:
= (8 × 10) × 1.0 × 1.0 × 1.0 × 1.0
= ₹80 (No savings)
```

### Example 2: Medium Distance Trip (3% Discount)
```
Distance: 20 km
Vehicle: Car (₹15/km base)
Time: 3 PM (off-peak, 1.0x)
Weather: Clear (1.0x)
Traffic: Light (1.0x)
Distance: 15-29 km (3% discount, 0.97x)

Calculation:
= (20 × 15) × 1.0 × 1.0 × 1.0 × 0.97
= 300 × 0.97
= ₹291 (Save ₹9)
```

### Example 3: Long Distance Trip (10% Discount)
```
Distance: 60 km
Vehicle: Car (₹15/km base)
Time: 4 PM (peak, 1.3x)
Weather: Clear (1.0x)
Traffic: Light (1.0x)
Distance: 50+ km (10% discount, 0.90x)

Calculation:
= (60 × 15) × 1.3 × 1.0 × 1.0 × 0.90
= 900 × 1.3 × 0.90
= 900 × 1.17
= ₹1,053 (Save ₹117 compared to full price)
```

### Example 4: Long Rainy Rush Hour (Combined Multipliers)
```
Distance: 50 km
Vehicle: Auto (₹10/km base)
Time: 8 AM (peak, 1.3x)
Weather: Rainy (1.5x)
Traffic: Heavy (1.5x)
Distance: 50+ km (10% discount, 0.90x)

Calculation:
Before Discount:
= (50 × 10) × 1.3 × 1.5 × 1.5
= 500 × 2.925
= ₹1,462.50

After Discount:
= ₹1,462.50 × 0.90
= ₹1,316.25 (Save ₹146.25 = 10%)
```

## UI Display

The FareBreakdown component shows:

1. **Distance Section**
   ```
   📍 Distance: 50 km
   ```

2. **Fare Comparison**
   ```
   Base Fare: ₹500
   Before Discount: ₹1,462.50 (if applicable)
   Final Fare: ₹1,316.25
   ```

3. **Discount Badge** (Green highlight)
   ```
   ✓ Long Distance Discount (50+ km)
   You save ₹146.25 (10%)
   ```

4. **Price Factors** (with Distance Discount listed)
   ```
   ⚡ Time: Peak Hours     ×1.3 (+30%)
   🌧️ Weather: Rainy     ×1.5 (+50%)
   ⚡ Traffic: Heavy      ×1.5 (+50%)
   📍 Distance Discount   ×0.90 (-10%)
   ```

## How It's Implemented

### Core Logic (`fareCalculationService.js`)

```javascript
function getDistanceDiscountMultiplier(distance) {
  if (distance >= 50) {
    return 0.90;    // 10% discount
  } else if (distance >= 30) {
    return 0.93;    // 7% discount
  } else if (distance >= 15) {
    return 0.97;    // 3% discount
  }
  return 1.0;       // No discount
}
```

### Applied in Main Calculation

```javascript
const distanceDiscountMultiplier = getDistanceDiscountMultiplier(distance);
const finalFare = fareWithDynamicFactors * distanceDiscountMultiplier;
```

### Returned Data Structure

```javascript
{
  baseFare: 500,
  fareBeforeDiscount: 1462.50,    // With time/weather/traffic
  finalFare: 1316.25,              // After distance discount
  distance: 50,
  distanceDiscount: 10,            // Discount percentage
  breakdown: {
    timeMultiplier: 1.3,
    weatherMultiplier: 1.5,
    trafficMultiplier: 1.5,
    distanceDiscountMultiplier: 0.9  // New field
  }
}
```

## Customization

### Change Discount Tiers

Edit `services/fareCalculationService.js`:

```javascript
function getDistanceDiscountMultiplier(distance) {
  if (distance >= 100) return 0.85;   // Change these
  if (distance >= 50) return 0.90;    // thresholds and
  if (distance >= 30) return 0.93;    // discount amounts
  if (distance >= 15) return 0.97;
  return 1.0;
}
```

### Add More Discount Tiers

```javascript
function getDistanceDiscountMultiplier(distance) {
  if (distance >= 100) return 0.85;   // 15% discount
  if (distance >= 75) return 0.88;    // 12% discount (NEW)
  if (distance >= 50) return 0.90;    // 10% discount
  if (distance >= 30) return 0.93;    // 7% discount
  if (distance >= 15) return 0.97;    // 3% discount
  return 1.0;
}
```

### Remove Discount Entirely

```javascript
function getDistanceDiscountMultiplier(distance) {
  return 1.0;  // Always return 1.0 = no discount
}
```

## Business Benefits

✅ **Encourages Longer Trips**
- Customers see savings on long journeys
- Increases ride values and driver earnings

✅ **Reflects Real Economics**
- Matches actual cost structures
- Users understand transparent pricing

✅ **Competitive Advantage**
- Similar to Uber/Ola pricing
- Feels fair and justified

✅ **Conversion Improvement**
- Users feel they're getting a deal
- Increases booking confidence

## Real-World Scenarios

### Scenario 1: Airport Transfer
```
16 km to airport = 3% discount (just over 15 km threshold)
User sees: "Discount applied for medium distance"
Encourages booking full trip instead of parts
```

### Scenario 2: Highway Trip
```
65 km intercity = 10% discount
User sees: "Long distance trip - Save ₹150+"
Feels incentivized to book direct ride
```

### Scenario 3: Campus to City
```
12 km = No discount (under 15 km)
User sees: Standard pricing
Short trip doesn't qualify for discount
```

## Layout Changes

### Before (Old Layout)
```
┌─────────────┐  ┌──────────────┐
│             │  │              │
│   Form      │  │   Map        │
│             │  │              │
└─────────────┘  │              │
                 │ Breakdown    │
                 └──────────────┘
```

### After (New Full-Width Layout)
```
┌──────────────────────────────────┐
│                                  │
│   Form      │        Map         │
│             │                    │
└──────────────────────────────────┘
┌──────────────────────────────────┐
│   FULL WIDTH: Fare Breakdown     │
│   - Distance info                │
│   - Base/Before/Final fares      │
│   - Distance discount badge      │
│   - All price factors            │
└──────────────────────────────────┘
```

## Feature Interaction

The distance discount **stacks with** (multiplies with) other factors:

```
Final = Base × Time × Weather × Traffic × DistanceDiscount

Example:
= ₹500 × 1.3 × 1.5 × 1.5 × 0.90
= ₹500 × 2.925 × 0.90
= ₹1,316.25
```

All factors are applied in sequence, giving the most accurate real-world pricing.

## Future Enhancements

1. **Vehicle-Specific Discounts**
   - Premium cars might have different discount tiers
   - Bikes could have different structures

2. **Time-Based Discounts**
   - Off-peak discounts on long rides
   - Early booking discounts

3. **Route-Based Discounts**
   - Highway trips get better discounts
   - City traffic considered separately

4. **Loyalty Multipliers**
   - Long-term customers get extra discounts
   - Referral bonuses applied

5. **Dynamic Discounts**
   - Based on driver availability
   - Demand-driven pricing adjustments

## Testing

Test different distances to see discount tiers:

| Try This Distance | Expected Discount |
|------------------|------------------|
| 5 km | None (1.0x) |
| 10 km | None (1.0x) |
| 15 km | 3% (0.97x) |
| 20 km | 3% (0.97x) |
| 30 km | 7% (0.93x) |
| 40 km | 7% (0.93x) |
| 50 km | 10% (0.90x) |
| 75 km | 10% (0.90x) |

## Summary

The distance-based discount feature:
- ✅ Makes pricing feel fairer
- ✅ Reflects real business economics
- ✅ Encourages longer bookings
- ✅ Competitive with industry standards
- ✅ Easy to customize for your market
- ✅ Transparent and understandable to users
