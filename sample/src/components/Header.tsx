import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, ShoppingCart, User, Heart, MapPin, Phone, ChevronDown,
  Menu, X, Smartphone, Laptop, Headphones, Camera, Tv, Gamepad2,
  Watch, Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";

const categories = [
  { name: "Smartphones", icon: Smartphone, path: "/category/:slug" },
  { name: "Laptops", icon: Laptop, path: "/category/:slug" },
  { name: "Audio", icon: Headphones, path: "/category/:slug" },
  { name: "Cameras", icon: Camera, path: "/category/:slug" },
  { name: "TVs", icon: Tv, path: "/category/:slug" },
  { name: "Gaming", icon: Gamepad2, path: "/category/:slug" },
  { name: "Wearables", icon: Watch, path: "/category/:slug" },
  { name: "Flash Deals", icon: Zap, path: "/category/:slug", highlight: true },
];

interface HeaderProps {
  onCartOpen: () => void;
}

export default function Header({ onCartOpen }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Promo Bar */}
      <div className="bg-[#4c1d95] text-white py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-figtree">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">01-4567890 | 9801234567</span>
              <span className="sm:hidden">01-4567890</span>
            </span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              New Baneshwor, Kathmandu
            </span>
          </div>
          <div className="flex items-center gap-3 text-purple-200">
            <span className="hidden sm:inline">🚚 Free delivery on orders above Rs. 5,000</span>
            <span className="sm:hidden">Free delivery Rs. 5,000+</span>
            <span className="hidden md:inline">|</span>
            <Link to="/track-order" className="hidden md:inline hover:text-white transition-colors">Track Order</Link>
          </div>
        </div>
      </div>

      {/* Search / Action Bar */}
      <div className="bg-white border-b border-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3 md:gap-6">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 bg-[#4c1d95] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#f97316]" />
              </div>
              <span className="font-outfit font-800 text-xl text-[#4c1d95] tracking-tight font-black">ZOLPA</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative flex">
              <Input
                type="text"
                placeholder="Search for phones, laptops, headphones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-l-xl rounded-r-none border-2 border-r-0 border-[#4c1d95]/30 focus:border-[#4c1d95] h-11 text-sm font-figtree"
              />
              <Button
                type="submit"
                className="rounded-l-none rounded-r-xl bg-[#f97316] hover:bg-[#ea6c0a] h-11 px-5 border-0"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Action Icons */}
          <div className="flex items-center gap-2 ml-auto md:ml-0">
            <Link to="/wishlist" className="hidden sm:flex flex-col items-center gap-0.5 p-2 hover:text-[#4c1d95] transition-colors text-gray-500">
              <Heart className="w-5 h-5" />
              <span className="text-xs font-figtree">Wishlist</span>
            </Link>
            <Link to="/account" className="hidden sm:flex flex-col items-center gap-0.5 p-2 hover:text-[#4c1d95] transition-colors text-gray-500">
              <User className="w-5 h-5" />
              <span className="text-xs font-figtree">Account</span>
            </Link>
            <button
              onClick={onCartOpen}
              className="flex flex-col items-center gap-0.5 p-2 hover:text-[#4c1d95] transition-colors text-gray-500 relative"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-[#f97316] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center p-0 border-0 min-w-0">
                    {totalItems > 9 ? "9+" : totalItems}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-figtree">Cart</span>
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-figtree font-medium whitespace-nowrap hover:text-[#4c1d95] hover:bg-purple-50 transition-all border-b-2 border-transparent hover:border-[#4c1d95] ${
                  cat.highlight ? "text-[#f97316] hover:text-[#ea6c0a] hover:border-[#f97316] hover:bg-orange-50" : "text-gray-600"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
                {cat.highlight && <span className="bg-[#f97316] text-white text-xs px-1 py-0.5 rounded font-bold ml-0.5">HOT</span>}
              </Link>
            ))}
            <div className="ml-auto">
              <button className="flex items-center gap-1 px-4 py-3 text-sm text-gray-500 hover:text-[#4c1d95] font-figtree">
                More <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                className={`flex items-center gap-2 p-2.5 rounded-lg text-sm font-figtree font-medium ${
                  cat.highlight ? "text-[#f97316] bg-orange-50" : "text-gray-600 bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="px-4 pb-3 flex gap-3">
            <Link to="/account" className="flex-1 text-center py-2 border border-[#4c1d95] text-[#4c1d95] rounded-lg text-sm font-figtree font-medium">
              Account
            </Link>
            <Link to="/wishlist" className="flex-1 text-center py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-figtree font-medium">
              Wishlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}