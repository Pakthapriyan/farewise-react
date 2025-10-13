// Testimonials.jsx
export default function Testimonials() {
  const testimonials = [
    {
      name: "Amit Kumar",
      text: "Fare Wise made my commute predictable and affordable!",
      img: "https://randomuser.me/api/portraits/men/1.jpg", // Replace with real images
    },
    {
      name: "Priya Singh",
      text: "Love comparing fares before I start my trip. Super useful!",
      img: "https://randomuser.me/api/portraits/women/2.jpg", // Replace with real images
    },
  ];

  return (
    <section className="w-full flex flex-col items-center py-12 bg-white">
      <h2 className="text-2xl font-bold mb-8">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
        {testimonials.map((t, i) => (
          <div key={i} className="flex items-center gap-6 bg-gray-100 rounded-xl p-6 shadow-md">
            <img src={t.img} alt={t.name} className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 -ml-10 md:-ml-0" />
            <div>
              <p className="font-semibold mb-2">{t.name}</p>
              <p className="text-gray-700 text-sm">{t.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
