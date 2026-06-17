import { useState } from "react";
import { Search, Package, Truck, CheckCircle, MapPin, Phone, Clock, Box, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const TRACKING_STEPS = [
  { id: 1, status: "Order Placed", desc: "Your order has been confirmed and payment received.", time: "2 Nov 2024, 10:23 AM", done: true, icon: CheckCircle },
  { id: 2, status: "Order Processed", desc: "Our team has verified and packed your order.", time: "2 Nov 2024, 2:45 PM", done: true, icon: Box },
  { id: 3, status: "Shipped", desc: "Package handed over to ZOLPA delivery partner.", time: "3 Nov 2024, 9:00 AM", done: true, icon: Package },
  { id: 4, status: "Out for Delivery", desc: "Your package is on the way! Driver: Ram Bahadur | 9841XXXXXX", time: "4 Nov 2024, 8:30 AM", done: true, icon: Truck },
  { id: 5, status: "Delivered", desc: "Package delivered successfully. Enjoy your product!", time: "4 Nov 2024, 2:15 PM", done: false, icon: MapPin },
];

const SAMPLE_ORDER = {
  id: "ZP87654321",
  date: "2 Nov 2024",
  items: [
    { name: "Samsung Galaxy S24 Ultra 512GB Titanium Black", qty: 1, price: 189999 },
    { name: "AirPods Pro 2nd Generation", qty: 1, price: 39999 },
  ],
  total: 229998,
  delivery: "Baneshwor, Kathmandu",
  currentStep: 4,
};

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [tracked, setTracked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTracked(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-[#4c1d95] py-10 px-4 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Truck className="w-7 h-7 text-[#f97316]" />
          </div>
          <h1 className="font-outfit font-black text-3xl md:text-4xl mb-2">Track Your Order</h1>
          <p className="font-figtree text-purple-200 text-sm md:text-base">
            Enter your order ID and registered phone number to track your delivery in real-time.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 -mt-6">
        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="block text-sm font-figtree font-semibold text-gray-700 mb-1.5">
                Order ID
              </label>
              <Input
                placeholder="e.g. ZP87654321"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="rounded-xl border-gray-200 focus:border-[#4c1d95] h-11 font-figtree"
              />
            </div>
            <div>
              <label className="block text-sm font-figtree font-semibold text-gray-700 mb-1.5">
                Registered Phone Number
              </label>
              <Input
                placeholder="98XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl border-gray-200 focus:border-[#4c1d95] h-11 font-figtree"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4c1d95] hover:bg-[#3b0764] text-white rounded-xl h-11 font-outfit font-bold text-base"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Tracking...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Track Order
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-gray-400 font-figtree mt-3">
            Try demo: Order ID <strong>ZP87654321</strong> with any phone number
          </p>
        </div>

        {/* Tracking Results */}
        {tracked && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-outfit font-bold text-gray-900 text-lg">Order #{SAMPLE_ORDER.id}</h2>
                  <p className="text-sm text-gray-400 font-figtree">Placed on {SAMPLE_ORDER.date}</p>
                </div>
                <Badge className="bg-[#f97316]/10 text-[#f97316] border-0 font-figtree font-semibold text-xs px-3 py-1">
                  Out for Delivery
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                {SAMPLE_ORDER.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-start gap-2 text-sm">
                    <span className="font-figtree text-gray-700 flex-1">{item.name} × {item.qty}</span>
                    <span className="font-outfit font-bold text-gray-800 flex-shrink-0">Rs. {item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 p-3 bg-[#F9FAFB] rounded-xl text-sm">
                <MapPin className="w-4 h-4 text-[#4c1d95] flex-shrink-0" />
                <span className="font-figtree text-gray-600">Delivering to: <strong>{SAMPLE_ORDER.delivery}</strong></span>
              </div>
            </div>

            {/* Live Tracking Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#F9FAFB] h-40 flex items-center justify-center relative">
                <div className="w-full h-full">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_3d24bf6596_30f3c8d461ab0c02.png"
                    alt="Delivery Map"
                    className="w-full h-full object-cover opacity-60"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm border border-gray-200">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-figtree font-semibold text-gray-700">Driver near Baneshwor Chowk</span>
                  </div>
                </div>
              </div>

              {/* Driver Info */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                    alt="Driver"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-figtree font-bold text-gray-800 text-sm">Ram Bahadur Tamang</p>
                    <p className="text-xs text-gray-400 font-figtree">ZOLPA Delivery Partner</p>
                  </div>
                </div>
                <a href="tel:9841000000">
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white rounded-xl font-figtree gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </Button>
                </a>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-outfit font-bold text-gray-900 mb-5">Delivery Timeline</h3>
              <div className="relative">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100" />
                <div className="space-y-5">
                  {TRACKING_STEPS.map((step, i) => {
                    const isActive = i < SAMPLE_ORDER.currentStep;
                    const isCurrent = i === SAMPLE_ORDER.currentStep - 1;
                    return (
                      <div key={step.id} className="flex gap-4 relative">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                            isActive
                              ? isCurrent
                                ? "bg-[#f97316] shadow-md"
                                : "bg-green-500"
                              : "bg-gray-100"
                          }`}
                        >
                          <step.icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                        </div>
                        <div className="flex-1 pt-0.5">
                          <div className="flex items-center justify-between">
                            <p className={`font-figtree font-bold text-sm ${isActive ? "text-gray-800" : "text-gray-400"}`}>
                              {step.status}
                              {isCurrent && (
                                <Badge className="ml-2 bg-[#f97316]/10 text-[#f97316] border-0 text-xs font-figtree">Current</Badge>
                              )}
                            </p>
                          </div>
                          <p className={`text-xs font-figtree mt-0.5 ${isActive ? "text-gray-500" : "text-gray-300"}`}>
                            {step.desc}
                          </p>
                          {isActive && (
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-400 font-figtree">{step.time}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="bg-[#4c1d95] rounded-2xl p-5 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-outfit font-bold text-white text-base">Need Help?</p>
                <p className="text-purple-200 text-sm font-figtree">Contact our support team for any delivery issues.</p>
              </div>
              <div className="flex gap-2">
                <Button className="bg-white text-[#4c1d95] hover:bg-gray-100 rounded-xl font-figtree font-semibold text-sm">
                  <Phone className="w-4 h-4 mr-1.5" /> 01-4567890
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}