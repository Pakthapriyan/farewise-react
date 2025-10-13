import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Herosection";
import FareCalculator from "../components/FareCalculator";
import WhyFareWiseMatters from "../components/WhyFareWiseMatters";
import DownloadBanner from "../components/DownloadBanner";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function HomePage() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);

  const handleStartChange = (e) => setStart(e.target.value);
  const handleEndChange = (e) => setEnd(e.target.value);

  const handleGetFare = () => setShowCalculator(true);
  const handleCalculate = () => {
    // Add calculation/map logic here
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <HeroSection
        start={start}
        end={end}
        onStartChange={handleStartChange}
        onEndChange={handleEndChange}
        onGetFare={handleGetFare}
      />
     <WhyFareWiseMatters />
    <FareCalculator
          start={start}
          end={end}
          onStartChange={handleStartChange}
          onEndChange={handleEndChange}
          onCalculate={handleCalculate}
    />
    <DownloadBanner/>
    <Testimonials/>
    <Footer/>
      
    </div>
  );
}
