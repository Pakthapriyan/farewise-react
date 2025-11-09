import AutocompleteInput from './AutocompleteInput';
import Button1 from './Button1';

export default function HeroSection({
  start,
  end,
  onStartChange,
  onEndChange,
  onGetFare,
}) {
  return (
    <section
      className="relative flex items-center justify-center w-full min-h-[450px] md:min-h-[600px] bg-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="relative w-full flex items-center justify-center min-h-[400px] md:min-h-[500px]">
        {/* Image as background layer */}
        <img
          src="/hero.png"
          alt="Hero map illustration"
          className="w-[95vw] md:w-[90vw] max-w-[1200px] min-h-[400px] md:min-h-[500px] object-contain"
          style={{ display: 'block' }}
        />
        {/* Headline overlay - top of image */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full pt-4 md:pt-10 px-4 flex justify-center pointer-events-none">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-gray-900 text-center leading-snug md:leading-tight"
              style={{fontFamily: "'Poppins', sans-serif"}}>
            Get instant fare estimates for <span className="text-[#FE7743]">Auto, Car & Bike</span><br />
            rides <span className="whitespace-nowrap">anytime, anywhere.</span>
          </h1>
        </div>
        {/* Form overlay - bottom of image */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center pb-3 md:pb-8 px-4 pointer-events-auto">
          <div className="w-full max-w-3xl flex flex-col md:flex-row gap-3 md:gap-6 bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl px-3 md:px-8 py-4 md:py-8 items-center">
            <AutocompleteInput
              placeholder="Enter start location"
              value={start}
              onChange={onStartChange}
              className="w-full md:w-auto rounded-full bg-gray-50 text-sm md:text-base shadow-none border border-gray-200 focus:border-[#FE7743]"
            />
            <AutocompleteInput
              placeholder="Enter destination"
              value={end}
              onChange={onEndChange}
              className="w-full md:w-auto rounded-full bg-gray-50 text-sm md:text-base shadow-none border border-gray-200 focus:border-[#FE7743]"
            />
            <Button1
              onClick={onGetFare}
              className="w-full md:w-auto rounded-full font-bold px-6 md:px-8 py-2 md:py-2 text-sm md:text-base bg-[#FE7743] hover:bg-orange-500 min-w-[100px] md:min-w-[120px]"
            >
              Get Fare
            </Button1>
          </div>
        </div>
      </div>
    </section>
  );
}
