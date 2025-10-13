export default function WhyFareWiseMatters() {
  const cards = [
    {
      title: "Transparent Pricing",
      desc: "Get upfront fare details for every ride so you always know what to expect.",
      img: "/price-transparency.jpg",
    },
    {
      title: "Multi-Vehicle comparison",
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
      className="w-full flex flex-col items-center py-14 bg-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <h2 className="text-2xl md:text-3xl font-medium text-center mb-14">
        Why FareWise Matters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center rounded-[32px] border border-[#FE7743] p-10 transition bg-white"
          >
            {/* TOP IMAGE */}
            <img
              src={card.img}
              alt={card.title}
              className="w-[200px] h-[150px] mb-6"
              style={{ objectFit: "contain" }}
            />
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-center text-gray-900">
              {card.title}
            </h3>
            <p className="text-base text-gray-700 text-center">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
