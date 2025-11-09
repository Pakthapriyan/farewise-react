# FareWise

Transparent, intelligent fare calculation for ride-sharing services.

## Overview

FareWise provides instant, accurate fare estimates for auto, car, and bike rides between any two locations. The application features real-time dynamic pricing based on weather conditions, traffic patterns, peak hours, and distance-based discounts.

## Key Features

- Dynamic fare calculation with multiple pricing factors
- Real-time weather integration for accurate pricing
- Peak hour and traffic-aware surcharges
- Distance-based bulk discounts for longer trips
- Interactive map visualization with route planning
- Multi-vehicle fare comparison (Auto, Car, Bike)
- Transparent pricing breakdown
- Responsive mobile and desktop design
- Secure API integration with fallback mechanisms

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, Tailwind CSS |
| Maps | React-Leaflet, Leaflet Routing Machine, OpenStreetMap |
| Weather Data | Open-Meteo API |
| Geocoding | OpenStreetMap Nominatim API |
| Icons | Lucide React |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |

## Installation

Prerequisites:
- Node.js v16 or later
- npm or yarn

Steps:

```bash
# Clone the repository
git clone https://github.com/Pakthapriyan/farewise-react.git

# Navigate to project directory
cd farewise-react

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. Enter your pickup location in the "From" field
2. Enter your destination in the "To" field
3. Select your preferred vehicle type (Bike, Auto, or Car)
4. Click "Get Fare" to view the estimated price
5. Review the detailed price breakdown showing all multipliers
6. View the route on the interactive map

## Dynamic Pricing Model

### Base Prices (per kilometer)

- Bike: 7 rupees
- Auto: 10 rupees
- Car: 15 rupees

### Pricing Multipliers

**Time-Based:**
- Off-Peak (10 AM - 4 PM): 1.0x
- Peak Hours (7-10 AM, 4-8 PM): 1.3x
- Night Surge (8 PM - 6 AM): 1.5x

**Weather-Based:**
- Clear: 1.0x
- Cloudy: 1.1x
- Rainy: 1.5x
- Storm: 1.8x

**Traffic-Based:**
- Light: 1.0x
- Moderate: 1.2x
- Heavy: 1.5x

**Distance-Based Discount:**
- 0-14 km: No discount
- 15-29 km: 3% discount
- 30-49 km: 7% discount
- 50+ km: 10% discount

## Project Structure

```
farewise-react/
  src/
    App.jsx
    HomePage.jsx
    main.jsx
  components/
    FareCalculator.jsx
    FareBreakdown.jsx
    HeroSection.jsx
    Navbar.jsx
    RouteMap.jsx
    Testimonials.jsx
    WhyFareWiseMatters.jsx
    Footer.jsx
    DownloadBanner.jsx
  services/
    fareCalculationService.js
  public/
    favicon.svg
  index.html
  package.json
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## API Integration

The application uses the following APIs:

- **Open-Meteo Weather API**: Free, no authentication required
- **OpenStreetMap Nominatim**: Geocoding service
- **Leaflet**: Open-source mapping library

## Performance

- Build size: ~927 KB (gzipped: ~182 KB)
- Development mode: < 2 seconds startup
- Build time: < 6 seconds
- All calculations: < 200ms

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Error Handling

The application includes robust error handling:

- Graceful API failure fallbacks
- User-friendly error messages
- Loading states during calculation
- Comprehensive input validation

## Contributing

Contributions are welcome. Please ensure:

- Code passes linting (`npm run lint`)
- Production build completes successfully (`npm run build`)
- Code follows existing patterns and conventions

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or feature requests, please visit the GitHub repository or contact the development team.
