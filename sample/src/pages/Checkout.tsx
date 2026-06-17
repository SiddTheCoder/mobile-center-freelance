import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronRight, CreditCard, Truck, Shield, Lock, MapPin, Phone, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";

const STEPS = ["Cart Review", "Delivery", "Payment", "Confirmation"];

const PAYMENT_METHODS = [
  { id: "esewa", label: "eSewa", color: "bg-green-500", desc: "Pay directly from your eSewa wallet" },
  { id: "khalti", label: "Khalti", color: "bg-purple-600", desc: "Fast & secure payment via Khalti" },
  { id: "ime-pay", label: "IME Pay", color: "bg-blue-600", desc: "Pay with IME Pay mobile wallet" },
  { id: "card", label: "Credit/Debit Card", color: "bg-gray-700", desc: "Visa, MasterCard accepted" },
  { id: "cod", label: "Cash on Delivery", color: "bg-[#f97316]", desc: "Pay when your order arrives" },
];

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("esewa");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { items, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "Kathmandu",
    district: "Kathmandu",
    deliveryNote: "",
  });

  const delivery = totalPrice >= 5000 ? 0 : 150;
  const total = totalPrice + delivery;
  const orderId = `ZP${Date.now().toString().slice(-8)}`;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-outfit font-black text-2xl text-gray-900 mb-2">Order Placed!</h1>
          <p className="font-figtree text-gray-500 mb-4 text-sm leading-relaxed">
            Your order has been confirmed. You'll receive an SMS on your registered number shortly.
          </p>
          <div className="bg-[#F9FAFB] rounded-xl p-4 mb-5 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-figtree text-gray-500">Order ID</span>
              <span className="text-sm font-outfit font-bold text-[#4c1d95]">#{orderId}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-figtree text-gray-500">Payment</span>
              <span className="text-sm font-figtree font-semibold text-gray-700 capitalize">{selectedPayment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-figtree text-gray-500">Estimated Delivery</span>
              <span className="text-sm font-figtree font-semibold text-green-600">2-3 Business Days</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/track-order" className="flex-1">
              <Button variant="outline" className="w-full border-[#4c1d95] text-[#4c1d95] rounded-xl font-figtree">
                Track Order
              </Button>
            </Link>
            <Link to="/" className="flex-1">
              <Button className="w-full bg-[#4c1d95] hover:bg-[#3b0764] text-white rounded-xl font-outfit font-bold">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Steps Header */}
      <div className="bg-white border-b border-gray-100 py-4 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-0 overflow-x-auto scrollbar-hide">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-0 flex-shrink-0">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-outfit font-bold transition-all ${
                      i + 1 < step
                        ? "bg-green-500 text-white"
                        : i + 1 === step
                        ? "bg-[#4c1d95] text-white shadow-md"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs font-figtree hidden sm:block ${i + 1 === step ? "text-[#4c1d95] font-semibold" : "text-gray-400"}`}>
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-16 sm:w-24 h-0.5 mx-1 mt-[-16px] ${i + 1 < step ? "bg-green-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-4">

            {/* Step 1: Cart Review */}
            {step === 1 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h2 className="font-outfit font-bold text-gray-900 text-lg mb-4">Review Your Cart</h2>
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 font-figtree mb-4">Your cart is empty</p>
                    <Link to="/">
                      <Button className="bg-[#4c1d95] hover:bg-[#3b0764] text-white rounded-xl font-outfit font-bold">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 p-3 bg-[#F9FAFB] rounded-xl">
                        <div className="w-14 h-14 rounded-lg bg-white border border-gray-200 flex-shrink-0 overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-figtree font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</p>
                          <p className="text-xs text-gray-400 font-figtree mt-0.5">Qty: {item.quantity}</p>
                          <p className="font-outfit font-bold text-[#4c1d95] text-sm mt-0.5">
                            Rs. {(item.price * item.quantity).toLocaleString("en-NP")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {items.length > 0 && (
                  <Button
                    onClick={() => setStep(2)}
                    className="w-full mt-4 bg-[#4c1d95] hover:bg-[#3b0764] text-white rounded-xl font-outfit font-bold h-11"
                  >
                    Continue to Delivery <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            )}

            {/* Step 2: Delivery */}
            {step === 2 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h2 className="font-outfit font-bold text-gray-900 text-lg mb-5">Delivery Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="font-figtree text-gray-700 text-sm font-semibold">
                      <User className="w-3.5 h-3.5 inline mr-1" />First Name *
                    </Label>
                    <Input
                      placeholder="Aarav"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="rounded-xl border-gray-200 focus:border-[#4c1d95] h-10 font-figtree"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-figtree text-gray-700 text-sm font-semibold">Last Name *</Label>
                    <Input
                      placeholder="Shrestha"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="rounded-xl border-gray-200 focus:border-[#4c1d95] h-10 font-figtree"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-figtree text-gray-700 text-sm font-semibold">
                      <Phone className="w-3.5 h-3.5 inline mr-1" />Phone *
                    </Label>
                    <Input
                      placeholder="98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="rounded-xl border-gray-200 focus:border-[#4c1d95] h-10 font-figtree"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-figtree text-gray-700 text-sm font-semibold">
                      <Mail className="w-3.5 h-3.5 inline mr-1" />Email
                    </Label>
                    <Input
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="rounded-xl border-gray-200 focus:border-[#4c1d95] h-10 font-figtree"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label className="font-figtree text-gray-700 text-sm font-semibold">
                      <MapPin className="w-3.5 h-3.5 inline mr-1" />Street Address *
                    </Label>
                    <Input
                      placeholder="Street/Tole, Ward No."
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="rounded-xl border-gray-200 focus:border-[#4c1d95] h-10 font-figtree"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-figtree text-gray-700 text-sm font-semibold">City *</Label>
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="rounded-xl border-gray-200 focus:border-[#4c1d95] h-10 font-figtree"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-figtree text-gray-700 text-sm font-semibold">District *</Label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-3 h-10 text-sm font-figtree text-gray-700 focus:outline-none focus:border-[#4c1d95]"
                    >
                      {["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Chitwan", "Butwal", "Biratnagar", "Janakpur"].map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label className="font-figtree text-gray-700 text-sm font-semibold">Delivery Note (Optional)</Label>
                    <Input
                      placeholder="E.g. Leave at gate, call before delivery..."
                      value={formData.deliveryNote}
                      onChange={(e) => setFormData({ ...formData, deliveryNote: e.target.value })}
                      className="rounded-xl border-gray-200 focus:border-[#4c1d95] h-10 font-figtree"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-xl border-gray-200 font-figtree">
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-[#4c1d95] hover:bg-[#3b0764] text-white rounded-xl font-outfit font-bold"
                  >
                    Continue to Payment <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h2 className="font-outfit font-bold text-gray-900 text-lg mb-5">Payment Method</h2>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? "border-[#4c1d95] bg-purple-50"
                          : "border-gray-200 hover:border-purple-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                        className="accent-[#4c1d95]"
                      />
                      <div className={`w-10 h-6 ${method.color} rounded flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-outfit font-bold">{method.label.slice(0, 4)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-figtree font-semibold text-gray-800 text-sm">{method.label}</p>
                        <p className="text-xs text-gray-400 font-figtree">{method.desc}</p>
                      </div>
                      {selectedPayment === method.id && (
                        <Check className="w-4 h-4 text-[#4c1d95] flex-shrink-0" />
                      )}
                    </label>
                  ))}
                </div>

                <div className="flex items-center gap-2 mt-4 p-3 bg-gray-50 rounded-xl">
                  <Lock className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <p className="text-xs text-gray-500 font-figtree">
                    Your payment information is encrypted and secure. We never store payment details.
                  </p>
                </div>

                <div className="flex gap-3 mt-5">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1 rounded-xl border-gray-200 font-figtree">
                    Back
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-[#f97316] hover:bg-[#ea6c0a] text-white rounded-xl font-outfit font-bold"
                  >
                    Place Order – Rs. {total.toLocaleString("en-NP")}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary Rail */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-24">
              <h3 className="font-outfit font-bold text-gray-900 text-base mb-4">Order Summary</h3>

              {/* Items */}
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-2">
                    <span className="text-xs font-figtree text-gray-600 line-clamp-1 flex-1">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-xs font-figtree font-semibold text-gray-800 flex-shrink-0">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-100 mb-3" />

              <div className="space-y-2 text-sm font-figtree">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold text-gray-700">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery</span>
                  <span className={`font-semibold ${delivery === 0 ? "text-green-600" : "text-gray-700"}`}>
                    {delivery === 0 ? "FREE" : `Rs. ${delivery.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Discount</span>
                  <span className="font-semibold text-green-600">–Rs. 0</span>
                </div>
              </div>

              <div className="h-px bg-gray-100 my-3" />

              <div className="flex justify-between">
                <span className="font-outfit font-bold text-gray-900">Total</span>
                <span className="font-outfit font-black text-[#4c1d95] text-lg">
                  Rs. {total.toLocaleString("en-NP")}
                </span>
              </div>

              {/* Trust */}
              <div className="mt-4 space-y-2">
                {[
                  { icon: Shield, text: "Genuine products guaranteed" },
                  { icon: Truck, text: "Estimated delivery: 2-3 days" },
                  { icon: Lock, text: "100% secure checkout" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-gray-500 font-figtree">
                    <Icon className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}