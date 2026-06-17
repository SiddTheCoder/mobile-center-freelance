import { Link } from "react-router-dom";
import {
  MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter,
  CreditCard, Truck, Shield, RefreshCw, Zap
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-300 font-figtree">
      {/* Trust Strip */}
      <div className="bg-[#1f2937] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, title: "Free Delivery", sub: "On orders above Rs. 5,000" },
            { icon: Shield, title: "Genuine Products", sub: "100% authentic guarantee" },
            { icon: RefreshCw, title: "Easy Returns", sub: "7-day hassle-free return" },
            { icon: CreditCard, title: "Secure Payment", sub: "eSewa, Khalti, Cards" },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#4c1d95]/30 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-[#f97316]" />
              </div>
              <div>
                <p className="text-white font-outfit font-semibold text-sm">{title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#4c1d95] rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#f97316]" />
              </div>
              <span className="font-outfit font-black text-2xl text-white tracking-tight">ZOLPA</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4 max-w-sm">
              Nepal's most trusted electronics store. From flagship smartphones to premium laptops — all genuine, all delivered fast.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#f97316] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">New Baneshwor, Kathmandu 44600, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#f97316] flex-shrink-0" />
                <span className="text-gray-400">01-4567890 | +977-9801234567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#f97316] flex-shrink-0" />
                <span className="text-gray-400">support@zolpa.com.np</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#4c1d95] flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit font-bold text-white text-base mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Smartphones", path: "/category/:slug" },
                { label: "Laptops", path: "/category/:slug" },
                { label: "Audio", path: "/category/:slug" },
                { label: "Smart TVs", path: "/category/:slug" },
                { label: "Cameras", path: "/category/:slug" },
                { label: "Gaming", path: "/category/:slug" },
                { label: "Wearables", path: "/category/:slug" },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="text-sm text-gray-400 hover:text-[#f97316] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-outfit font-bold text-white text-base mb-4">Support</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Track Order", path: "/track-order" },
                { label: "Return Policy", path: "/returns" },
                { label: "Warranty Info", path: "/warranty" },
                { label: "FAQs", path: "/faqs" },
                { label: "Contact Us", path: "/contact" },
                { label: "Repair Center", path: "/repair" },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="text-sm text-gray-400 hover:text-[#f97316] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-outfit font-bold text-white text-base mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About ZOLPA", path: "/about" },
                { label: "Careers", path: "/careers" },
                { label: "Press", path: "/press" },
                { label: "Privacy Policy", path: "/privacy" },
                { label: "Terms & Conditions", path: "/terms" },
                { label: "Sell on ZOLPA", path: "/sell" },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="text-sm text-gray-400 hover:text-[#f97316] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Payment Methods */}
            <div className="mt-6">
              <h5 className="font-outfit font-semibold text-white text-sm mb-3">We Accept</h5>
              <div className="flex flex-wrap gap-2">
                {["eSewa", "Khalti", "Visa", "MasterCard", "Cash"].map((method) => (
                  <span
                    key={method}
                    className="bg-white/10 text-gray-300 text-xs px-2.5 py-1 rounded-md font-figtree border border-white/10"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500 font-figtree">
            © 2024 ZOLPA Pvt. Ltd. All rights reserved. Registered in Nepal.
          </p>
          <p className="text-xs text-gray-500 font-figtree">
            PAN: 603456789 | Company Reg: 123456/074/075
          </p>
        </div>
      </div>
    </footer>
  );
}