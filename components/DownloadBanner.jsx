// DownloadBanner.jsx
export default function DownloadBanner() {
  return (
    <section className="w-full flex justify-center py-8 md:py-10 bg-white">
      <div
        className="w-full max-w-4xl h-56 sm:h-60 md:h-64 flex items-center md:items-center justify-center md:justify-end rounded-2xl px-6 md:px-12"
        style={{
          backgroundImage: "url('/bannerbg.jpg')",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <p className="text-white text-lg md:text-2xl font-bold mb-4 md:mb-6 leading-snug">
            Download the Fare Wise app & <br className="hidden sm:block" /> plan your trip instantly!
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4">
            <a
              href="#"
              className="bg-[#FE7743] flex items-center rounded-full px-4 py-2 text-white font-semibold text-sm md:text-base shadow hover:bg-orange-500 transition"
            >
              <img src="/playstoreicon.png" alt="Google Play" className="w-5 h-5 mr-2" />
              Google Play
            </a>
            <a
              href="#"
              className="bg-[#FE7743] flex items-center rounded-full px-4 py-2 text-white font-semibold text-sm md:text-base shadow hover:bg-orange-500 transition"
            >
              <img src="/applestore.png" alt="App Store" className="w-5 h-5 mr-2" />
              App Store
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
