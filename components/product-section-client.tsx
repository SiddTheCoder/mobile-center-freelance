"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, ArrowRight, Smartphone, Search, Filter } from "lucide-react"

import { CartSheet } from "@/components/cart-sheet"
import { LoginDialog } from "@/components/login-dialog"
import { ProductCard } from "@/components/product-card"
import { SiteFooter } from "@/components/site-footer"
import { StorefrontHeader } from "@/components/storefront-header"
import { Input } from "@/components/ui/input"
import { CART_STORAGE_KEY } from "@/lib/platform"
import {
  formatPrice,
  productSections,
  type CartItem,
  type Product,
  type ProductSection,
} from "@/lib/products"
import { cn } from "@/lib/utils"

type ProductSectionClientProps = {
  section: ProductSection
  sectionProducts: Product[]
}

export function ProductSectionClient({
  section,
  sectionProducts,
}: ProductSectionClientProps) {
  const [cartOpen, setCartOpen] = React.useState(false)
  const [loginOpen, setLoginOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<"login" | "signup">("login")
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [toast, setToast] = React.useState("")
  const toastTimer = React.useRef<number | null>(null)

  // Filter States
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([])
  const [brandSearch, setBrandSearch] = React.useState("")
  const [minPrice, setMinPrice] = React.useState<number>(0)
  const [maxPrice, setMaxPrice] = React.useState<number>(300000)
  const [priceRanges, setPriceRanges] = React.useState<string[]>([])

  // Reset filters on section change
  React.useEffect(() => {
    setSelectedBrands([])
    setBrandSearch("")
    setMinPrice(0)
    setMaxPrice(300000)
    setPriceRanges([])
  }, [section.slug])

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(CART_STORAGE_KEY)
        if (saved) setCartItems(JSON.parse(saved))
      } catch {}
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  const allSectionBrands = React.useMemo(() => {
    return Array.from(new Set(sectionProducts.map((p) => p.brand)))
  }, [sectionProducts])

  const filteredProducts = React.useMemo(() => {
    return sectionProducts.filter((product) => {
      // Brand match
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false
      }
      // Price slider match
      if (product.price < minPrice || product.price > maxPrice) {
        return false
      }
      // Price ranges match
      if (priceRanges.length > 0) {
        const matchesRange = priceRanges.some((range) => {
          if (range === "under-10k") return product.price < 10000
          if (range === "10k-50k") return product.price >= 10000 && product.price <= 50000
          if (range === "50k-100k") return product.price >= 50000 && product.price <= 100000
          if (range === "100k-200k") return product.price >= 100000 && product.price <= 200000
          if (range === "above-200k") return product.price > 200000
          return false
        })
        if (!matchesRange) return false
      }
      return true
    })
  }, [sectionProducts, selectedBrands, minPrice, maxPrice, priceRanges])

  const totalItems = React.useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  )
  const startingPrice = React.useMemo(
    () =>
      sectionProducts.reduce(
        (lowest, product) => Math.min(lowest, product.price),
        Number.POSITIVE_INFINITY
      ),
    [sectionProducts]
  )

  const showToast = (message: string) => {
    setToast(message)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(""), 2600)
  }

  const persistCart = (items: CartItem[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }

  const addToCart = (product: Product) => {
    if (product.soldOut) return

    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id)
      const nextItems = existing
        ? items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...items, { ...product, quantity: 1 }]

      persistCart(nextItems)
      return nextItems
    })

    setCartOpen(true)
    showToast(`${product.name.split(" ").slice(0, 3).join(" ")} added to cart`)
  }

  const updateCart = (productId: string, quantity: number) => {
    setCartItems((items) => {
      const nextItems =
        quantity <= 0
          ? items.filter((item) => item.id !== productId)
          : items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            )

      persistCart(nextItems)
      return nextItems
    })
  }

  return (
    <main className="min-h-screen bg-[#fbfbfa] text-[#101322]">
      <StorefrontHeader
        totalItems={totalItems}
        onLoginOpen={() => setLoginOpen(true)}
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[16px] border border-slate-100 bg-white shadow-sm"
        >
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_240px] md:p-8 items-center">
            <div className="min-w-0">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-black text-[#2b0f52] transition hover:text-[#f97316]"
              >
                <ArrowLeft className="size-4" />
                Back to store
              </Link>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#f97316]">
                {section.eyebrow}
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
                {section.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
                {section.description}
              </p>
            </div>

            <div className="rounded-[12px] bg-[#101322] p-4.5 text-white border border-slate-800 shadow-sm">
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                <span className="text-xs font-bold text-slate-400">Available Models</span>
                <span className="text-sm font-black text-[#f97316]">{sectionProducts.length}</span>
              </div>
              <div className="pt-2.5">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Starting Price</span>
                <span className="text-lg font-black text-white mt-0.5 block">
                  {Number.isFinite(startingPrice) ? formatPrice(startingPrice) : "-"}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#ececf1] px-6 py-4 md:px-8 bg-slate-50/50">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {productSections.map((filter) => (
                <Link
                  key={filter.slug}
                  href={`/section/${filter.slug}`}
                  className={cn(
                    "inline-flex h-10 shrink-0 items-center gap-2 rounded-[8px] border px-4 text-sm font-black transition",
                    section.slug === filter.slug
                      ? "border-[#f97316] bg-[#fff6ed] text-[#f97316] shadow-sm"
                      : "border-[#e9e9ee] bg-white text-slate-600 hover:border-[#f97316]/50 hover:text-[#101322]"
                  )}
                >
                  {filter.label}
                  {section.slug === filter.slug && <ArrowRight className="size-4" />}
                </Link>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Main Content Layout with Filters */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Left Sidebar Filters */}
          <aside className="space-y-6">
            {/* Brand Filter */}
            {allSectionBrands.length > 1 && (
              <div className="rounded-[12px] border border-[#ececf1] bg-white p-5 shadow-sm">
                <h3 className="text-sm font-black text-[#101322] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Filter className="size-4 text-[#f97316]" />
                  Brands
                </h3>
                <div className="relative mb-3">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    placeholder="Search brand..."
                    className="h-9 rounded-[8px] border-[#e3e3e7] bg-white pl-8 text-xs focus-visible:border-[#f97316] focus-visible:ring-[#f97316]/20"
                  />
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {allSectionBrands
                    .filter((b) => b.toLowerCase().includes(brandSearch.toLowerCase()))
                    .map((brand) => {
                      const isChecked = selectedBrands.includes(brand)
                      return (
                        <label
                          key={brand}
                          className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 hover:text-[#101322] cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              setSelectedBrands((prev) =>
                                prev.includes(brand)
                                  ? prev.filter((b) => b !== brand)
                                  : [...prev, brand]
                              )
                            }}
                            className="rounded border-[#dddddf] text-[#f97316] focus:ring-[#f97316]/20 cursor-pointer"
                          />
                          {brand}
                        </label>
                      )
                    })}
                </div>
              </div>
            )}

            {/* Price Filter */}
            <div className="rounded-[12px] border border-[#ececf1] bg-white p-5 shadow-sm">
              <h3 className="text-sm font-black text-[#101322] uppercase tracking-wider mb-4">
                Price Range
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400">Min</span>
                    <Input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="h-9 text-xs rounded-[8px] border-[#e3e3e7]"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400">Max</span>
                    <Input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="h-9 text-xs rounded-[8px] border-[#e3e3e7]"
                    />
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  {[
                    { label: "Under Rs. 10k", value: "under-10k" },
                    { label: "Rs. 10k - Rs. 50k", value: "10k-50k" },
                    { label: "Rs. 50k - Rs. 1 Lakh", value: "50k-100k" },
                    { label: "Rs. 1 Lakh - Rs. 2 Lakh", value: "100k-200k" },
                    { label: "Above Rs. 2 Lakh", value: "above-200k" },
                  ].map((range) => {
                    const isChecked = priceRanges.includes(range.value)
                    return (
                      <label
                        key={range.value}
                        className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 hover:text-[#101322] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            setPriceRanges((prev) =>
                              prev.includes(range.value)
                                ? prev.filter((r) => r !== range.value)
                                : [...prev, range.value]
                            )
                          }}
                          className="rounded border-[#dddddf] text-[#f97316] focus:ring-[#f97316]/20 cursor-pointer"
                        />
                        {range.label}
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-black text-slate-500 uppercase tracking-wider">
                Showing {filteredProducts.length} models
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} onAdd={addToCart} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-20 rounded-[12px] border border-dashed border-[#ececf1] bg-white">
                <p className="text-sm font-semibold text-slate-400">
                  No products match the selected filters.
                </p>
              </div>
            )}
          </div>
        </div>
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

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="fixed bottom-6 right-5 z-50 max-w-xs rounded-[8px] bg-[linear-gradient(135deg,#f97316,#5531d4)] p-4 text-sm font-bold text-white shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
