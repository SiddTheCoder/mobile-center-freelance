import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star, Shield, Truck, RotateCcw, Heart, Share2, ChevronRight,
  Check, ShoppingCart, Zap, Award, Package, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/hooks/useCart";
import { categoryProducts } from "@/data/products";

const productImages = [
  "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_fc51d7952f_6682c01f80d5d3cb.png",
  "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_fc51d7952f_cf7d4fe8fbdad72a.png",
  "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_267ed9f9f6_04b9a549bfb5743f.png",
  "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_bf4a3f4d61_1dadd839aaabb073.png",
];

const specs = [
  { label: "Display", value: "6.1\" Super Retina XDR OLED, 2556×1179, 460 ppi" },
  { label: "Processor", value: "A17 Pro chip, 6-core CPU, 6-core GPU" },
  { label: "Storage", value: "128GB / 256GB / 512GB / 1TB NVMe" },
  { label: "RAM", value: "8GB LPDDR5" },
  { label: "Camera", value: "48MP Main + 12MP Ultra Wide + 12MP 3x Telephoto" },
  { label: "Front Camera", value: "12MP TrueDepth, Face ID" },
  { label: "Battery", value: "3274 mAh, 29W Fast Charge, MagSafe 15W" },
  { label: "OS", value: "iOS 17, upgradeable to iOS 18" },
  { label: "Build", value: "Titanium Frame, Ceramic Shield Front, Textured Matte Glass" },
  { label: "Connectivity", value: "5G, Wi-Fi 6E, Bluetooth 5.3, NFC, USB-C" },
  { label: "Colors", value: "Natural Titanium, Blue Titanium, White Titanium, Black Titanium" },
  { label: "Warranty", value: "1 Year Apple Official Warranty (Nepal)" },
];

