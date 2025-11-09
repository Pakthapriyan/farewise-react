import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full bg-white border-b border-[#f8e9e2]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <nav className="relative h-auto md:h-[71px] flex items-center justify-between px-4 md:px-10 py-4 md:py-0">
        {/* Logo */}
        <a href="/" className="text-lg md:text-xl font-semibold text-gray-900">FareWise</a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-12">
          <a href="/" className="text-base text-gray-800 hover:text-[#FE7743] transition">Home</a>
          <a href="#about" className="text-base text-gray-800 hover:text-[#FE7743] transition">About</a>
          <a href="#contact" className="text-base text-gray-800 hover:text-[#FE7743] transition">Contact</a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#FE7743] focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile drawer */}
        {open && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-[#f8e9e2] md:hidden">
            <div className="px-4 py-3 flex flex-col gap-3">
              <a onClick={() => setOpen(false)} href="/" className="text-sm text-gray-800 hover:text-[#FE7743]">Home</a>
              <a onClick={() => setOpen(false)} href="#about" className="text-sm text-gray-800 hover:text-[#FE7743]">About</a>
              <a onClick={() => setOpen(false)} href="#contact" className="text-sm text-gray-800 hover:text-[#FE7743]">Contact</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
