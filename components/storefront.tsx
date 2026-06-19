"use client"

import * as React from "react"
import Link from "next/link"
import Lenis from "lenis"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  ArrowRight,
  BadgePercent,
  Calculator,
  Camera,
  Cpu,
  FileText,
  Gamepad2,
  Headphones,
  IdCard,
  Keyboard,
  MessageCircle,
  Mouse,
  Smartphone,
  Speaker,
  Timer,
  Tv,
  Watch,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { CartSheet } from "@/components/cart-sheet"
import { LoginDialog } from "@/components/login-dialog"
import { ProductCard } from "@/components/product-card"
import { SiteFooter } from "@/components/site-footer"
import { StorefrontHeader } from "@/components/storefront-header"
import { CART_STORAGE_KEY } from "@/lib/platform"
import { cn } from "@/lib/utils"
import {
  formatPrice,
  getProductById,
  getPhoneProducts,
  getProductsForSection,
  phoneBrandFilters,
  products,
  type CartItem,
  type Product,
} from "@/lib/products"

const productImage = (id: string) =>
  getProductById(id)?.image ??
  "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_fc51d7952f_5e8b3ea510d43dbe.png"

const heroSlides = [
  {
    eyebrow: "EMI starting at 0%",
    title: "Xiaomi 17 Ultra",
    copy: "Real Nepal listing, flagship performance, and a clean EMI estimate for premium buyers.",
    priceDetails: {
      total: "Rs. 199,999/-",
      downPayment: "Rs. 80,000/-",
      emi: "Rs. 13,334/-"
    },
    price: "0% Interest",
    image: productImage("xiaomi-17-ultra"),
    href: "/product/xiaomi-17-ultra",
    tone: "from-slate-100 via-slate-100 to-slate-200",
    isLight: true,
  },
  {
    eyebrow: "Accessories",
    title: "REAL ACCESSORY PICKS",
    copy: "Chargers, earbuds, and smart wearables from the current Nepal research batch.",
    price: "From Rs. 2,499",
    image: productImage("cmf-watch-pro-3"),
    href: "/section/tech-accessories",
    tone: "from-[#ea580c] via-[#ec4899] to-[#6d28d9]",
    isLight: false,
  },
]

const promoSlides = [
  {
    badge: "Flagship Phone",
    title: "iPhone 17 Pro Max",
    subtitle: "A19 Pro · 48MP Pro Fusion · Titanium",
    price: "Rs. 247,999",
    highlight: "Same day pickup available",
    image: productImage("apple-iphone-17-pro-max"),
    href: "/product/apple-iphone-17-pro-max",
    gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
    accentColor: "text-blue-400",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    glowColor: "bg-blue-500/10",
  },
  {
    badge: "Best Seller",
    title: "Samsung Galaxy S26 Ultra",
    subtitle: "Snapdragon 8 Elite · 200MP · Galaxy AI",
    price: "Rs. 202,999",
    highlight: "Real Nepal price checked",
    image: productImage("samsung-galaxy-s26-ultra"),
    href: "/product/samsung-galaxy-s26-ultra",
    gradient: "from-[#0f3426] via-[#1a4731] to-[#061812]",
    accentColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    glowColor: "bg-emerald-500/10",
  },
  {
    badge: "Performance Pick",
    title: "OnePlus 15",
    subtitle: "16GB RAM · 512GB storage · Flagship",
    price: "Rs. 169,999",
    highlight: "High-end Android option",
    image: productImage("oneplus-15"),
    href: "/product/oneplus-15",
    gradient: "from-[#2d1b69] via-[#1e1145] to-[#0d0a1a]",
    accentColor: "text-purple-400",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    glowColor: "bg-purple-500/10",
  },
  {
    badge: "Midrange Pick",
    title: "Redmi Note 15 Pro",
    subtitle: "8GB RAM · 256GB storage · New arrival",
    price: "Rs. 53,999",
    highlight: "Strong value phone",
    image: productImage("redmi-note-15-pro"),
    href: "/product/redmi-note-15-pro",
    gradient: "from-[#1a1a1a] via-[#2d2d2d] to-[#0a0a0a]",
    accentColor: "text-amber-400",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    glowColor: "bg-amber-500/10",
  },
  {
    badge: "Smart Accessory",
    title: "CMF Watch Pro 3",
    subtitle: "Smartwatch · Color variants · Nepal listing",
    price: "Rs. 13,999",
    highlight: "Accessory pick",
    image: productImage("cmf-watch-pro-3"),
    href: "/product/cmf-watch-pro-3",
    gradient: "from-[#1c1917] via-[#292524] to-[#0c0a09]",
    accentColor: "text-orange-400",
    badgeBg: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    glowColor: "bg-orange-500/10",
  },
]

