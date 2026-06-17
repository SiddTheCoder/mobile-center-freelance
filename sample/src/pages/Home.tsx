import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Zap, Star, ArrowRight, Timer, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { featuredProducts, flashSaleProducts } from "@/data/products";

const heroSlides = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    subtitle: "Titanium. A17 Pro. Action Button.",
    description: "The most powerful iPhone ever built, now in Nepal.",
    price: "Rs. 1,79,999",
    badge: "New Launch",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_42ed038dbf_5312b56ca0756bec.png",
    cta: "/product/iphone-15-pro",
    bg: "from-[#4c1d95] to-[#7c3aed]",
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra",
    subtitle: "Galaxy AI. S Pen. 200MP.",
    description: "The ultimate Android flagship experience.",
    price: "Rs. 1,89,999",
    badge: "AI-Powered",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_24b8334659_4b0e170beb7a7f21.png",
    cta: "/product/samsung-s24-ultra",
    bg: "from-[#1e3a5f] to-[#2563eb]",
  },
  {
    id: 3,
    title: "MacBook Air M3",
    subtitle: "Remarkably thin. Seriously fast.",
    description: "The world's best consumer laptop, shipped to your door.",
    price: "Rs. 1,89,999",
    badge: "Best Seller",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_eedd1c3a7a_bbcfc0bf587cf19a.png",
    cta: "/product/macbook-air-m3",
    bg: "from-[#1c1c1e] to-[#3a3a3c]",
  },
];

