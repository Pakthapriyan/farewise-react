export default function Navbar() {
  return (
    <nav
      className="w-full bg-white border-b border-[#f8e9e2] h-auto md:h-[71px] flex items-center justify-between px-4 md:px-10 py-4 md:py-0"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Logo left */}
      <div className="text-lg md:text-xl font-semibold text-gray-900">FareWise</div>
      {/* Navigation links right */}
      <div className="flex gap-4 md:gap-12">
        <a href="/" className="text-sm md:text-base text-gray-800 hover:text-[#FE7743] transition font-normal">Home</a>
        <a href="#about" className="text-sm md:text-base text-gray-800 hover:text-[#FE7743] transition font-normal">About</a>
        <a href="#contact" className="text-sm md:text-base text-gray-800 hover:text-[#FE7743] transition font-normal">Contact</a>
      </div>
    </nav>
  );
}