const categoryPills = [
  { name: "iPhone", icon: Smartphone },
  { name: "Samsung", icon: Smartphone },
  { name: "OnePlus", icon: Smartphone },
  { name: "Xiaomi", icon: Smartphone },
  { name: "Nothing", icon: Smartphone },
  { name: "Smart Phone", icon: Smartphone },
  { name: "Earbuds", icon: Headphones },
]

const shopTiles = [
  { name: "Apple", image: productImage("apple-iphone-17-pro-max"), slug: "iphone" },
  { name: "Samsung", image: productImage("samsung-galaxy-s26-ultra"), slug: "samsung" },
  { name: "OnePlus", image: productImage("oneplus-15"), slug: "oneplus" },
  { name: "Nothing", image: productImage("nothing-phone-3"), slug: "nothing" },
  { name: "Redmi", image: productImage("redmi-note-15-pro"), slug: "redmi" },
  { name: "Xiaomi", image: productImage("xiaomi-17-ultra"), slug: "xiaomi" },
  { name: "POCO", image: productImage("poco-f8-pro"), slug: "poco" },
  { name: "OPPO", image: productImage("oppo-find-n5"), slug: "oppo" },
  { name: "vivo", image: productImage("vivo-x300-pro"), slug: "vivo" },
  { name: "realme", image: productImage("realme-15-pro"), slug: "realme" },
  { name: "Infinix", image: productImage("infinix-gt-30-pro"), slug: "infinix" },
  { name: "Motorola", image: productImage("motorola-edge-50-fusion"), slug: "motorola" },
  { name: "Earbuds", image: productImage("samsung-galaxy-buds-fe"), slug: "audio" },
  { name: "Accessories", image: productImage("cmf-watch-pro-3"), slug: "tech-accessories" },
]

const blogCards = [
  {
    title: "iPhone 17 Pro Max price in Nepal and key buying notes",
    image: productImage("apple-iphone-17-pro-max"),
    tag: "Buying guide",
  },
  {
    title: "Samsung Galaxy S26 Ultra price in Nepal",
    image: productImage("samsung-galaxy-s26-ultra"),
    tag: "Phones",
  },
  {
    title: "OnePlus 15 vs Xiaomi 17 Ultra: flagship picks",
    image: productImage("oneplus-15"),
    tag: "Android",
  },
  {
    title: "Earbuds and smart accessories available in Nepal",
    image: productImage("cmf-watch-pro-3"),
    tag: "Accessories",
  },
]

const emiDocuments = [
  "Nepali citizenship card",
]

const emiTermOptions = [6, 9, 12, 18]

function productMatchesCategory(product: Product, category: string) {
  if (category === "iPhone") {
    return product.category === "Smart Phone" && product.brand === "Apple"
  }

  return product.category === category || product.brand === category
}

function RevealSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

function SectionTitle({
  eyebrow,
  title,
  action,
  actionHref = "#products",
}: {
  eyebrow?: string
  title: string
  action?: string
  actionHref?: string
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#f97316]">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-black tracking-tight text-[#101322] md:text-3xl">
          {title}
        </h2>
      </div>
      {action && (
        <Link
          href={actionHref}
          className="hidden items-center gap-1 text-sm font-semibold text-[#2b0f52] transition hover:text-[#f97316] sm:flex"
        >
          {action}
          <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  )
}

function ProductShelf({
  items,
  onAdd,
  compact = false,
}: {
  items: Product[]
  onAdd: (product: Product) => void
  compact?: boolean
}) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
      {items.map((product) => (
        <div
          key={product.id}
          className="shrink-0 w-[180px] sm:w-[200px] lg:w-[220px]"
        >
          <ProductCard product={product} compact={compact} onAdd={onAdd} />
        </div>
      ))}
    </div>
  )
}

