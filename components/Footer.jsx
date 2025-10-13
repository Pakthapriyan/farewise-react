export default function Footer() {
  return (
    <footer className="w-full bg-white py-12 mt-20 flex flex-col items-center font-[Poppins]">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-12">
        {/* FareWise brand/info/contacts (left) */}
        <div>
          <h2 className="text-xl font-semibold mb-3">FareWise</h2>
          <p className="text-gray-700 text-base mb-5 leading-relaxed">
            FareWise helps you compare auto, cab, and bike ride fares instantly,<br/>
            making your travel smarter and your spending transparent.
          </p>
          <div className="flex gap-5 mt-6">
            <a href="#" className="bg-[#FE7743] p-3 rounded-full flex items-center justify-center shadow" aria-label="Instagram">
              <img src="/Instagram.png" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="tel:+1234567890" className="bg-[#FE7743] p-3 rounded-full flex items-center justify-center shadow" aria-label="Phone">
              <img src="/phone.png" alt="Phone" className="w-6 h-6" />
            </a>
            <a href="mailto:hello@farewise.com" className="bg-[#FE7743] p-3 rounded-full flex items-center justify-center shadow" aria-label="Gmail">
              <img src="/GmailLogo.png" alt="Gmail" className="w-6 h-6" />
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-700 text-base">
            <li><a href="#" className="hover:text-[#FE7743]">Home</a></li>
            <li><a href="#" className="hover:text-[#FE7743]">Features</a></li>
            <li><a href="#" className="hover:text-[#FE7743]">Fare Calculator</a></li>
            <li><a href="#" className="hover:text-[#FE7743]">Download App</a></li>
            <li><a href="#" className="hover:text-[#FE7743]">FAQ</a></li>
            <li><a href="#" className="hover:text-[#FE7743]">Contact Us</a></li>
          </ul>
        </div>
        {/* Legal */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Legal</h3>
          <ul className="space-y-2 text-gray-700 text-base">
            <li><a href="#" className="hover:text-[#FE7743]">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#FE7743]">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-[#FE7743]">Cookie Policy</a></li>
          </ul>
        </div>
        {/* Get mobile app */}
        <div className="flex flex-col items-center md:items-end justify-center gap-5">
          <h3 className="font-semibold text-lg mb-3 text-right w-full">Get mobile app</h3>
          <a href="#" className="bg-[#FE7743] hover:bg-orange-500 flex items-center w-[185px] h-[48px] rounded-full pl-5 font-semibold text-base text-[#292929] shadow transition">
            <img src="/playstoreicon.png" alt="Google Play" className="w-7 h-7 mr-2" />
            <span>Google Play</span>
          </a>
          <a href="#" className="bg-[#FE7743] hover:bg-orange-500 flex items-center w-[185px] h-[48px] rounded-full pl-5 font-semibold text-base text-[#292929] shadow transition">
            <img src="/applestore.png" alt="App Store" className="w-7 h-7 mr-2" />
            <span>App Store</span>
          </a>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-7 text-center">Copyright © 2025 FareWise. All rights reserved.</p>
    </footer>
  );
}
