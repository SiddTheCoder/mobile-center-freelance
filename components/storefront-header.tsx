"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Headphones,
  MapPin,
  Search,
  ShoppingCart,
  Smartphone,
  User,
  Sparkles,
  Wrench,
  Coins,
  RefreshCw,
  type LucideIcon,
} from "lucide-react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PrefetchLink } from "@/components/prefetch-link"
import { SiteLogo } from "@/components/site-logo"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatPrice, products } from "@/lib/products"
import { cn } from "@/lib/utils"

type TopCategory = {
  name: string
  icon: LucideIcon
}

const categories: TopCategory[] = [
  { name: "Apple", icon: Smartphone },
  { name: "Samsung", icon: Smartphone },
  { name: "OnePlus", icon: Smartphone },
  { name: "Nothing", icon: Smartphone },
  { name: "Redmi", icon: Smartphone },
  { name: "Xiaomi", icon: Smartphone },
  { name: "POCO", icon: Smartphone },
  { name: "OPPO", icon: Smartphone },
  { name: "vivo", icon: Smartphone },
  { name: "realme", icon: Smartphone },
  { name: "Infinix", icon: Smartphone },
  { name: "HONOR", icon: Smartphone },
  { name: "Motorola", icon: Smartphone },
  { name: "Smart Phone", icon: Smartphone },
  { name: "Earbuds", icon: Headphones },
  { name: "Accessories", icon: Cpu },
]

type SidebarProduct = {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
}

type SidebarBrand = {
  name: string
  products: SidebarProduct[]
}

type SidebarCategory = {
  name: string
  brands: SidebarBrand[]
}

const rawSidebarCategories: SidebarCategory[] = [
  {
    name: "Smart Phone",
    brands: [
      {
        name: "Flagship Phones",
        products: [
          { id: "apple-iphone-17-pro-max", name: "Apple iPhone 17 Pro Max", price: 247999, image: "" },
          { id: "samsung-galaxy-s26-ultra", name: "Samsung Galaxy S26 Ultra", price: 202999, image: "" },
          { id: "oneplus-15", name: "OnePlus 15", price: 169999, image: "" },
          { id: "xiaomi-17-ultra", name: "Xiaomi 17 Ultra", price: 199999, image: "" }
        ]
      },
      {
        name: "Latest Android",
        products: [
          { id: "nothing-phone-3", name: "Nothing Phone (3)", price: 99999, image: "" },
          { id: "vivo-x300-pro", name: "Vivo X300 Pro", price: 179999, image: "" },
          { id: "oppo-find-n5", name: "Oppo Find N5", price: 249999, image: "" },
          { id: "poco-f8-pro", name: "Poco F8 Pro", price: 99999, image: "" }
        ]
      },
      {
        name: "Value & Midrange",
        products: [
          { id: "redmi-15-4g", name: "Redmi 15 4G", price: 24999, image: "" },
          { id: "redmi-note-15-pro", name: "Redmi Note 15 Pro", price: 53999, image: "" },
          { id: "motorola-g96-5g", name: "Motorola G96 5G", price: 44999, image: "" },
          { id: "infinix-gt-30-pro", name: "Infinix GT 30 Pro", price: 47999, image: "" }
        ]
      }
    ]
  },
  {
    name: "Accessories",
    brands: [
      {
        name: "Chargers & Wearables",
        products: [
          { id: "apple-20watt-usb-c-power-adapter", name: "Apple 20Watt USB-C Power Adapter", price: 4499, image: "" },
          { id: "cmf-watch-pro-3", name: "CMF Watch Pro 3", price: 13999, image: "" }
        ]
      }
    ]
  },
  {
    name: "Earbuds",
    brands: [
      {
        name: "Wireless Buds",
        products: [
          { id: "redmi-buds-6-play", name: "Redmi Buds 6 Play", price: 2499, image: "" },
          { id: "samsung-galaxy-buds-fe", name: "Samsung Galaxy Buds FE", price: 15999, image: "" }
        ]
      }
    ]
  }
]

const featuredPhoneBrands = [
  { name: "Apple", brand: "Apple" },
  { name: "Samsung", brand: "Samsung" },
  { name: "OnePlus", brand: "OnePlus" },
  { name: "Nothing", brand: "Nothing" },
  { name: "Redmi", brand: "Redmi" },
  { name: "Xiaomi", brand: "Xiaomi" },
  { name: "POCO", brand: "POCO" },
  { name: "OPPO", brand: "OPPO" },
  { name: "vivo", brand: "vivo" },
  { name: "realme", brand: "realme" },
  { name: "Infinix", brand: "Infinix" },
  { name: "HONOR", brand: "HONOR" },
  { name: "Motorola", brand: "Motorola" },
]