export default function Storefront() {
  const shouldReduceMotion = useReducedMotion()
  const [currentHero, setCurrentHero] = React.useState(0)
  const [currentPromo, setCurrentPromo] = React.useState(0)
  const [activeCategory, setActiveCategory] = React.useState("Smart Phone")
  const [activePhoneBrand, setActivePhoneBrand] = React.useState("smart-phones")
  const [arrivalTab, setArrivalTab] = React.useState("Smart Phone")
  const [cartOpen, setCartOpen] = React.useState(false)
  const [loginOpen, setLoginOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<"login" | "signup">("login")
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [emiOpen, setEmiOpen] = React.useState(false)
  const [emiCustomerName, setEmiCustomerName] = React.useState("")
  const [emiPhone, setEmiPhone] = React.useState("")
  const [emiProductPrice, setEmiProductPrice] = React.useState("89999")
  const [emiDownPayment, setEmiDownPayment] = React.useState("36000")
  const [emiMonths, setEmiMonths] = React.useState(9)
  const [toast, setToast] = React.useState("")
  const [botOpen, setBotOpen] = React.useState(false)
  const toastTimer = React.useRef<number | null>(null)

  React.useEffect(() => {
    const dismissedAt = localStorage.getItem("wa_popup_dismissed_at")
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10)
      if (elapsed > 3600000) {
        setBotOpen(true)
      } else {
        setBotOpen(false)
      }
    } else {
      setBotOpen(true)
    }
  }, [])

  React.useEffect(() => {
    const lenis = new Lenis({
      anchors: true,
      autoRaf: true,
      duration: 1.08,
      smoothWheel: true,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  // Load cart from localStorage on mount
  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(CART_STORAGE_KEY)
        if (saved) setCartItems(JSON.parse(saved))
      } catch {}
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    if (shouldReduceMotion) return
    const interval = window.setInterval(() => {
      setCurrentHero((slide) => (slide + 1) % heroSlides.length)
    }, 5200)
    return () => window.clearInterval(interval)
  }, [shouldReduceMotion])

  React.useEffect(() => {
    if (shouldReduceMotion) return
    const interval = window.setInterval(() => {
      setCurrentPromo((i) => (i + 1) % promoSlides.length)
    }, 4000)
    return () => window.clearInterval(interval)
  }, [shouldReduceMotion])

  const totalItems = React.useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  )

  const emiPrice = Math.max(0, Number(emiProductPrice) || 0)
  const emiMinimumDownPayment = Math.ceil(emiPrice * 0.4)
  const emiPaidDownPayment = Math.min(
    emiPrice,
    Math.max(0, Number(emiDownPayment) || 0)
  )
  const emiShortfall = Math.max(emiMinimumDownPayment - emiPaidDownPayment, 0)
  const emiFinanceAmount = Math.max(emiPrice - emiPaidDownPayment, 0)
  const emiMonthlyPayment =
    emiMonths > 0 ? Math.ceil(emiFinanceAmount / emiMonths) : 0
  const activePhoneFilter =
    phoneBrandFilters.find((filter) => filter.slug === activePhoneBrand) ??
    phoneBrandFilters[0]
  const phoneRowProducts = React.useMemo(
    () => getPhoneProducts(activePhoneFilter.brand).slice(0, 12),
    [activePhoneFilter.brand]
  )
  const featuredShelfProducts = getProductsForSection("featured-phones").slice(0, 12)
  const accessoryShelfProducts = getProductsForSection("tech-accessories").slice(0, 12)
  const worldCupProducts = getProductsForSection("world-cup")
  const dealProducts = getProductsForSection("deals").slice(0, 12)

  const categoryProducts = React.useMemo(
    () => {
      const matchingProducts = products.filter((product) =>
        productMatchesCategory(product, activeCategory)
      )

      return matchingProducts
        .concat(
          products.filter(
            (product) =>
              !matchingProducts.some((match) => match.id === product.id)
          )
        )
        .slice(0, 12)
    },
    [activeCategory]
  )

  const arrivalProducts = React.useMemo(
    () => {
      const matchingProducts = products.filter((product) =>
        productMatchesCategory(product, arrivalTab)
      )

      return matchingProducts
        .concat(
          products.filter(
            (product) =>
              !matchingProducts.some((match) => match.id === product.id)
          )
        )
        .slice(0, 12)
    },
    [arrivalTab]
  )

  const showToast = (message: string) => {
    setToast(message)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(""), 2600)
  }

  const updateEmiPrice = (value: string) => {
    setEmiProductPrice(value)

    const nextPrice = Number(value)
    if (Number.isFinite(nextPrice)) {
      setEmiDownPayment(String(Math.ceil(Math.max(nextPrice, 0) * 0.4)))
    }
  }

  const addToCart = (product: Product) => {
    if (product.soldOut) return

    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id)
      let newItems: CartItem[]

      if (existing) {
        newItems = items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newItems = [...items, { ...product, quantity: 1 }]
      }

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems))
      return newItems
    })

    setCartOpen(true)
    showToast(`${product.name.split(" ").slice(0, 3).join(" ")} added to cart`)
  }

  const updateCart = (productId: string, quantity: number) => {
    setCartItems((items) =>
      quantity <= 0
        ? items.filter((item) => item.id !== productId)
        : items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
    )
  }

  const activeHero = heroSlides[currentHero]

  return (
    <main id="home" className="min-h-screen bg-[#fbfbfa] text-[#101322]">
      <StorefrontHeader
        totalItems={totalItems}
        onLoginOpen={() => setLoginOpen(true)}
      />

      <div className="mx-auto max-w-7xl px-4 py-5">
        <RevealSection className="grid gap-4 lg:grid-cols-[1fr_330px]">
          <div className={cn("relative min-h-[440px] overflow-hidden rounded-[12px] border border-[#ececf1] transition-all", activeHero.isLight ? "bg-slate-100" : "bg-[#111827]")}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHero}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.45 }}
                className={cn(
                  "absolute inset-0 bg-gradient-to-br",
                  activeHero.tone
                )}
              />
            </AnimatePresence>
            <div className="relative z-10 grid h-full min-h-[440px] items-center gap-8 p-6 md:grid-cols-[1fr_0.9fr] md:p-10">
              <div className={cn("space-y-4", activeHero.isLight ? "text-[#101322]" : "text-white")}>
                <Badge className={cn("rounded-[6px] px-2.5 py-1 text-xs font-bold", activeHero.isLight ? "bg-slate-800/10 text-slate-800 ring-1 ring-slate-800/20" : "bg-white/15 text-white ring-1 ring-white/25")}>
                  {activeHero.eyebrow}
                </Badge>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHero.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h1 className="text-3xl font-black leading-[1.1] tracking-tight md:text-5xl">
                      {activeHero.title}
                    </h1>
                    <p className={cn("mt-3 text-sm leading-relaxed", activeHero.isLight ? "text-slate-600" : "text-white/80")}>
                      {activeHero.copy}
                    </p>
                    
                    {activeHero.priceDetails && (
                      <div className="mt-5 grid grid-cols-3 gap-2 border border-slate-200/60 bg-white/60 p-3 rounded-[8px] backdrop-blur-sm text-[#101322] text-xs">
                        <div>
                          <span className="block text-[9px] uppercase font-bold text-slate-500">Total Price</span>
                          <span className="font-extrabold text-slate-900 text-sm">{activeHero.priceDetails.total}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] uppercase font-bold text-slate-500">40% Down</span>
                          <span className="font-extrabold text-[#f97316] text-sm">{activeHero.priceDetails.downPayment}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] uppercase font-bold text-slate-500">9 Mo. EMI</span>
                          <span className="font-extrabold text-slate-900 text-sm">{activeHero.priceDetails.emi}</span>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        href={activeHero.href}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#f97316] px-5 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-[#ea580c]"
                      >
                        Shop now
                        <ArrowRight className="size-4" />
                      </Link>
                      <span className={cn("text-lg font-black", activeHero.isLight ? "text-slate-800" : "text-[#fed7aa]")}>
                        {activeHero.price}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <motion.div
                key={activeHero.image}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center rounded-[12px] bg-white/20 border border-white/10 shadow-lg"
              >
                <img
                  src={activeHero.image}
                  alt=""
                  className="h-full w-full object-contain p-4 drop-shadow-2xl"
                />
                <div className="absolute -bottom-3 left-4 rounded-[8px] bg-white px-3.5 py-2 text-[#101322] shadow-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Genuine warranty
                  </p>
                  <p className="text-xs font-black">Same day pickup</p>
                </div>
              </motion.div>
            </div>
            <div className="absolute bottom-4 left-6 z-20 flex gap-1.5">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setCurrentHero(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    index === currentHero
                      ? "w-7 bg-white"
                      : "w-1.5 bg-white/45 hover:bg-white/70"
                  )}
                  aria-label={`Show ${slide.title}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Auto-rotating Tech Showcase */}
          <div className="relative overflow-hidden rounded-[12px] min-h-[440px] bg-gradient-to-b from-[#0d0d1a] to-[#111118] border border-white/10">
            {/* Persistent glow backdrop — never animates */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`glow-${currentPromo}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className={cn("absolute right-[-40px] top-[-40px] size-48 rounded-full blur-3xl", promoSlides[currentPromo].glowColor)} />
                <div className={cn("absolute left-[-20px] bottom-[-20px] size-40 rounded-full blur-2xl", promoSlides[currentPromo].glowColor)} />
                <div className={cn("absolute inset-0 bg-gradient-to-b opacity-60", promoSlides[currentPromo].gradient)} />
              </motion.div>
            </AnimatePresence>

            {/* Content that crossfades — opacity only, no layout shift */}
            <div className="relative z-10 flex flex-col justify-between p-6 text-white h-full min-h-[440px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentPromo}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="flex flex-col justify-between flex-1"
                >
                  <div className="space-y-3">
                    <Badge className={cn("rounded-[6px] border font-bold uppercase tracking-wider text-[10px]", promoSlides[currentPromo].badgeBg)}>
                      {promoSlides[currentPromo].badge}
                    </Badge>
                    <h2 className="text-2xl font-black leading-tight tracking-tight text-white mt-2">
                      {promoSlides[currentPromo].title}
                    </h2>
                    <p className="text-slate-300 text-xs font-semibold leading-relaxed">
                      {promoSlides[currentPromo].subtitle}
                    </p>
                  </div>

                  <div className="mx-auto my-4 flex items-center justify-center w-full max-w-[200px] aspect-square rounded-[12px] bg-white/5 border border-white/10">
                    <img
                      src={promoSlides[currentPromo].image}
                      alt={promoSlides[currentPromo].title}
                      className="h-full w-full object-contain p-3 drop-shadow-2xl"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-white">{promoSlides[currentPromo].price}</span>
                      <span className={cn("text-[10px] font-bold uppercase tracking-wider", promoSlides[currentPromo].accentColor)}>
                        {promoSlides[currentPromo].highlight}
                      </span>
                    </div>
                    <Link
                      href={promoSlides[currentPromo].href}
                      className="inline-flex h-10 w-full items-center justify-center rounded-[8px] bg-white text-sm font-extrabold text-[#101322] shadow-lg transition hover:bg-slate-100"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dot indicators — always visible, never animate away */}
              <div className="flex justify-center gap-1.5 pt-3">
                {promoSlides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentPromo(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === currentPromo
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/30 hover:bg-white/60"
                    )}
                    aria-label={`Show ${promoSlides[i].title}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Shop By Categories (Now at the top) */}
        <RevealSection className="py-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tight text-[#101322] md:text-3xl">
              Shop By Categories
            </h2>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#2b0f52] transition hover:text-[#f97316]"
            >
              View All
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {shopTiles.map((tile) => (
              <Link
                key={tile.name}
                href={`/section/${tile.slug}`}
                className="group flex flex-col items-center justify-between rounded-[16px] border border-slate-100/60 bg-[#f5f5f6] p-4 text-center transition-all duration-300 hover:border-[#f97316]/30 hover:bg-[#fffaf4] hover:shadow-md h-[180px]"
              >
                <div className="flex flex-1 items-center justify-center p-2 w-full max-h-[110px] overflow-hidden">
                  <img
                    src={tile.image}
                    alt={tile.name}
                    className="max-h-[90px] max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="mt-2 block text-sm font-bold text-slate-800 transition-colors duration-300 group-hover:text-[#f97316]">
                  {tile.name}
                </span>
              </Link>
            ))}
          </div>
        </RevealSection>

        {/* Trending Categories Now (Now second) */}
        <RevealSection id="products" className="py-10 border-t border-slate-100">
          <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="text-3xl font-black tracking-tight text-[#101322] md:text-4xl">
                Trending Categories Now
              </h2>
              <p className="mt-2 text-sm font-semibold text-slate-500 leading-relaxed">
                Genuine Electronics, Latest Launches, Unmatched Quality, and the Best Market Prices – All in One Click!
              </p>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
              {categoryPills.map((category) => {
                const isActive = activeCategory === category.name
                return (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => setActiveCategory(category.name)}
                    className="flex flex-col items-center gap-2 group focus:outline-none shrink-0"
                  >
                    <div
                      className={cn(
                        "grid size-14 place-items-center rounded-full transition-all duration-300 shadow-sm",
                        isActive
                          ? "bg-[#f97316] text-white scale-105"
                          : "bg-[#f5f5f6] text-[#2b0f52] hover:bg-[#fff6ed] hover:text-[#f97316]"
                      )}
                    >
                      <category.icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span
                      className={cn(
                        "text-xs font-black transition-colors duration-300",
                        isActive ? "text-[#f97316]" : "text-slate-600 hover:text-[#f97316]"
                      )}
                    >
                      {category.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
          <ProductShelf items={categoryProducts} onAdd={addToCart} />
        </RevealSection>

        {/* Latest phones */}
        <RevealSection id="latest-phones" className="py-10 border-t border-slate-100">
          <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#f97316]">
                Latest phones
              </p>
              <h2 className="text-2xl font-black tracking-tight text-[#101322] md:text-3xl">
                Phones by Brand
              </h2>
              <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
                New arrivals from iPhone, Samsung, Infinix, HONOR, Xiaomi,
                OnePlus, OPPO, and vivo.
              </p>
            </div>
            <Link
              href={`/section/${activePhoneFilter.slug}`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-[#101322] px-4 text-sm font-bold text-white transition hover:bg-[#f97316]"
            >
              See all
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mb-5 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {phoneBrandFilters.map((filter) => (
              <motion.button
                key={filter.slug}
                type="button"
                whileHover={{ y: -2 }}
                onClick={() => setActivePhoneBrand(filter.slug)}
                className={cn(
                  "h-10 shrink-0 rounded-[8px] border px-4 text-sm font-black transition",
                  activePhoneBrand === filter.slug
                    ? "border-[#f97316] bg-[#fff6ed] text-[#f97316]"
                    : "border-[#e9e9ee] bg-white text-slate-600 hover:border-[#f97316]/50 hover:text-[#101322]"
                )}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
            {phoneRowProducts.map((product) => (
              <div
                key={product.id}
                className="shrink-0 w-[180px] sm:w-[200px] lg:w-[220px]"
              >
                <ProductCard product={product} onAdd={addToCart} />
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Full-width Teal Banner */}
        <RevealSection className="mt-4 rounded-[12px] bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 p-6 text-white border border-teal-600 shadow-lg shadow-teal-500/5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-teal-100">
                Exclusive Deals
              </p>
              <p className="mt-1 text-2xl font-black">
                BEST DEALS ON SMARTPHONES & TABLETS
              </p>
              <p className="text-teal-50/80 text-sm mt-1">
                Save up to 25% on top flagship devices and entry level smartphones.
              </p>
            </div>
            <Link
              href="/section/deals"
              className="inline-flex h-11 items-center justify-center rounded-[8px] bg-white px-5 text-sm font-bold text-teal-800 shadow-md transition hover:bg-slate-100"
            >
              Shop deals
            </Link>
          </div>
        </RevealSection>

        {/* Featured Phones */}
        <RevealSection className="py-10 border-t border-slate-100">
          <SectionTitle
            eyebrow="Real Nepal prices"
            title="Featured Phones"
            action="See all"
            actionHref="/section/featured-phones"
          />
          <ProductShelf items={featuredShelfProducts} onAdd={addToCart} />
        </RevealSection>

        {/* Tech Accessories & Creator Gear */}
        <RevealSection className="py-10 border-t border-slate-100">
          <SectionTitle
            eyebrow="Setups"
            title="Tech Accessories & Creator Gear"
            action="See all"
            actionHref="/section/tech-accessories"
          />
          <ProductShelf items={accessoryShelfProducts} onAdd={addToCart} />
        </RevealSection>

        {/* Launch Offer Section */}
        <RevealSection className="py-10 border-t border-slate-100">
          <div className="relative overflow-hidden rounded-[12px] bg-gradient-to-r from-[#030b20] via-[#102a5c] to-[#041235] p-6 text-white border border-[#1b3d7a] shadow-xl mb-6">
            <div className="absolute right-0 top-0 h-full w-[40%] bg-[radial-gradient(circle_at_right,rgba(59,130,246,0.15),transparent)] pointer-events-none" />
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400">
                  🏆
                </span>
                <div>
                  <h2 className="text-2xl font-black tracking-tight uppercase text-white">Launch Offer Picks</h2>
                  <p className="text-slate-300 text-sm font-semibold mt-0.5">Real Nepal phones with <span className="text-yellow-400 font-black">BUNDLE READY</span> accessory picks</p>
                </div>
              </div>
              <Link
                href="/section/world-cup"
                className="inline-flex h-10 items-center justify-center rounded-[8px] bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                View all
              </Link>
            </div>
          </div>
          <ProductShelf items={worldCupProducts} onAdd={addToCart} />
        </RevealSection>

        {/* Promo Banners */}
        <RevealSection className="grid gap-4 py-10 md:grid-cols-[1fr_1fr] border-t border-slate-100">
          <div className="rounded-[8px] bg-[#f2edf7] p-6">
            <p className="text-sm font-bold text-[#2b0f52]">The all-new</p>
            <h3 className="text-3xl font-black text-[#101322]">Samsung Galaxy S26 Ultra</h3>
            <p className="mt-2 max-w-sm text-sm text-slate-600">
              Flagship Android phone with the researched Nepal price ready for
              pickup inquiries.
            </p>
            <Link
              href="/section/samsung"
              className="mt-5 inline-flex h-10 items-center justify-center rounded-[8px] bg-[#2b0f52] px-4 text-sm font-bold text-white transition hover:bg-[#f97316]"
            >
              Rs. 202,999
            </Link>
          </div>
          <div className="rounded-[8px] bg-[#160f30] p-6 text-white">
            <p className="text-sm font-bold text-[#f97316]">Best deals on</p>
            <h3 className="text-3xl font-black">OnePlus and Xiaomi flagships</h3>
            <p className="mt-2 max-w-sm text-sm text-white/70">
              Compare real Nepal pricing for performance phones, storage variants,
              and color options.
            </p>
            <Link
              href="/section/smart-phones"
              className="mt-5 inline-flex h-10 items-center justify-center rounded-[8px] bg-[#f97316] px-4 text-sm font-bold text-white transition hover:bg-[#ea580c]"
            >
              Shop phones
            </Link>
          </div>
        </RevealSection>

        <RevealSection id="deals" className="py-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Zap className="size-6 fill-[#f97316] text-[#f97316]" />
              <h2 className="text-2xl font-black tracking-tight">
                Trending Nepal Picks
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-[8px] border border-[#f97316]/35 bg-white px-3 py-2 text-xs font-bold text-[#2b0f52]">
              <Timer className="size-4 text-[#f97316]" />
              Updated
              <span className="rounded-[6px] bg-[#fff6ed] px-2 py-1">Jun</span>
              <span className="rounded-[6px] bg-[#fff6ed] px-2 py-1">19</span>
              <span className="rounded-[6px] bg-[#fff6ed] px-2 py-1">2026</span>
            </div>
          </div>
          <ProductShelf items={dealProducts} onAdd={addToCart} />
        </RevealSection>

        <RevealSection className="rounded-[8px] bg-[#eaf2ff] px-6 py-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2b0f52]">
                Buy now, pay later
              </p>
              <p className="mt-1 text-2xl font-black text-[#101322]">
                40% down payment | 0% interest on selected phones and accessories
              </p>
            </div>
            <Button
              type="button"
              onClick={() => setEmiOpen(true)}
              className="h-11 rounded-[8px] bg-[#f97316] px-5 text-white hover:bg-[#ea580c]"
            >
              Check eligibility
            </Button>
          </div>
        </RevealSection>

        <RevealSection className="py-10">
          <SectionTitle title="New Arrivals at Store" />
          <div className="mb-6 flex gap-2 overflow-x-auto scrollbar-none">
            {["Smart Phone", "iPhone", "Samsung", "OnePlus", "Xiaomi", "Earbuds"].map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setArrivalTab(tab)}
                  className={cn(
                    "h-9 shrink-0 rounded-[8px] px-3 text-sm font-semibold transition",
                    arrivalTab === tab
                      ? "bg-[#2b0f52] text-white"
                      : "bg-white text-slate-600 hover:bg-[#fff6ed] hover:text-[#f97316]"
                  )}
                >
                  {tab}
                </button>
              )
            )}
          </div>
          <ProductShelf items={arrivalProducts} onAdd={addToCart} />
        </RevealSection>

        <RevealSection className="py-8">
          <SectionTitle title="Blogs" action="Read all" />
          <div className="grid gap-4 md:grid-cols-4">
            {blogCards.map((post) => (
              <motion.article
                key={post.title}
                whileHover={{ y: -5 }}
                className="overflow-hidden rounded-[8px] bg-[#101322] text-white"
              >
                <div className="h-40 bg-white/10">
                  <img
                    src={post.image}
                    alt=""
                    className="h-full w-full object-cover opacity-90"
                  />
                </div>
                <div className="p-4">
                  <Badge className="rounded-[6px] bg-[#f97316] text-white">
                    {post.tag}
                  </Badge>
                  <h3 className="mt-3 line-clamp-2 font-bold leading-snug">
                    {post.title}
                  </h3>
                </div>
              </motion.article>
            ))}
          </div>
        </RevealSection>
      </div>

      <SiteFooter />

      <Dialog open={emiOpen} onOpenChange={setEmiOpen}>
        <DialogContent
          className="max-h-[calc(100vh-2rem)] w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-[12px] border border-[#ececf1] bg-white p-0 shadow-2xl sm:max-w-[960px]"
          data-lenis-prevent
        >
          <div className="grid max-h-[calc(100vh-2rem)] overflow-y-auto md:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="bg-[#101322] p-6 text-white md:min-h-[590px]">
              <div className="flex items-center gap-2">
                <span className="grid size-12 place-items-center rounded-[8px] bg-white/10">
                  <FileText className="size-5 text-[#f97316]" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">
                    Required
                  </p>
                  <h3 className="text-lg font-black">Documents</h3>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {emiDocuments.map((document) => (
                  <div
                    key={document}
                    className="flex gap-3 rounded-[8px] border border-white/10 bg-white/[0.06] p-4 text-base font-semibold leading-snug text-white/90"
                  >
                    <IdCard className="mt-0.5 size-4 shrink-0 text-[#f97316]" />
                    <span>{document}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[8px] border border-[#f97316]/30 bg-[#f97316]/10 p-4 text-sm text-orange-50">
                <p className="font-black">Basic rule</p>
                <p className="mt-1 text-white/70">
                  Minimum 40% down payment with 0% interest on selected phones
                  and accessories. Citizenship is enough for the initial
                  eligibility check in Nepal.
                </p>
              </div>
            </aside>

            <div className="min-w-0 p-6 md:p-8">
              <DialogHeader>
                <div className="mb-2 flex items-center gap-2">
                  <BadgePercent className="size-5 text-[#f97316]" />
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-[#f97316]">
                    Buy now, pay later
                  </span>
                </div>
                <DialogTitle className="text-2xl font-black tracking-tight text-[#101322] md:text-3xl">
                  EMI Eligibility
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500">
                  Enter the product price and down payment to calculate your 0%
                  interest monthly EMI.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Full name
                  </label>
                  <Input
                    value={emiCustomerName}
                    onChange={(event) => setEmiCustomerName(event.target.value)}
                    placeholder="Customer name"
                    className="h-11 rounded-[8px] border-[#e3e3e7] bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Phone number
                  </label>
                  <Input
                    type="tel"
                    value={emiPhone}
                    onChange={(event) => setEmiPhone(event.target.value)}
                    placeholder="98XXXXXXXX"
                    className="h-11 rounded-[8px] border-[#e3e3e7] bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Product price
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={emiProductPrice}
                    onChange={(event) => updateEmiPrice(event.target.value)}
                    className="h-11 rounded-[8px] border-[#e3e3e7] bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                      Down payment
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setEmiDownPayment(String(emiMinimumDownPayment))
                      }
                      className="text-xs font-bold text-[#f97316] hover:underline"
                    >
                      Set 40%
                    </button>
                  </div>
                  <Input
                    type="number"
                    min={0}
                    value={emiDownPayment}
                    onChange={(event) => setEmiDownPayment(event.target.value)}
                    className="h-11 rounded-[8px] border-[#e3e3e7] bg-white"
                  />
                </div>
              </div>

              <div className="mt-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Payment period
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {emiTermOptions.map((months) => (
                    <button
                      key={months}
                      type="button"
                      onClick={() => setEmiMonths(months)}
                      className={cn(
                        "h-10 rounded-[8px] border text-sm font-black transition",
                        emiMonths === months
                          ? "border-[#f97316] bg-[#fff6ed] text-[#f97316]"
                          : "border-[#e3e3e7] bg-white text-slate-600 hover:border-[#f97316]/60"
                      )}
                    >
                      {months} mo
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[8px] bg-[#f5f5f6] p-4">
                  <p className="text-xs font-bold text-slate-500">
                    Finance amount
                  </p>
                  <p className="mt-1 text-lg font-black text-[#101322]">
                    {formatPrice(emiFinanceAmount)}
                  </p>
                </div>
                <div className="rounded-[8px] bg-[#fff6ed] p-4">
                  <p className="text-xs font-bold text-slate-500">
                    Monthly EMI
                  </p>
                  <p className="mt-1 text-lg font-black text-[#f97316]">
                    {formatPrice(emiMonthlyPayment)}
                  </p>
                </div>
                <div className="rounded-[8px] bg-[#f5f2ff] p-4">
                  <p className="text-xs font-bold text-slate-500">
                    Interest
                  </p>
                  <p className="mt-1 text-lg font-black text-[#2b0f52]">0%</p>
                </div>
              </div>

              <div
                className={cn(
                  "mt-4 rounded-[8px] border p-4 text-sm font-semibold",
                  emiShortfall === 0
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                )}
              >
                {emiShortfall === 0
                  ? `Down payment requirement met. Minimum needed is ${formatPrice(emiMinimumDownPayment)}.`
                  : `Add ${formatPrice(emiShortfall)} more to meet the 40% down payment requirement.`}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  onClick={() => {
                    showToast("EMI estimate ready. Please bring citizenship for verification.")
                    setEmiOpen(false)
                  }}
                  className="h-11 rounded-[8px] bg-[#101322] px-5 text-white hover:bg-[#f97316]"
                >
                  <Calculator className="size-4" />
                  Save EMI estimate
                </Button>
                <p className="text-xs font-semibold text-slate-400">
                  Final approval depends on document verification and product
                  eligibility.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
            className="fixed bottom-24 right-5 z-40 w-80 rounded-[12px] bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-700 p-5 text-white shadow-2xl border border-white/10"
          >
            <button
              onClick={() => {
                setBotOpen(false)
                localStorage.setItem("wa_popup_dismissed_at", Date.now().toString())
              }}
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
