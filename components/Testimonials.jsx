import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Amit Kumar",
      role: "Daily Commuter",
      text: "FareWise made my commute predictable and affordable. The transparent pricing breakdown helps me understand exactly what I'm paying for.",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 5,
    },
    {
      name: "Priya Singh",
      role: "Business Professional",
      text: "Love comparing fares before I start my trip. The real-time weather and traffic adjustments are incredibly accurate. Super useful!",
      img: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 5,
    },
    {
      name: "Rajesh Patel",
      role: "Frequent Traveler",
      text: "The distance-based discounts for longer trips saved me so much money. Best fare calculator app I've used.",
      img: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 5,
    },
    {
      name: "Neha Sharma",
      role: "College Student",
      text: "Finally an app that shows me exactly how the fare is calculated. No hidden charges, just honest pricing.",
      img: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 5,
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white via-orange-50 to-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-8 bg-[#FE7743] rounded-full"></div>
            <span className="text-[#FE7743] font-semibold text-sm uppercase tracking-wider">Customer Love</span>
            <div className="h-1 w-8 bg-[#FE7743] rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Join thousands of satisfied users who trust FareWise for transparent, fair, and real-time fare calculations</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#FE7743]"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-[#FE7743] text-[#FE7743]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-base leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              {/* Divider */}
              <div className="h-0.5 bg-gradient-to-r from-transparent via-[#FE7743] to-transparent mb-6"></div>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#FE7743] group-hover:scale-110 transition-transform"
                />
                <div>
                  <p className="font-bold text-gray-900 text-base">{t.name}</p>
                  <p className="text-[#FE7743] text-sm font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-200">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#FE7743] mb-2">50K+</div>
            <p className="text-gray-600 font-medium">Happy Users</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#FE7743] mb-2">4.9★</div>
            <p className="text-gray-600 font-medium">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#FE7743] mb-2">100%</div>
            <p className="text-gray-600 font-medium">Transparent Pricing</p>
          </div>
        </div>
      </div>
    </section>
  );
}