const reviews = [
  {
    id: 1,
    name: "Aayush Shrestha",
    rating: 5,
    date: "15 Nov 2024",
    title: "Best iPhone I've ever used",
    body: "The titanium build feels incredibly premium. Camera is phenomenal and the A17 Pro handles everything smoothly. eSewa checkout was super easy!",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
    verified: true,
  },
  {
    id: 2,
    name: "Priya Tamang",
    rating: 4,
    date: "10 Nov 2024",
    title: "Excellent device, fast delivery",
    body: "Great product, delivered in 2 days to Pokhara. The genuine product seal was intact. Battery life could be better but everything else is perfect.",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    verified: true,
  },
  {
    id: 3,
    name: "Bikash Gurung",
    rating: 5,
    date: "5 Nov 2024",
    title: "Worth every rupee",
    body: "Paid through Khalti, got instant confirmation. The Action Button is super useful. ZOLPA's after-sales support is also top-notch.",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    verified: true,
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Natural Titanium");
  const [selectedStorage, setSelectedStorage] = useState("256GB");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "reviews" | "warranty">("specs");
  const { addItem } = useCart();

  const product = categoryProducts.find((p) => p.id === id) || categoryProducts[0];
  const relatedProducts = categoryProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const colors = ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"];
  const storageOptions = ["128GB", "256GB", "512GB", "1TB"];
  const storagePrices: Record<string, number> = {
    "128GB": 179999,
    "256GB": 199999,
    "512GB": 239999,
    "1TB": 289999,
  };

  const currentPrice = storagePrices[selectedStorage] || product.price;
  const savings = product.originalPrice ? product.originalPrice - currentPrice : 0;

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedStorage}-${selectedColor}`,
      name: `${product.name} ${selectedStorage} ${selectedColor}`,
      price: currentPrice,
      originalPrice: product.originalPrice,
      image: product.img_url,
      color: selectedColor,
      storage: selectedStorage,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F9FAFB] border-b border-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-1.5 text-sm font-figtree text-gray-500 flex-wrap">
            <Link to="/" className="hover:text-[#4c1d95]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/category/:slug" className="hover:text-[#4c1d95]">Smartphones</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-800 font-semibold line-clamp-1">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Split-Action Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          {/* Left: Image Gallery */}
          <div className="flex gap-3">
            {/* Vertical Thumbnail Ribbon */}
            <div className="flex flex-col gap-2 w-16 flex-shrink-0">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-[#F9FAFB] flex-shrink-0 transition-all ${
                    selectedImage === i
                      ? "border-[#4c1d95] shadow-md"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-[#F9FAFB] rounded-2xl overflow-hidden flex items-center justify-center min-h-[360px] md:min-h-[480px] relative group">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-8 max-h-[480px]"
              />

              {/* Trust Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-xl px-3 py-1.5">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-xs font-figtree font-semibold text-green-700">Genuine Product</span>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center hover:text-red-500 text-gray-400 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center hover:text-[#4c1d95] text-gray-400 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {savings > 0 && (
                <div className="absolute bottom-4 left-4 bg-[#f97316] text-white rounded-xl px-3 py-1.5 text-sm font-outfit font-bold">
                  Save Rs. {savings.toLocaleString("en-NP")}
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Info + Sticky Purchase Bar */}
          <div className="flex flex-col gap-4">
            {/* Brand + Rating */}
            <div className="flex items-start justify-between">
              <div>
                <Badge className="bg-purple-100 text-[#4c1d95] border-0 text-xs font-figtree mb-2">
                  {product.brand}
                </Badge>
                <h1 className="font-outfit font-black text-xl md:text-2xl lg:text-3xl text-gray-900 leading-tight">
                  {product.name}
                </h1>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-[#f97316] text-[#f97316]" : "text-gray-200 fill-gray-200"}`}
                  />
                ))}
              </div>
              <span className="font-outfit font-bold text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-400 font-figtree">({product.reviewCount} reviews)</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-md font-figtree font-semibold">In Stock</span>
            </div>

            {/* Price */}
            <div className="bg-[#F9FAFB] rounded-xl p-4">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-outfit font-black text-3xl text-[#4c1d95]">
                  Rs. {currentPrice.toLocaleString("en-NP")}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through font-figtree text-base">
                    Rs. {product.originalPrice.toLocaleString("en-NP")}
                  </span>
                )}
                {savings > 0 && (
                  <Badge className="bg-[#f97316]/10 text-[#f97316] border-0 font-outfit font-bold">
                    {Math.round((savings / product.originalPrice!) * 100)}% OFF
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-500 font-figtree mt-1">
                Inclusive of all taxes • EMI from Rs. 5,999/mo
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <p className="text-sm font-figtree font-semibold text-gray-700 mb-2">
                Color: <span className="text-[#4c1d95]">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-xl border-2 text-sm font-figtree font-medium transition-all ${
                      selectedColor === color
                        ? "border-[#4c1d95] bg-purple-50 text-[#4c1d95]"
                        : "border-gray-200 text-gray-600 hover:border-purple-200"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div>
              <p className="text-sm font-figtree font-semibold text-gray-700 mb-2">Storage</p>
              <div className="flex flex-wrap gap-2">
                {storageOptions.map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`px-4 py-2 rounded-xl border-2 text-sm font-figtree font-semibold transition-all ${
                      selectedStorage === storage
                        ? "border-[#4c1d95] bg-[#4c1d95] text-white"
                        : "border-gray-200 text-gray-600 hover:border-purple-200"
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Truck, label: "Free Delivery", sub: "Ktm Valley" },
                { icon: RotateCcw, label: "7-Day Return", sub: "Easy returns" },
                { icon: Award, label: "1 Year Warranty", sub: "Official" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center p-2.5 bg-[#F9FAFB] rounded-xl border border-gray-100">
                  <Icon className="w-4 h-4 text-[#4c1d95] mb-1" />
                  <span className="text-xs font-figtree font-semibold text-gray-700">{label}</span>
                  <span className="text-xs text-gray-400 font-figtree">{sub}</span>
                </div>
              ))}
            </div>

            {/* Sticky Purchase Bar */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm sticky bottom-4 lg:sticky lg:top-24 z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-figtree font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-lg font-bold"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm font-figtree text-gray-500">
                  Total: <span className="font-outfit font-bold text-gray-900">
                    Rs. {(currentPrice * quantity).toLocaleString("en-NP")}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 border-[#4c1d95] text-[#4c1d95] hover:bg-purple-50 rounded-xl font-outfit font-bold h-11"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Link to="/checkout" className="flex-1">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-[#f97316] hover:bg-[#ea6c0a] text-white rounded-xl font-outfit font-bold h-11"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </Link>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400 font-figtree">Pay with:</span>
                {["eSewa", "Khalti", "IME Pay", "Cards"].map((m) => (
                  <span key={m} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md font-figtree">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Specs, Reviews, Warranty */}
        <div className="mt-10 border-b border-gray-100">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {(["specs", "reviews", "warranty"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 font-figtree font-semibold text-sm whitespace-nowrap border-b-2 transition-all capitalize ${
                  activeTab === tab
                    ? "border-[#4c1d95] text-[#4c1d95]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "specs" ? "Full Specifications" : tab === "reviews" ? `Reviews (${product.reviewCount})` : "Warranty & Returns"}
              </button>
            ))}
          </div>
        </div>

        <div className="py-6">
          {activeTab === "specs" && (
            <div className="bg-[#F9FAFB] rounded-xl border border-gray-100 overflow-hidden">
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`grid grid-cols-5 gap-4 px-5 py-3.5 ${i % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}`}
                >
                  <div className="col-span-2 font-figtree font-semibold text-gray-600 text-sm">{spec.label}</div>
                  <div className="col-span-3 font-figtree text-gray-800 text-sm">{spec.value}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-figtree font-bold text-gray-800 text-sm">{review.name}</span>
                            {review.verified && (
                              <span className="flex items-center gap-0.5 text-xs text-green-600 font-figtree">
                                <Check className="w-3 h-3" /> Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-[#f97316] text-[#f97316]" : "text-gray-200 fill-gray-200"}`} />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 font-figtree">{review.date}</span>
                      </div>
                      <h4 className="font-figtree font-bold text-gray-800 text-sm mt-2">{review.title}</h4>
                      <p className="text-sm text-gray-600 font-figtree mt-1 leading-relaxed">{review.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "warranty" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Shield,
                  title: "1 Year Official Warranty",
                  desc: "This product comes with a full 1-year manufacturer warranty from Apple Nepal. Visit any authorized service center.",
                  color: "bg-green-50 border-green-100",
                  iconColor: "text-green-600",
                },
                {
                  icon: RotateCcw,
                  title: "7-Day Easy Returns",
                  desc: "Not satisfied? Return within 7 days of delivery for a full refund. Product must be in original condition with all accessories.",
                  color: "bg-blue-50 border-blue-100",
                  iconColor: "text-blue-600",
                },
                {
                  icon: Phone,
                  title: "24/7 Support",
                  desc: "Our dedicated support team is available round the clock. Call 01-4567890 or WhatsApp 9801234567 for assistance.",
                  color: "bg-purple-50 border-purple-100",
                  iconColor: "text-[#4c1d95]",
                },
              ].map(({ icon: Icon, title, desc, color, iconColor }) => (
                <div key={title} className={`rounded-xl border p-5 ${color}`}>
                  <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <h3 className="font-outfit font-bold text-gray-800 text-base mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 font-figtree leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        <section className="mt-6">
          <h2 className="font-outfit font-black text-xl text-gray-900 mb-4">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}