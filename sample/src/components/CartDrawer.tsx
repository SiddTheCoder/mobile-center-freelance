import { X, Trash2, ShoppingBag, Plus, Minus, Truck, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  const formatPrice = (price: number) =>
    `Rs. ${price.toLocaleString("en-NP")}`;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[460px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-[#4c1d95] text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="font-outfit font-bold text-lg">Your Cart</h2>
            {totalItems > 0 && (
              <Badge className="bg-[#f97316] text-white border-0 text-xs">
                {totalItems} items
              </Badge>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-around px-5 py-2.5 bg-purple-50 border-b text-xs font-figtree text-gray-600">
          <div className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-[#4c1d95]" />
            <span>Free delivery above Rs. 5,000</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-green-600" />
            <span>Secure Checkout</span>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <div>
                <h3 className="font-outfit font-semibold text-gray-700 text-lg">Your cart is empty</h3>
                <p className="text-sm text-gray-400 font-figtree mt-1">
                  Explore our electronics and add items to your cart
                </p>
              </div>
              <Button
                onClick={onClose}
                className="bg-[#4c1d95] hover:bg-[#3b0764] text-white rounded-xl"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="px-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-[#F9FAFB] rounded-xl border border-gray-100"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-figtree font-semibold text-gray-800 text-sm line-clamp-2 leading-snug">
                      {item.name}
                    </h4>
                    {(item.color || item.storage) && (
                      <p className="text-xs text-gray-400 font-figtree mt-0.5">
                        {[item.color, item.storage].filter(Boolean).join(" • ")}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <span className="font-outfit font-bold text-[#4c1d95] text-sm">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-gray-400 line-through ml-1.5 font-figtree">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-figtree font-semibold text-sm w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-6 h-6 rounded-md ml-1 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors text-gray-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t bg-white px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-figtree text-gray-600 text-sm">Subtotal</span>
              <span className="font-outfit font-bold text-gray-900">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-figtree text-gray-500">Delivery</span>
              <span className="font-figtree text-green-600 font-semibold">
                {totalPrice >= 5000 ? "FREE" : formatPrice(150)}
              </span>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex items-center justify-between">
              <span className="font-outfit font-bold text-gray-900">Total</span>
              <span className="font-outfit font-bold text-[#4c1d95] text-xl">
                {formatPrice(totalPrice >= 5000 ? totalPrice : totalPrice + 150)}
              </span>
            </div>
            <Link to="/checkout" onClick={onClose}>
              <Button className="w-full bg-[#f97316] hover:bg-[#ea6c0a] text-white rounded-xl h-12 font-outfit font-bold text-base mt-1">
                Proceed to Checkout
              </Button>
            </Link>
            <Link to="/cart" onClick={onClose}>
              <Button variant="outline" className="w-full border-[#4c1d95] text-[#4c1d95] rounded-xl h-10 font-figtree">
                View Full Cart
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}