const catalogById = new Map(products.map((product) => [product.id, product]))
const featuredBrandNames = new Set(
  featuredPhoneBrands.map((item) => item.name.toLowerCase())
)

function toSidebarProduct(product: (typeof products)[number]): SidebarProduct {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
  }
}

function enrichSidebarProduct(product: SidebarProduct): SidebarProduct {
  const catalogProduct = catalogById.get(product.id)

  if (!catalogProduct) return product

  return {
    ...product,
    name: catalogProduct.name,
    price: catalogProduct.price,
    originalPrice: catalogProduct.originalPrice,
    image: catalogProduct.image,
  }
}

const brandSidebarCategories: SidebarCategory[] = featuredPhoneBrands.map(
  (item) => ({
    name: item.name,
    brands: [
      {
        name: `${item.name} latest`,
        products: products
          .filter((product) => product.brand === item.brand)
          .slice(0, 4)
          .map(toSidebarProduct),
      },
    ],
  })
)

const sidebarCategories: SidebarCategory[] = [
  ...rawSidebarCategories
    .filter((item) => !featuredBrandNames.has(item.name.toLowerCase()))
    .map((category) => ({
      ...category,
      brands: category.brands.map((brand) => ({
        ...brand,
        products: brand.products.map(enrichSidebarProduct),
      })),
    })),
  ...brandSidebarCategories,
]

type StorefrontHeaderProps = {
  totalItems: number
  onLoginOpen: () => void
}

