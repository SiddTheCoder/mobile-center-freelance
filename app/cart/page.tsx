"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import {
  ArrowLeft,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { CartSheet } from "@/components/cart-sheet"
import { LoginDialog } from "@/components/login-dialog"
import { SiteFooter } from "@/components/site-footer"
import { StorefrontHeader } from "@/components/storefront-header"
import { CART_STORAGE_KEY, PLATFORM_NAME } from "@/lib/platform"
import { formatPrice, products, type CartItem, type Product } from "@/lib/products"
import { cn } from "@/lib/utils"

const COUPON_CODE = "SAVE5"

export default function CartPage() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = React.useState(false)
  const [loginOpen, setLoginOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<"login" | "signup">("login")
  const [couponCode, setCouponCode] = React.useState("")
  const [couponApplied, setCouponApplied] = React.useState(false)
  const [toast, setToast] = React.useState("")
  const toastTimer = React.useRef<number | null>(null)

  // Load cart from localStorage
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      if (saved) setCartItems(JSON.parse(saved))
    } catch {}
  }, [])

  // Sync to localStorage
  React.useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = cartItems.reduce(
    (sum, item) => sum + ((item.originalPrice || item.price) - item.price) * item.quantity,
    0
  )
  const delivery = subtotal > 0 && subtotal < 5000 ? 150 : 0
  const couponDiscount = couponApplied ? Math.round(subtotal * 0.05) : 0
  const grandTotal = subtotal - couponDiscount + delivery

  const showToast = (message: string) => {
    setToast(message)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(""), 2600)
  }

  const addToCart = (product: Product, amount = 1) => {
    if (product.soldOut) return
    setCartItems((items) => {
      const existing = items.find((i) => i.id === product.id)
      if (existing) {
        return items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + amount } : i
        )
      }
      return [...items, { ...product, quantity: amount }]
    })
    showToast(`${product.name.split(" ").slice(0, 3).join(" ")} added`)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((items) =>
      quantity <= 0
        ? items.filter((i) => i.id !== productId)
        : items.map((i) => (i.id === productId ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => {
    setCartItems([])
    showToast("Cart cleared")
  }

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === COUPON_CODE) {
      setCouponApplied(true)
      showToast(`Coupon ${COUPON_CODE} applied — 5% off!`)
    } else {
      showToast("Invalid coupon code")
    }
  }

  // Suggested products (not already in cart)
  const suggested = products
    .filter((p) => !cartItems.find((c) => c.id === p.id) && !p.soldOut)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-[#f8f8f7] text-[#101322]">
      <StorefrontHeader
        totalItems={totalItems}
        onCartOpen={() => setCartOpen(true)}
        onLoginOpen={() => setLoginOpen(true)}
      />

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#f97316] transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#101322] font-semibold">Shopping Cart</span>
        </nav>

        {/* Cart Title */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="size-7 text-[#f97316]" />
            <h1 className="text-2xl font-black tracking-tight md:text-3xl">
              Your Cart
            </h1>
            {totalItems > 0 && (
              <Badge className="rounded-full bg-[#f97316] text-white px-2.5 py-0.5 text-xs font-bold">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </Badge>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="flex gap-2">
              <Link href="/">
                <Button
                  variant="outline"
                  className="rounded-[8px] border-slate-200 text-sm font-semibold"
                >
                  <ArrowLeft className="size-4 mr-1" />
                  Continue Shopping
                </Button>
              </Link>
              <Button
                variant="outline"
                className="rounded-[8px] border-rose-200 text-rose-500 hover:bg-rose-50 text-sm font-semibold"
                onClick={clearCart}
              >
                <Trash2 className="size-4 mr-1" />
                Clear Cart
              </Button>
            </div>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-[12px] border border-[#ececf1] bg-white py-20 text-center shadow-sm"
          >
            <div className="grid size-24 place-items-center rounded-full bg-slate-100">
              <ShoppingBag className="size-12 text-slate-300" />
            </div>
            <h2 className="mt-6 text-2xl font-black">Your cart is empty</h2>
            <p className="mt-2 max-w-sm text-sm text-slate-500 leading-relaxed">
              Looks like you haven't added anything yet. Explore our latest
              phones, laptops, and accessories.
            </p>
            <Link href="/">
              <Button className="mt-6 h-11 rounded-[8px] bg-[#f97316] px-6 text-white hover:bg-[#ea580c] font-bold shadow-md">
                <ArrowLeft className="size-4 mr-1" />
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          /* Cart Content */
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Items List */}
            <div className="space-y-3">
              {/* Column headers (desktop) */}
              <div className="hidden rounded-[10px] bg-slate-100/80 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 md:grid md:grid-cols-[1fr_120px_140px_100px_40px]">
                <span>Product</span>
                <span className="text-center">Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Subtotal</span>
                <span />
              </div>

              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -60, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid items-center gap-4 rounded-[10px] border border-[#ececf1] bg-white p-4 shadow-sm md:grid-cols-[1fr_120px_140px_100px_40px]"
                  >
                    {/* Product info */}
                    <div className="flex gap-4">
                      <Link
                        href={`/product/${item.id}`}
                        className="grid size-20 shrink-0 place-items-center rounded-[8px] bg-[#f5f5f6] border border-[#ececf1] transition hover:border-[#f97316]/40"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain p-2"
                        />
                      </Link>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#f97316]">
                          {item.brand}
                        </p>
                        <Link
                          href={`/product/${item.id}`}
                          className="mt-0.5 line-clamp-2 text-sm font-bold text-[#101322] hover:text-[#f97316] transition"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-xs text-slate-400">
                          {item.colors[0]} · {item.category}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center">
                      <p className="text-sm font-black text-[#101322]">
                        {formatPrice(item.price)}
                      </p>
                      {item.originalPrice && (
                        <p className="text-[10px] text-slate-400 line-through">
                          {formatPrice(item.originalPrice)}
                        </p>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-center">
                      <div className="flex h-9 items-center rounded-[8px] border border-[#dddddf] bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="grid size-9 place-items-center rounded-l-[8px] hover:bg-slate-50 transition"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="min-w-[36px] text-center text-sm font-black">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="grid size-9 place-items-center rounded-r-[8px] hover:bg-slate-50 transition"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <p className="text-right text-sm font-black text-[#2b0f52]">
                      {formatPrice(item.price * item.quantity)}
                    </p>

                    {/* Remove */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 0)}
                        className="grid size-8 place-items-center rounded-[6px] text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-4">
              {/* Summary Card */}
              <div className="rounded-[12px] border border-[#ececf1] bg-white p-5 shadow-sm">
                <h2 className="text-lg font-black">Order Summary</h2>
                <Separator className="my-4" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-bold">{formatPrice(subtotal)}</span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span className="font-semibold">You save</span>
                      <span className="font-bold">-{formatPrice(savings)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-slate-500">Delivery</span>
                    <span className="font-bold">
                      {delivery === 0 ? (
                        <span className="text-emerald-600">FREE</span>
                      ) : (
                        formatPrice(delivery)
                      )}
                    </span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between text-[#f97316]">
                      <span className="font-semibold">Coupon ({COUPON_CODE})</span>
                      <span className="font-bold">
                        -{formatPrice(couponDiscount)}
                      </span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg">
                    <span className="font-black">Grand Total</span>
                    <span className="font-black text-[#2b0f52]">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Tag className="size-3.5 text-[#f97316]" />
                    Apply Coupon Code
                  </p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code..."
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="h-10 rounded-[8px] border-slate-200 text-sm font-semibold"
                    />
                    <Button
                      onClick={applyCoupon}
                      className="h-10 rounded-[8px] bg-slate-900 text-white hover:bg-slate-800 text-sm font-bold px-4"
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="mt-1.5 text-[10px] text-slate-400">
                    Try: {COUPON_CODE} for 5% discount
                  </p>
                </div>

                {/* Checkout Button */}
                <Button className="mt-5 h-12 w-full rounded-[8px] bg-[#f97316] text-white hover:bg-[#ea580c] font-bold text-base shadow-lg shadow-orange-500/20">
                  Proceed to Checkout
                </Button>
                <p className="mt-3 text-center text-[10px] text-slate-400">
                  By placing an order, you agree to {PLATFORM_NAME} terms and privacy
                  policy.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 rounded-[10px] border border-[#ececf1] bg-white p-3">
                  <Truck className="size-5 text-[#f97316]" />
                  <div>
                    <p className="text-xs font-black">Free Delivery</p>
                    <p className="text-[10px] text-slate-400">
                      Orders above Rs. 5,000
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-[10px] border border-[#ececf1] bg-white p-3">
                  <ShieldCheck className="size-5 text-[#f97316]" />
                  <div>
                    <p className="text-xs font-black">Genuine Products</p>
                    <p className="text-[10px] text-slate-400">
                      100% authentic
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Products */}
        {suggested.length > 0 && (
          <section className="mt-12 pb-8">
            <h2 className="mb-5 text-xl font-black tracking-tight">
              You might also like
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {suggested.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -4 }}
                  className="rounded-[10px] border border-[#ececf1] bg-white overflow-hidden shadow-sm hover:border-[#f97316]/30 hover:shadow-lg transition"
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="group block"
                  >
                    <div className="flex h-36 items-center justify-center bg-[#f5f5f6]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#f97316]">
                        {product.brand}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[13px] font-semibold text-[#101322]">
                        {product.name}
                      </p>
                      <p className="mt-1.5 text-[15px] font-black text-[#101322]">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </Link>
                  <div className="px-3 pb-3">
                    <Button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="h-9 w-full rounded-[8px] bg-[#2b0f52] text-white hover:bg-[#f97316] text-xs font-bold"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>

      <SiteFooter />

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
      />
      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="fixed bottom-24 right-5 z-50 max-w-xs rounded-[8px] bg-[linear-gradient(135deg,#f97316,#5531d4)] p-4 text-sm font-bold text-white shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp FAB */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => window.open("https://wa.me/9800000000", "_blank")}
        className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba5a] transition duration-200"
        aria-label="Open live chat"
      >
        <MessageCircle className="size-6 fill-white" />
        <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-rose-500 text-[11px] font-black">
          1
        </span>
      </motion.button>
    </main>
  )
}