const brands = [
  { name: "Apple", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_6162320043_7980eb03ef7fe6b0.png"},
  { name: "Samsung", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_3b3ea69693_dcc1c7e035bd694f.png"},
  { name: "Sony", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_261628f51b_c81c7a0967fe9dea.png"},
  { name: "Dell", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_02ac9eb80c_fd8ffad814b6707e.png"},
  { name: "JBL", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_51be60b676_a8a3ef079bcd5619.png"},
  { name: "Logitech", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_831577449e_6ac0756b45b93f74.png"},
  { name: "ASUS", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_46d1c684b4_87ab3e0d0341f134.png"},
  { name: "OnePlus", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_e5f50a7e8e_d98291d083a83999.png"},
];

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const update = () => {
      const diff = endTime.getTime() - Date.now();
      if (diff <= 0) return;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="flex items-center gap-1.5">
      {[timeLeft.h, timeLeft.m, timeLeft.s].map((val, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="bg-[#4c1d95] text-white font-outfit font-bold text-sm px-2 py-1 rounded-md min-w-[32px] text-center">
            {String(val).padStart(2, "0")}
          </div>
          {i < 2 && <span className="text-[#4c1d95] font-bold text-base">:</span>}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const flashScrollRef = useRef<HTMLDivElement>(null);
  const flashEndTime = new Date(Date.now() + 5 * 3600000 + 23 * 60000 + 45000);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const scrollFlash = (dir: "left" | "right") => {
    if (flashScrollRef.current) {
      flashScrollRef.current.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Marquee */}
      <section className="relative overflow-hidden">
        <div
          className={`relative bg-gradient-to-r ${heroSlides[currentSlide].bg} min-h-[340px] sm:min-h-[420px] md:min-h-[500px] flex items-center transition-all duration-700`}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-10 md:py-16">
              {/* Text */}
              <div className="text-white order-2 md:order-1">
                <Badge className="bg-[#f97316] text-white border-0 mb-3 text-xs font-figtree">
                  {heroSlides[currentSlide].badge}
                </Badge>
                <h1 className="font-outfit font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-3">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="font-outfit font-semibold text-lg md:text-xl text-white/80 mb-2">
                  {heroSlides[currentSlide].subtitle}
                </p>
                <p className="font-figtree text-white/70 text-sm md:text-base mb-5">
                  {heroSlides[currentSlide].description}
                </p>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-outfit font-black text-2xl md:text-3xl text-[#f97316]">
                    {heroSlides[currentSlide].price}
                  </span>
                </div>
                <div className="flex gap-3">
                  <Link to={heroSlides[currentSlide].cta}>
                    <Button className="bg-[#f97316] hover:bg-[#ea6c0a] text-white rounded-xl font-outfit font-bold px-6 py-2.5 h-auto text-sm md:text-base">
                      Buy Now
                    </Button>
                  </Link>
                  <Link to="/category/:slug">
                    <Button variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 rounded-xl font-figtree px-5 h-auto py-2.5 text-sm">
                      Explore All
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="relative order-1 md:order-2 flex justify-center">
                <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden opacity-95">
                  <img
                    src={heroSlides[currentSlide].img_url}
                    alt={heroSlides[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Slide Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`rounded-full transition-all ${
                  i === currentSlide ? "w-6 h-2 bg-[#f97316]" : "w-2 h-2 bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Arrow Controls */}
          <button
            onClick={() => setCurrentSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((s) => (s + 1) % heroSlides.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:py-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#f97316] fill-[#f97316]" />
              <h2 className="font-outfit font-black text-xl md:text-2xl text-gray-900">Flash Sale</h2>
            </div>
            <div className="flex items-center gap-1.5">
              <Timer className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500 font-figtree">Ends in:</span>
              <CountdownTimer endTime={flashEndTime} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => scrollFlash("left")} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scrollFlash("right")} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={flashScrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
        >
          {flashSaleProducts.map((product) => (
            <div key={product.id} className="w-52 flex-shrink-0 snap-start">
              <ProductCard product={product} compact />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#4c1d95]" />
            <h2 className="font-outfit font-black text-xl md:text-2xl text-gray-900">Top Picks</h2>
          </div>
          <Link to="/category/:slug" className="flex items-center gap-1 text-sm text-[#4c1d95] font-figtree font-medium hover:text-[#f97316] transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Shop by Brand */}
      <section className="bg-[#F9FAFB] py-10 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-outfit font-black text-xl md:text-2xl text-gray-900">Shop by Brand</h2>
            <Link to="/brands" className="text-sm text-[#4c1d95] font-figtree font-medium flex items-center gap-1 hover:text-[#f97316]">
              All Brands <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={`/brand/${brand.name.toLowerCase()}`}
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-full aspect-square rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden hover:border-[#4c1d95] hover:shadow-md transition-all p-2">
                  <img
                    src={brand.img_url}
                    alt={brand.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs font-figtree font-semibold text-gray-600 group-hover:text-[#4c1d95]">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="font-outfit font-black text-xl md:text-2xl text-gray-900 mb-6">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: "Smartphones", count: "120+ Products", color: "bg-purple-50 border-purple-100", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_752aa93e4a_958ba13686c6d1a9.png"},
            { name: "Laptops", count: "80+ Products", color: "bg-blue-50 border-blue-100", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_408f420852_70cb10d2e94bd351.png"},
            { name: "Audio", count: "60+ Products", color: "bg-orange-50 border-orange-100", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_b43c84dc39_dcd9928f1e0e36a6.png"},
            { name: "Smart TVs", count: "45+ Products", color: "bg-green-50 border-green-100", img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_500c85ec9a_df8c697c7085429d.png"},
          ].map((cat) => (
            <Link
              key={cat.name}
              to={`/category/${cat.name.toLowerCase().replace(" ", "-")}`}
              className={`rounded-xl border p-4 ${cat.color} hover:shadow-md transition-all group overflow-hidden relative`}
            >
              <div className="aspect-video rounded-lg overflow-hidden mb-3">
                <img
                  src={cat.img_url}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-outfit font-bold text-gray-800 text-base">{cat.name}</h3>
              <p className="text-xs text-gray-500 font-figtree mt-0.5">{cat.count}</p>
              <div className="flex items-center gap-1 text-xs font-figtree text-[#4c1d95] mt-2 group-hover:gap-2 transition-all">
                Shop now <ChevronRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Banner Strip */}
      <section className="bg-[#4c1d95] py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="font-outfit font-black text-white text-2xl md:text-3xl">
              Get <span className="text-[#f97316]">10% OFF</span> your first order
            </h2>
            <p className="text-purple-200 font-figtree text-sm mt-1">
              Use code <strong className="text-white">ZOLPA10</strong> at checkout. Valid for new customers.
            </p>
          </div>
          <Link to="/category/:slug">
            <Button className="bg-[#f97316] hover:bg-[#ea6c0a] text-white rounded-xl font-outfit font-bold px-8 py-3 h-auto text-base">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}