export function StorefrontHeader({
  totalItems,
  onLoginOpen,
}: StorefrontHeaderProps) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [megaOpen, setMegaOpen] = React.useState(false)
  const [activeCategory, setActiveCategory] = React.useState("Smart Phone")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchFocused, setSearchFocused] = React.useState(false)
  const [headerVisible, setHeaderVisible] = React.useState(true)
  const [promoVisible, setPromoVisible] = React.useState(true)
  const [featuresOpen, setFeaturesOpen] = React.useState(false)

  // Service Modals State
  const [repairOpen, setRepairOpen] = React.useState(false)
  const [sellOpen, setSellOpen] = React.useState(false)
  const [exchangeOpen, setExchangeOpen] = React.useState(false)

  // Repair Form State
  const [repairBrand, setRepairBrand] = React.useState("Apple")
  const [repairModel, setRepairModel] = React.useState("")
  const [repairIssue, setRepairIssue] = React.useState("Screen Crack")
  const [repairSuccess, setRepairSuccess] = React.useState(false)

  // Sell Form State
  const [sellBrand, setSellBrand] = React.useState("Apple")
  const [sellModel, setSellModel] = React.useState("")
  const [sellCondition, setSellCondition] = React.useState("Good")
  const [sellSuccess, setSellSuccess] = React.useState(false)

  // Exchange Form State
  const [exchangeOldBrand, setExchangeOldBrand] = React.useState("Apple")
  const [exchangeOldModel, setExchangeOldModel] = React.useState("")
  const [exchangeOldCondition, setExchangeOldCondition] = React.useState("Good")
  const [exchangeNewProductId, setExchangeNewProductId] = React.useState(products[0]?.id || "")
  const [exchangeSuccess, setExchangeSuccess] = React.useState(false)

  // Memoized estimates
  const repairEstimate = React.useMemo(() => {
    let base = 3000
    if (repairBrand === "Apple") base = 8000
    else if (repairBrand === "Samsung") base = 6000
    else if (repairBrand === "OnePlus") base = 5000

    let multiplier = 1
    if (repairIssue === "Screen Crack") multiplier = 2.2
    else if (repairIssue === "Battery Replacement") multiplier = 1.0
    else if (repairIssue === "Backglass Crack") multiplier = 1.5
    else if (repairIssue === "Motherboard/Power Issue") multiplier = 3.0
    else multiplier = 0.8

    return Math.round(base * multiplier)
  }, [repairBrand, repairIssue])

  const sellEstimate = React.useMemo(() => {
    let base = 15000
    if (sellBrand === "Apple") base = 75000
    else if (sellBrand === "Samsung") base = 55000
    else if (sellBrand === "OnePlus") base = 40000
    else if (sellBrand === "Xiaomi") base = 25000

    let multiplier = 0.85
    if (sellCondition === "Flawless") multiplier = 1.0
    else if (sellCondition === "Average") multiplier = 0.65
    else if (sellCondition === "Broken") multiplier = 0.3

    return Math.round(base * multiplier)
  }, [sellBrand, sellCondition])

  const exchangeOldValue = React.useMemo(() => {
    let base = 15000
    if (exchangeOldBrand === "Apple") base = 75000
    else if (exchangeOldBrand === "Samsung") base = 55000
    else if (exchangeOldBrand === "OnePlus") base = 40000
    else if (exchangeOldBrand === "Xiaomi") base = 25000

    let multiplier = 0.85
    if (exchangeOldCondition === "Flawless") multiplier = 1.0
    else if (exchangeOldCondition === "Average") multiplier = 0.65
    else if (exchangeOldCondition === "Broken") multiplier = 0.3

    return Math.round(base * multiplier)
  }, [exchangeOldBrand, exchangeOldCondition])

  const exchangeNewPhoneProduct = React.useMemo(() => {
    return products.find((p) => p.id === exchangeNewProductId) || products[0]
  }, [exchangeNewProductId])

  const exchangeOffset = React.useMemo(() => {
    if (!exchangeNewPhoneProduct) return 0
    return Math.max(1000, exchangeNewPhoneProduct.price - exchangeOldValue)
  }, [exchangeNewPhoneProduct, exchangeOldValue])
  const closeMegaTimer = React.useRef<number | null>(null)
  const openMegaTimer = React.useRef<number | null>(null)
  const categoryScrollerRef = React.useRef<HTMLElement | null>(null)
  const lastScrollY = React.useRef(0)
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current
    const delta = latest - previous

    if (Math.abs(delta) < 4) return

    const scrollingDown = delta > 0

    setPromoVisible(latest < 12)

    if (latest < 96) {
      setHeaderVisible(true)
    } else if (scrollingDown && latest > 160) {
      if (openMegaTimer.current) window.clearTimeout(openMegaTimer.current)
      setHeaderVisible(false)
      setMegaOpen(false)
      setSearchFocused(false)
    } else if (!scrollingDown) {
      setHeaderVisible(true)
    }

    lastScrollY.current = latest
  })

  const searchMatches = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return products.slice(0, 5)

    return products
      .filter((product) =>
        [product.name, product.brand, product.category, ...product.specs]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
      .slice(0, 6)
  }, [searchQuery])

  const openMega = (catName?: string) => {
    if (openMegaTimer.current) {
      window.clearTimeout(openMegaTimer.current)
      openMegaTimer.current = null
    }
    if (closeMegaTimer.current) window.clearTimeout(closeMegaTimer.current)
    if (catName) {
      // Normalise to match our sidebarCategories names
      const match = sidebarCategories.find(
        (c) => c.name.toLowerCase() === catName.toLowerCase() || 
               (catName.toLowerCase() === "pc components" && c.name.toLowerCase() === "pc component") ||
               (catName.toLowerCase() === "projector accessories" && c.name.toLowerCase() === "accessories") ||
               (catName.toLowerCase() === "audio" && c.name.toLowerCase() === "headphone")
      )
      if (match) setActiveCategory(match.name)
    }
    setMegaOpen(true)
  }

  const scheduleMegaOpen = (catName?: string) => {
    if (closeMegaTimer.current) window.clearTimeout(closeMegaTimer.current)
    if (openMegaTimer.current) window.clearTimeout(openMegaTimer.current)

    openMegaTimer.current = window.setTimeout(() => {
      openMega(catName)
    }, 120)
  }

  const closeMega = () => {
    if (openMegaTimer.current) {
      window.clearTimeout(openMegaTimer.current)
      openMegaTimer.current = null
    }
    closeMegaTimer.current = window.setTimeout(
      () => setMegaOpen(false),
      140
    )
  }

  React.useEffect(
    () => () => {
      if (openMegaTimer.current) window.clearTimeout(openMegaTimer.current)
      if (closeMegaTimer.current) window.clearTimeout(closeMegaTimer.current)
    },
    []
  )

  const scrollCategories = (direction: -1 | 1) => {
    categoryScrollerRef.current?.scrollBy({
      left: direction * 260,
      behavior: "smooth",
    })
  }

  const activeCategoryData = sidebarCategories.find(c => c.name === activeCategory) || sidebarCategories[0]
  const customer = session?.user
  const customerName =
    customer?.name || customer?.email?.split("@")[0] || "Lotus customer"
  const customerEmail = customer?.email || "Lotus customer"
  const accountLoading = status === "loading"
  const headerTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <motion.header
      initial={false}
      animate={{ y: headerVisible ? 0 : "-100%" }}
      transition={headerTransition}
      className="sticky top-0 z-40 border-b border-[#ececf1] bg-white/95 shadow-sm backdrop-blur-xl will-change-transform"
    >
      <motion.div
        initial={false}
        animate={{
          height: promoVisible ? "auto" : 0,
          opacity: promoVisible ? 1 : 0,
        }}
        transition={headerTransition}
        className="overflow-hidden bg-[linear-gradient(90deg,#f97316,#7731aa,#2b0f52)] text-white"
      >
        <div className="px-4 py-1.5">
          <div className="mx-auto flex max-w-7xl items-center justify-between text-xs font-semibold">
            <span>Real Nepal phone prices updated Jun 19, 2026</span>
            <a href="#footer" className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              Find our store
            </a>
          </div>
        </div>
      </motion.div>

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:gap-8">
        <SiteLogo />

        <form
          onSubmit={(event) => {
            event.preventDefault()
            const firstMatch = searchMatches[0]
            if (firstMatch) router.push(`/product/${firstMatch.id}`)
          }}
          className="relative hidden flex-1 md:block"
        >
          <Search className="pointer-events-none absolute left-4 top-1/2 z-10 size-5 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => window.setTimeout(() => setSearchFocused(false), 120)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setSearchFocused(false)
            }}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder='Search for "perfect ROG laptop"'
            className="h-12 rounded-[8px] border-[#e3e3e7] bg-white pl-12 text-[15px] shadow-inner focus-visible:border-[#f97316] focus-visible:ring-[#f97316]/20"
          />
          <AnimatePresence>
            {searchFocused && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 overflow-hidden rounded-[8px] border border-[#ececf1] bg-white shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-[#f0f0f2] px-4 py-3">
                  <span className="text-sm font-bold">Product matches</span>
                  <span className="text-xs text-slate-400">
                    Type and press enter
                  </span>
                </div>
                <div className="max-h-[360px] overflow-auto p-2" data-lenis-prevent>
                  {searchMatches.map((product, index) => (
                    <PrefetchLink
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="flex w-full items-center gap-3 rounded-[8px] p-2 text-left transition hover:bg-[#fff6ed]"
                    >
                      <span className="grid size-14 shrink-0 place-items-center rounded-[8px] bg-[#f5f5f6]">
                        <img
                          src={product.image}
                          alt=""
                          className="h-full w-full object-contain p-2"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-1 text-sm font-semibold">
                          {product.name}
                        </span>
                        <span className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                          <span>{product.brand}</span>
                          <span className="size-1 rounded-full bg-slate-300" />
                          <span>{formatPrice(product.price)}</span>
                        </span>
                      </span>
                      <span className="text-xs font-bold text-[#f97316]">
                        0{index + 1}
                      </span>
                    </PrefetchLink>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
          <div
            className="relative hidden lg:block"
            onMouseEnter={() => setFeaturesOpen(true)}
            onMouseLeave={() => setFeaturesOpen(false)}
          >
            <button
              type="button"
              className={cn(
                "flex items-center gap-2 rounded-[8px] border px-4 py-3 text-sm font-bold transition-all duration-200 cursor-pointer",
                featuresOpen
                  ? "border-[#f97316] bg-[#fff6ed] text-[#f97316]"
                  : "border-[#f7e8d6] bg-[#fffaf4] text-[#2b0f52] hover:border-[#f97316]/50 hover:bg-[#fff6ed] hover:text-[#f97316]"
              )}
            >
              <Sparkles className="size-4 text-[#f97316]" />
              <span>Features</span>
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-200 text-slate-400",
                  featuresOpen && "rotate-180 text-[#f97316]"
                )}
              />
            </button>

            <AnimatePresence>
              {featuresOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full z-50 mt-2 w-80 rounded-[12px] border border-[#ececf1] bg-white p-3 shadow-2xl"
                >
                  <div className="mb-2 px-2 py-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Our Services
                    </span>
                  </div>
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setRepairOpen(true)
                        setFeaturesOpen(false)
                        setRepairSuccess(false)
                      }}
                      className="w-full text-left group flex items-start gap-3 rounded-[8px] p-2 hover:bg-[#fffaf4] transition duration-150 cursor-pointer"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-[6px] bg-amber-50 text-amber-600 transition group-hover:bg-amber-100 group-hover:scale-105">
                        <Wrench className="size-4" />
                      </span>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-slate-800 transition group-hover:text-[#f97316]">
                          Repair Devices
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          Quick repair for screen, battery & glass
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSellOpen(true)
                        setFeaturesOpen(false)
                        setSellSuccess(false)
                      }}
                      className="w-full text-left group flex items-start gap-3 rounded-[8px] p-2 hover:bg-[#fffaf4] transition duration-150 cursor-pointer"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-[6px] bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100 group-hover:scale-105">
                        <Coins className="size-4" />
                      </span>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-slate-800 transition group-hover:text-[#f97316]">
                          Sell Old Phones
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          Get instant valuation & cash for your phone
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setExchangeOpen(true)
                        setFeaturesOpen(false)
                        setExchangeSuccess(false)
                      }}
                      className="w-full text-left group flex items-start gap-3 rounded-[8px] p-2 hover:bg-[#fffaf4] transition duration-150 cursor-pointer"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-[6px] bg-blue-50 text-blue-600 transition group-hover:bg-blue-100 group-hover:scale-105">
                        <RefreshCw className="size-4" />
                      </span>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-slate-800 transition group-hover:text-[#f97316]">
                          Exchange & Trade-In
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          Swap old phone for a brand new one
                        </p>
                      </div>
                    </button>

                    <div className="border-t border-slate-100 my-1" />

                    <a
                      href="https://wa.me/9800000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 rounded-[8px] p-2 hover:bg-[#fffaf4] transition duration-150"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-[6px] bg-purple-50 text-purple-600 transition group-hover:bg-purple-100 group-hover:scale-105">
                        <Headphones className="size-4" />
                      </span>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-slate-800 transition group-hover:text-[#f97316]">
                          24/7 Live Support
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          Chat with our team anytime, anywhere
                        </p>
                      </div>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {customer ? (
            <div className="group relative">
              <Button
                type="button"
                variant="ghost"
                className="h-11 rounded-[8px] px-3 text-[#101322] hover:bg-[#fff6ed]"
              >
                <User className="size-5" />
                <span className="hidden max-w-28 truncate sm:inline">
                  {customerName}
                </span>
              </Button>
              <div className="invisible absolute right-0 top-full z-50 mt-2 w-56 rounded-[10px] border border-[#ececf1] bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                <div className="px-3 py-2">
                  <p className="truncate text-sm font-black text-[#101322]">
                    {customerName}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {customerEmail}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full rounded-[8px] px-3 py-2 text-left text-sm font-bold text-rose-500 hover:bg-rose-50"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <Button
              type="button"
              variant="ghost"
              onClick={onLoginOpen}
              disabled={accountLoading}
              className="h-11 rounded-[8px] px-3 text-[#101322] hover:bg-[#fff6ed]"
            >
              <User className="size-5" />
              <span className="hidden sm:inline">
                {accountLoading ? "Checking" : "Sign In"}
              </span>
            </Button>
          )}
          <PrefetchLink
            href="/cart"
            className="relative flex h-11 items-center gap-1.5 rounded-[8px] px-3 text-[#101322] hover:bg-[#fff6ed] transition text-sm font-medium"
          >
            <ShoppingCart className="size-5" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#6d28d9] text-[11px] font-black text-white">
                {totalItems}
              </span>
            )}
          </PrefetchLink>
        </div>
      </div>

      <div className="relative border-t border-[#f1f1f3]">
        <nav
          ref={categoryScrollerRef}
          onMouseLeave={closeMega}
          className="scrollbar-none mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4"
          data-lenis-prevent
        >
          <button
            type="button"
            onMouseEnter={() => scheduleMegaOpen()}
            onFocus={() => openMega()}
            onClick={() => openMega()}
            className={cn(
              "flex h-12 shrink-0 items-center gap-2 rounded-[8px] px-3 text-sm font-semibold transition",
              megaOpen
                ? "bg-[#fff6ed] text-[#f97316]"
                : "text-[#101322] hover:bg-[#fff6ed] hover:text-[#f97316]"
            )}
          >
            All Categories
            <ChevronDown className="size-4" />
          </button>
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              onMouseEnter={() => scheduleMegaOpen(category.name)}
              onFocus={() => openMega(category.name)}
              onClick={() => openMega(category.name)}
              className={cn(
                "flex h-12 shrink-0 items-center gap-2 rounded-[8px] px-3 text-sm font-medium transition",
                megaOpen && activeCategory.toLowerCase() === category.name.toLowerCase()
                  ? "bg-[#fff6ed] text-[#f97316]"
                  : "text-slate-600 hover:bg-[#fff6ed] hover:text-[#f97316]"
              )}
            >
              <category.icon className="size-4" />
              {category.name}
            </button>
          ))}
          <div className="ml-auto hidden items-center gap-1 lg:flex">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => scrollCategories(-1)}
              className="rounded-[8px]"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => scrollCategories(1)}
              className="rounded-[8px]"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </nav>

        <AnimatePresence>
          {megaOpen && (
            <motion.div
              onMouseEnter={() => {
                if (closeMegaTimer.current) {
                  window.clearTimeout(closeMegaTimer.current)
                }
              }}
              onMouseLeave={closeMega}
              initial={{ opacity: 0, y: -8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-full z-40 hidden w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2 rounded-[12px] border border-[#ececf1] bg-white p-2 shadow-2xl lg:block overflow-hidden"
            >
              <div className="grid grid-cols-[220px_1fr] h-[460px]">
                {/* Left Sidebar categories list */}
                <div className="border-r border-[#ececf1] bg-[#fbfbfa] p-3 flex flex-col gap-1 overflow-y-auto">
                  {sidebarCategories.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onMouseEnter={() => setActiveCategory(item.name)}
                      className={cn(
                        "w-full text-left px-4 py-2.5 rounded-[8px] text-sm font-semibold transition duration-150 flex items-center justify-between",
                        activeCategory === item.name
                          ? "bg-[#fff6ed] text-[#f97316] shadow-sm"
                          : "text-slate-600 hover:bg-[#f5f5f6]"
                      )}
                    >
                      {item.name}
                      {activeCategory === item.name && <ChevronRight className="size-4 text-[#f97316]" />}
                    </button>
                  ))}
                </div>

                {/* Right Content Area dynamic by activeCategory */}
                <div className="p-6 overflow-y-auto bg-white flex flex-col gap-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-6"
                    >
                      {activeCategoryData.brands.map((brand) => (
                        <div key={brand.name} className="space-y-3">
                          <div className="flex items-center justify-between border-b border-[#f1f1f3] pb-1.5">
                            <h3 className="text-[15px] font-black text-[#101322]">{brand.name}</h3>
                            <Link
                              href={`/#products`}
                              onClick={() => setMegaOpen(false)}
                              className="text-xs font-bold text-[#f97316] hover:underline flex items-center gap-0.5"
                            >
                              View all
                              <ArrowRight className="size-3" />
                            </Link>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {brand.products.map((product) => (
                              <PrefetchLink
                                key={product.id}
                                href={`/product/${product.id}`}
                                onClick={() => setMegaOpen(false)}
                                className="group flex items-center gap-3 rounded-[8px] border border-[#eeeeef] p-2 hover:border-[#f97316]/40 hover:bg-[#fffaf4] transition duration-200"
                              >
                                <span className="grid size-12 shrink-0 place-items-center rounded-[8px] bg-[#f5f5f6] overflow-hidden">
                                  <img
                                    src={product.image}
                                    alt=""
                                    className="h-full w-full object-contain p-1.5 transition duration-300 group-hover:scale-105"
                                  />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block text-sm font-bold text-[#101322] line-clamp-1 group-hover:text-[#f97316] transition duration-150">
                                    {product.name}
                                  </span>
                                  <span className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                                    <span className="font-semibold text-slate-900">{formatPrice(product.price)}</span>
                                    {product.originalPrice && (
                                      <span className="line-through text-[10px]">{formatPrice(product.originalPrice)}</span>
                                    )}
                                  </span>
                                </span>
                              </PrefetchLink>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Repair Dialog */}
      <Dialog open={repairOpen} onOpenChange={setRepairOpen}>
        <DialogContent className="max-w-md w-full rounded-[12px] bg-white p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto" data-lenis-prevent>
          <DialogHeader>
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <span className="grid size-10 place-items-center rounded-full bg-amber-50">
                <Wrench className="size-5" />
              </span>
              <div>
                <span className="text-xs font-black uppercase tracking-[0.16em]">Service Center</span>
                <DialogTitle className="text-xl font-black text-[#101322] tracking-tight">Device Repair</DialogTitle>
              </div>
            </div>
            <DialogDescription className="text-sm text-slate-500">
              Get an instant estimation and book a premium repair service.
            </DialogDescription>
          </DialogHeader>

          {repairSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-4"
            >
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <svg className="size-8 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Repair Request Submitted!</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Our service desk will call you within 30 minutes to schedule pickup.
                </p>
              </div>
              <div className="rounded-[8px] bg-slate-50 p-3.5 text-xs text-slate-600 font-semibold max-w-xs mx-auto">
                Estimated Repair: <span className="text-amber-600 font-bold">{formatPrice(repairEstimate)}</span>
              </div>
              <Button
                onClick={() => setRepairOpen(false)}
                className="w-full max-w-xs bg-[#101322] hover:bg-[#f97316] text-white rounded-[8px]"
              >
                Close
              </Button>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setRepairSuccess(true)
              }}
              className="mt-4 space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Brand</label>
                  <select
                    value={repairBrand}
                    onChange={(e) => setRepairBrand(e.target.value)}
                    className="w-full h-10 px-3 rounded-[8px] border border-slate-200 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]"
                  >
                    {["Apple", "Samsung", "OnePlus", "Nothing", "Redmi", "Xiaomi", "POCO", "vivo", "OPPO", "realme", "Infinix", "HONOR", "Motorola"].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Model Name</label>
                  <Input
                    required
                    value={repairModel}
                    onChange={(e) => setRepairModel(e.target.value)}
                    placeholder="e.g. iPhone 15 Pro"
                    className="h-10 rounded-[8px] border-slate-200 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">What is the issue?</label>
                <select
                  value={repairIssue}
                  onChange={(e) => setRepairIssue(e.target.value)}
                  className="w-full h-10 px-3 rounded-[8px] border border-slate-200 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]"
                >
                  {["Screen Crack", "Battery Replacement", "Backglass Crack", "Motherboard/Power Issue", "Other"].map((issue) => (
                    <option key={issue} value={issue}>{issue}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Your Name</label>
                  <Input
                    required
                    placeholder="Enter full name"
                    className="h-10 rounded-[8px] border-slate-200 text-sm font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Phone Number</label>
                  <Input
                    required
                    type="tel"
                    placeholder="98XXXXXXXX"
                    className="h-10 rounded-[8px] border-slate-200 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Estimate Banner */}
              <div className="rounded-[8px] bg-amber-50/70 border border-amber-100 p-4 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Estimated Cost</span>
                  <span className="text-xl font-black text-[#2b0f52]">{formatPrice(repairEstimate)}</span>
                </div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-100/60 px-2 py-1 rounded-[4px]">
                  Includes Warranty
                </span>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-[#101322] hover:bg-[#f97316] text-white rounded-[8px] font-bold transition duration-200 shadow-md"
              >
                Request Repair Setup
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Sell Dialog */}
      <Dialog open={sellOpen} onOpenChange={setSellOpen}>
        <DialogContent className="max-w-md w-full rounded-[12px] bg-white p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto" data-lenis-prevent>
          <DialogHeader>
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <span className="grid size-10 place-items-center rounded-full bg-emerald-50">
                <Coins className="size-5" />
              </span>
              <div>
                <span className="text-xs font-black uppercase tracking-[0.16em]">Trade-In Desk</span>
                <DialogTitle className="text-xl font-black text-[#101322] tracking-tight">Sell Old Device</DialogTitle>
              </div>
            </div>
            <DialogDescription className="text-sm text-slate-500">
              Get an instant valuation for your phone and convert it to cash.
            </DialogDescription>
          </DialogHeader>

          {sellSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-4"
            >
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <svg className="size-8 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Offer Approved!</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Our evaluation team will contact you to inspect and pick up the device.
                </p>
              </div>
              <div className="rounded-[8px] bg-slate-50 p-3.5 text-xs text-slate-600 font-semibold max-w-xs mx-auto">
                Estimated Payout: <span className="text-emerald-600 font-bold">{formatPrice(sellEstimate)}</span>
              </div>
              <Button
                onClick={() => setSellOpen(false)}
                className="w-full max-w-xs bg-[#101322] hover:bg-[#f97316] text-white rounded-[8px]"
              >
                Close
              </Button>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSellSuccess(true)
              }}
              className="mt-4 space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Brand</label>
                  <select
                    value={sellBrand}
                    onChange={(e) => setSellBrand(e.target.value)}
                    className="w-full h-10 px-3 rounded-[8px] border border-slate-200 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]"
                  >
                    {["Apple", "Samsung", "OnePlus", "Nothing", "Redmi", "Xiaomi", "POCO", "vivo", "OPPO", "realme", "Infinix", "HONOR", "Motorola"].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Model Name</label>
                  <Input
                    required
                    value={sellModel}
                    onChange={(e) => setSellModel(e.target.value)}
                    placeholder="e.g. iPhone 13 Pro"
                    className="h-10 rounded-[8px] border-slate-200 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Device Condition</label>
                <select
                  value={sellCondition}
                  onChange={(e) => setSellCondition(e.target.value)}
                  className="w-full h-10 px-3 rounded-[8px] border border-slate-200 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]"
                >
                  {["Flawless", "Good", "Average", "Broken"].map((cond) => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Your Name</label>
                  <Input
                    required
                    placeholder="Enter full name"
                    className="h-10 rounded-[8px] border-slate-200 text-sm font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Phone Number</label>
                  <Input
                    required
                    type="tel"
                    placeholder="98XXXXXXXX"
                    className="h-10 rounded-[8px] border-slate-200 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Estimate Banner */}
              <div className="rounded-[8px] bg-emerald-50/70 border border-emerald-100 p-4 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Estimated Value</span>
                  <span className="text-xl font-black text-[#2b0f52]">{formatPrice(sellEstimate)}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/60 px-2 py-1 rounded-[4px]">
                  Instant Payment
                </span>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-[#101322] hover:bg-[#f97316] text-white rounded-[8px] font-bold transition duration-200 shadow-md"
              >
                Accept Offer & Request Pickup
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Exchange Dialog */}
      <Dialog open={exchangeOpen} onOpenChange={setExchangeOpen}>
        <DialogContent className="max-w-lg w-full rounded-[12px] bg-white p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto" data-lenis-prevent>
          <DialogHeader>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <span className="grid size-10 place-items-center rounded-full bg-blue-50">
                <RefreshCw className="size-5" />
              </span>
              <div>
                <span className="text-xs font-black uppercase tracking-[0.16em]">Upgrade Program</span>
                <DialogTitle className="text-xl font-black text-[#101322] tracking-tight">Exchange Phones</DialogTitle>
              </div>
            </div>
            <DialogDescription className="text-sm text-slate-500">
              Trade in your old phone to get a brand new phone with a lower cost or simple EMI.
            </DialogDescription>
          </DialogHeader>

          {exchangeSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-4"
            >
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <svg className="size-8 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Exchange Request Received!</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Bring your old device to our store to finalize the exchange upgrade!
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto rounded-[8px] bg-slate-50 p-4 text-xs font-semibold text-slate-700">
                <div>
                  Old Phone Value: <span className="block font-bold text-slate-900">{formatPrice(exchangeOldValue)}</span>
                </div>
                <div>
                  Difference to Pay: <span className="block font-bold text-blue-600">{formatPrice(exchangeOffset)}</span>
                </div>
              </div>
              <Button
                onClick={() => setExchangeOpen(false)}
                className="w-full max-w-xs bg-[#101322] hover:bg-[#f97316] text-white rounded-[8px]"
              >
                Close
              </Button>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setExchangeSuccess(true)
              }}
              className="mt-4 space-y-4"
            >
              {/* Old Phone Section */}
              <div className="p-3 border border-slate-100 rounded-[8px] bg-slate-50/50 space-y-3">
                <p className="text-xs font-black text-[#101322] uppercase tracking-wider text-[11px]">Your Old Phone Details</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">Brand</label>
                    <select
                      value={exchangeOldBrand}
                      onChange={(e) => setExchangeOldBrand(e.target.value)}
                      className="w-full h-9 px-2 rounded-[8px] border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#f97316]"
                    >
                      {["Apple", "Samsung", "OnePlus", "Nothing", "Redmi", "Xiaomi", "POCO", "vivo", "OPPO", "realme", "Infinix", "HONOR", "Motorola"].map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">Model</label>
                    <Input
                      required
                      value={exchangeOldModel}
                      onChange={(e) => setExchangeOldModel(e.target.value)}
                      placeholder="e.g. iPhone 12"
                      className="h-9 rounded-[8px] border-slate-200 text-xs font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">Condition</label>
                    <select
                      value={exchangeOldCondition}
                      onChange={(e) => setExchangeOldCondition(e.target.value)}
                      className="w-full h-9 px-2 rounded-[8px] border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#f97316]"
                    >
                      {["Flawless", "Good", "Average", "Broken"].map((cond) => (
                        <option key={cond} value={cond}>{cond}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* New Phone Section */}
              <div className="p-3 border border-slate-100 rounded-[8px] bg-slate-50/50 space-y-3">
                <p className="text-xs font-black text-[#101322] uppercase tracking-wider text-[11px]">Select New Phone to Upgrade To</p>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">Choose Phone</label>
                  <select
                    value={exchangeNewProductId}
                    onChange={(e) => setExchangeNewProductId(e.target.value)}
                    className="w-full h-10 px-3 rounded-[8px] border border-slate-200 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#f97316]"
                  >
                    {products
                      .filter((p) => p.category === "Smart Phone" || p.category === "Apple" || p.category === "Samsung" || p.brand === "Apple" || p.brand === "Samsung" || p.brand === "Xiaomi")
                      .map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} ({formatPrice(product.price)})
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Your Name</label>
                  <Input
                    required
                    placeholder="Enter full name"
                    className="h-10 rounded-[8px] border-slate-200 text-sm font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Phone Number</label>
                  <Input
                    required
                    type="tel"
                    placeholder="98XXXXXXXX"
                    className="h-10 rounded-[8px] border-slate-200 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Exchange Summary Board */}
              <div className="rounded-[8px] bg-blue-50/70 border border-blue-100 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Exchange Quote</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white border border-slate-100 rounded-[6px] p-2">
                    <span className="block text-[8px] font-bold text-slate-400">Old Value</span>
                    <span className="text-xs font-bold text-slate-800">{formatPrice(exchangeOldValue)}</span>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-[6px] p-2">
                    <span className="block text-[8px] font-bold text-slate-400">New Cost</span>
                    <span className="text-xs font-bold text-slate-800">
                      {formatPrice(exchangeNewPhoneProduct?.price || 0)}
                    </span>
                  </div>
                  <div className="bg-blue-100/50 border border-blue-100 rounded-[6px] p-2">
                    <span className="block text-[8px] font-bold text-blue-500">Difference to Pay</span>
                    <span className="text-xs font-black text-blue-700">{formatPrice(exchangeOffset)}</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-[#101322] hover:bg-[#f97316] text-white rounded-[8px] font-bold transition duration-200 shadow-md"
              >
                Submit Exchange Upgrade Request
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </motion.header>
  )
}
