"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import {
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CartSheet } from "@/components/cart-sheet"
import { LoginDialog } from "@/components/login-dialog"
import { ProductCard } from "@/components/product-card"
import { SiteFooter } from "@/components/site-footer"
import { StorefrontHeader } from "@/components/storefront-header"
import { PLATFORM_NAME } from "@/lib/platform"
import {
  discountFor,
  formatPrice,
  getRelatedProducts,
  type CartItem,
  type Product,
} from "@/lib/products"
import { cn } from "@/lib/utils"

type ProductDetailClientProps = {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [galleryIndex, setGalleryIndex] = React.useState(0)
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0])
  const [quantity, setQuantity] = React.useState(1)
  const [cartOpen, setCartOpen] = React.useState(false)
  const [loginOpen, setLoginOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<"login" | "signup">("login")
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [toast, setToast] = React.useState("")
  const [botOpen, setBotOpen] = React.useState(true)
  const [detailTab, setDetailTab] = React.useState<"specs" | "description">("specs")
  const toastTimer = React.useRef<number | null>(null)

  const [zoomStyle, setZoomStyle] = React.useState<React.CSSProperties>({
    transform: "scale(1)",
    transformOrigin: "center center"
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({
      transform: "scale(1.8)",
      transformOrigin: `${x}% ${y}%`,
      transition: "transform 0.1s ease-out, transform-origin 0.05s ease-out"
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center center",
      transition: "transform 0.2s ease-in-out"
    })
  }

  const activeImage = product.gallery[galleryIndex] ?? product.image
  const discount = discountFor(product)
  const relatedProducts = getRelatedProducts(product)
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  const showToast = (message: string) => {
    setToast(message)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(""), 2600)
  }

  const addToCart = (item: Product, amount = 1) => {
    if (item.soldOut) return

    setCartItems((items) => {
      const existing = items.find((cartItem) => cartItem.id === item.id)

      if (existing) {
        return items.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + amount }
            : cartItem
        )
      }

      return [...items, { ...item, quantity: amount }]
    })

    setCartOpen(true)
    showToast(`${item.name.split(" ").slice(0, 3).join(" ")} added to cart`)
  }

  const updateCart = (productId: string, amount: number) => {
    setCartItems((items) =>
      amount <= 0
        ? items.filter((item) => item.id !== productId)
        : items.map((item) =>
            item.id === productId ? { ...item, quantity: amount } : item
          )
    )
  }

  return (
    <main className="min-h-screen bg-[#fbfbfa] text-[#101322]">
      <StorefrontHeader
        totalItems={totalItems}
        onLoginOpen={() => setLoginOpen(true)}
      />

      <div className="mx-auto max-w-7xl px-4 py-6">
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#f97316]">
            Home
          </Link>
          <ChevronRight className="size-4" />
          <span>{product.category}</span>
          <ChevronRight className="size-4" />
          <span className="line-clamp-1 text-[#101322]">{product.name}</span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="grid gap-4 md:grid-cols-[80px_1fr]">
            <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col">
              {product.gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setGalleryIndex(index)}
                  className={cn(
                    "grid size-20 shrink-0 place-items-center rounded-[8px] border bg-white transition",
                    galleryIndex === index
                      ? "border-[#f97316] shadow-sm"
                      : "border-[#eeeeef] hover:border-[#f97316]/40"
                  )}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
            <div className="order-1 rounded-[12px] bg-[#f5f5f6] p-5 md:order-2 border border-[#ececf1]">
              <div 
                className="relative overflow-hidden rounded-[8px] bg-white cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.24 }}
                    className="grid min-h-[420px] place-items-center"
                  >
                    <img
                      src={activeImage}
                      alt={product.name}
                      style={zoomStyle}
                      className="h-full max-h-[460px] w-full object-contain p-8"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-600">
                <div className="rounded-[8px] bg-white p-3">
                  <PackageCheck className="mx-auto mb-1 size-4 text-[#f97316]" />
                  7 days refund
                </div>
                <div className="rounded-[8px] bg-white p-3">
                  <ShieldCheck className="mx-auto mb-1 size-4 text-[#f97316]" />
                  1 year warranty
                </div>
                <div className="rounded-[8px] bg-white p-3">
                  <Truck className="mx-auto mb-1 size-4 text-[#f97316]" />
                  Express delivery
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-bold text-[#f97316]">
              (Be First to review){" "}
              <Star className="inline size-4 fill-[#f97316] text-[#f97316]" />
            </p>
            <h1 className="max-w-3xl text-3xl font-black leading-tight md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              {product.description}
            </p>

            <div className="mt-5 flex flex-wrap items-end gap-3">
              <span className="text-3xl font-black text-[#2b0f52]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discount && (
                <Badge className="rounded-[6px] bg-[#f97316] text-white">
                  {discount}% OFF
                </Badge>
              )}
            </div>

            <div className="mt-6">
              <p className="text-sm font-bold">Color: {selectedColor}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "rounded-[8px] border px-3 py-2 text-sm font-semibold",
                      selectedColor === color
                        ? "border-[#2b0f52] bg-[#f5f2ff] text-[#2b0f52]"
                        : "border-[#eeeeef] bg-white text-slate-600"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-[8px] border border-[#eeeeef] bg-white">
              <div className="border-b px-4 py-3 text-sm font-black">
                Key Specs
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                {product.specs.map((spec) => (
                  <p key={spec} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-[#f97316]" />
                    {spec}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[8px] bg-[#fff6ed] p-4">
                <PackageCheck className="mb-3 size-5 text-[#f97316]" />
                <p className="font-black">Store Pickup</p>
                <p className="text-sm text-slate-500">
                  Available today at {PLATFORM_NAME}
                </p>
              </div>
              <div className="rounded-[8px] bg-[#fff6ed] p-4">
                <Truck className="mb-3 size-5 text-[#f97316]" />
                <p className="font-black">Express Delivery</p>
                <p className="text-sm text-slate-500">
                  Inside valley within 2-3 hours
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="flex h-12 w-full items-center justify-between rounded-[8px] border border-[#dddddf] bg-white px-3 sm:w-36">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="grid size-8 place-items-center rounded-[8px] hover:bg-[#f5f5f6]"
                >
                  <Minus className="size-4" />
                </button>
                <span className="font-black">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="grid size-8 place-items-center rounded-[8px] hover:bg-[#f5f5f6]"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <Button
                type="button"
                onClick={() => addToCart(product, quantity)}
                className="h-12 flex-1 rounded-[8px] bg-[#ef0f63] text-white hover:bg-[#f97316]"
              >
                <ShoppingCart className="size-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[12px] border border-[#ececf1] bg-white overflow-hidden shadow-sm">
            <div className="flex flex-wrap gap-2 border-b p-3 bg-slate-50">
              <button
                type="button"
                onClick={() => setDetailTab("specs")}
                className={cn(
                  "rounded-[8px] px-4 py-2 text-sm font-bold transition",
                  detailTab === "specs"
                    ? "bg-[#101322] text-white"
                    : "bg-[#f5f5f6] text-slate-600 hover:bg-[#ececf1]"
                )}
              >
                Full Specifications
              </button>
              <button
                type="button"
                onClick={() => setDetailTab("description")}
                className={cn(
                  "rounded-[8px] px-4 py-2 text-sm font-bold transition",
                  detailTab === "description"
                    ? "bg-[#101322] text-white"
                    : "bg-[#f5f5f6] text-slate-600 hover:bg-[#ececf1]"
                )}
              >
                Product Description
              </button>
            </div>
            <div className="p-5 text-sm">
              {detailTab === "specs" ? (
                <div className="divide-y divide-slate-100">
                  {[
                    ["Brand", product.brand],
                    ["Model", product.name],
                    ["Color", selectedColor],
                    ["Category", product.category],
                    ["Warranty", "1 Year"],
                    ["Price in Nepal", formatPrice(product.price)],
                  ].map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[180px_1fr] gap-4 py-3.5">
                      <span className="font-bold text-slate-500">{label}</span>
                      <span className="text-slate-800 font-semibold">{value}</span>
                    </div>
                  ))}
                  {product.specs.map((spec, index) => (
                    <div key={spec} className="grid grid-cols-[180px_1fr] gap-4 py-3.5">
                      <span className="font-bold text-slate-500">
                        Specification {index + 1}
                      </span>
                      <span className="text-slate-850">{spec}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="leading-relaxed text-slate-700 py-2 space-y-4">
                  <h3 className="font-black text-xl text-[#101322]">{product.name}</h3>
                  <p className="text-slate-600">{product.description}</p>
                  <div className="p-4 rounded-[8px] bg-slate-50 border border-slate-100 text-xs text-slate-500 font-semibold">
                    All products sold are 100% genuine with official brands warranty. Store pickup is available from our Kathmandu location.
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="rounded-[8px] border border-[#eeeeef] bg-white p-4">
            <h2 className="mb-4 font-black">People also buy these</h2>
            <div className="space-y-3">
              {relatedProducts.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="flex gap-3 rounded-[8px] p-2 transition hover:bg-[#fff6ed]"
                >
                  <span className="grid size-16 shrink-0 place-items-center rounded-[8px] bg-[#f5f5f6]">
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-contain p-2"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-sm font-bold">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-sm font-black text-[#2b0f52]">
                      {formatPrice(item.price)}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <section className="py-12">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black tracking-tight">
              Similar Products
            </h2>
            <Link
              href="/#products"
              className="text-sm font-bold text-[#2b0f52] hover:text-[#f97316]"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} onAdd={addToCart} />
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onUpdateQuantity={updateCart}
      />
      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      {/* Sticky Bottom Product Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md p-3 shadow-2xl md:py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-2 md:px-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden size-11 shrink-0 place-items-center rounded-[8px] bg-[#f5f5f6] p-1.5 sm:grid border border-slate-200/50">
              <img
                src={product.image}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="line-clamp-1 text-sm font-black text-[#101322] md:text-base">
                {product.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm font-black text-[#f97316]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-[10px] text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden items-center justify-between rounded-[8px] border border-[#dddddf] bg-white px-2.5 h-10 w-28 sm:flex">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="grid size-6 place-items-center rounded-[6px] hover:bg-[#f5f5f6] text-slate-500 transition"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="text-xs font-black">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                className="grid size-6 place-items-center rounded-[6px] hover:bg-[#f5f5f6] text-slate-500 transition"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
            <Button
              type="button"
              onClick={() => addToCart(product, quantity)}
              className="h-10 px-5 rounded-[8px] bg-[#ef0f63] text-white hover:bg-[#f97316] text-xs font-black shadow-md shadow-rose-500/10 transition"
            >
              <ShoppingCart className="size-3.5 mr-1.5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

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

      <AnimatePresence>
        {botOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-36 right-5 z-40 w-80 rounded-[12px] bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-700 p-5 text-white shadow-2xl border border-white/10"
          >
            <button
              onClick={() => setBotOpen(false)}
              className="absolute right-3 top-3 text-white/80 hover:text-white text-lg font-bold"
            >
              &times;
            </button>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-orange-200">Welcome by our bot</p>
            <p className="mt-1 text-sm font-bold leading-snug">Read FAQ/Chat on Whatsapp, reply active</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => window.open("https://wa.me/9800000000", "_blank")}
        className="fixed bottom-20 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba5a] transition duration-200"
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
