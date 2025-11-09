import { CheckCircle2 } from 'lucide-react';

export default function WhyFareWiseMatters() {
  const cards = [
    {
      title: "Transparent Pricing",
      desc: "Get upfront fare details for every ride so you always know what to expect.",
      img: "/price-transparency.jpg",
    },
    {
      title: "Multi-Vehicle Comparison",
      desc: "Easily compare fares for auto, car, and bike rides — all in one place. Choose what fits your budget and time best.",
      img: "/multivechicles.jpg",
    },
    {
      title: "Time Saving Estimates",
      desc: "Get instant, accurate fare and time estimates. No need to switch apps — plan your trip faster.",
      img: "/time.jpg",
    },
  ];

  return (
    <section
      className="w-full py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why FareWise Matters
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the future of transparent, fair, and intelligent fare calculation
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#FE7743] active:border-[#FE7743] touch-manipulation"
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FE7743]/5 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />

              <div className="relative p-8">
                {/* Image */}
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-40 mb-6 rounded-xl object-cover group-hover:scale-105 active:scale-105 transition-transform duration-300"
                />

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FE7743] active:text-[#FE7743] transition-colors">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{card.desc}</p>

                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-[#FE7743] font-semibold text-sm cursor-pointer group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features List */}
        <div className="bg-gradient-to-r from-[#FE7743]/10 to-transparent rounded-2xl p-8 md:p-12 border border-[#FE7743]/20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">What You Get</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Real-time weather-based pricing",
              "Peak hour surge pricing",
              "Distance-based discounts",
              "Traffic-aware calculations",
              "100% transparent breakdowns",
              "Instant fare estimates",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FE7743] flex-shrink-0" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
