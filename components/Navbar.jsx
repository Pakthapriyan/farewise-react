export default function Navbar() {
  return (
    <nav
      className="w-full bg-white border-b border-[#f8e9e2] h-[71px] flex items-center justify-between px-10"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Logo left */}
      <div className="text-xl font-semibold text-gray-900">FareWise</div>
      {/* Navigation links right */}
      <div className="flex gap-12">
        <a href="/" className="text-base text-gray-800 hover:text-[#FE7743] transition font-normal">Home</a>
        <a href="#about" className="text-base text-gray-800 hover:text-[#FE7743] transition font-normal">About</a>
        <a href="#contact" className="text-base text-gray-800 hover:text-[#FE7743] transition font-normal">Contact</a>
      </div>
    </nav>
  );
}
