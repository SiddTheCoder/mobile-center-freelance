"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Headphones,
  Laptop,
  MapPin,
  Monitor,
  Search,
  ShoppingCart,
  Smartphone,
  User,
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
import { SiteLogo } from "@/components/site-logo"
import { formatPrice, products } from "@/lib/products"
import { cn } from "@/lib/utils"

type TopCategory = {
  name: string
  icon: LucideIcon
}

const categories: TopCategory[] = [
  { name: "Laptop", icon: Laptop },
  { name: "Apple", icon: Smartphone },
  { name: "Samsung", icon: Smartphone },
  { name: "Infinix", icon: Smartphone },
  { name: "HONOR", icon: Smartphone },
  { name: "Xiaomi", icon: Smartphone },
  { name: "OnePlus", icon: Smartphone },
  { name: "OPPO", icon: Smartphone },
  { name: "vivo", icon: Smartphone },
  { name: "Nothing", icon: Smartphone },
  { name: "realme", icon: Smartphone },
  { name: "TECNO", icon: Smartphone },
  { name: "Motorola", icon: Smartphone },
  { name: "ASUS ROG", icon: Smartphone },
  { name: "Smart Phone", icon: Smartphone },
  { name: "Tablet", icon: Smartphone },
  { name: "Monitor", icon: Monitor },
  { name: "PC Components", icon: Cpu },
  { name: "Projector", icon: Monitor },
  { name: "Earbuds", icon: Headphones },
  { name: "Headphone", icon: Headphones },
  { name: "Projector Accessories", icon: Cpu },
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
    name: "Laptop",
    brands: [
      {
        name: "Apple MacBooks",
        products: [
          { id: "macbook-air-m3", name: "Apple MacBook Air 13-inch M3", price: 189999, originalPrice: 209999, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_7d413a689e_a024efb545f5da31.png" },
          { id: "dell-xps-15", name: "Dell XPS 15 9530 Core i7", price: 249999, originalPrice: 279999, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_d206f02e72_6f218a20f0539554.png" }
        ]
      }
    ]
  },
  {
    name: "Apple",
    brands: [
      {
        name: "Apple Devices",
        products: [
          { id: "iphone-15-pro", name: "Apple iPhone 15 Pro 256GB", price: 179999, originalPrice: 199999, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_fc51d7952f_5e8b3ea510d43dbe.png" },
          { id: "airpods-pro-2", name: "Apple AirPods Pro 2nd Gen", price: 39999, originalPrice: 44999, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_181a2f3663_0d08569ab5b28569.png" }
        ]
      }
    ]
  },
  {
    name: "Smart Phone",
    brands: [
      {
        name: "Flagship Phones",
        products: [
          { id: "samsung-s24-ultra", name: "Samsung Galaxy S24 Ultra", price: 189999, originalPrice: 214999, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_24b8334659_e5c018b3c994b65e.png" },
          { id: "asus-rog-phone-8", name: "ASUS ROG Phone 8 Pro 512GB", price: 199999, originalPrice: 219999, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_a3aed3a62d_e2c79f33261ed0d6.png" }
        ]
      },
      {
        name: "Budget & Entry",
        products: [
          { id: "infinix-smart-10", name: "Infinix Smart 10 4GB/64GB", price: 12999, originalPrice: 14999, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_fc51d7952f_5e8b3ea510d43dbe.png" }
        ]
      }
    ]
  },
  {
    name: "Tablet",
    brands: [
      {
        name: "Tablets & iPads",
        products: [
          { id: "iphone-15-pro", name: "Apple iPad Pro M2", price: 129999, originalPrice: 139999, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_fc51d7952f_5e8b3ea510d43dbe.png" }
        ]
      }
    ]
  },
  {
    name: "Monitor",
    brands: [
      {
        name: "Lenovo Monitors",
        products: [
          { id: "lenovo-gaming-24", name: "Lenovo 24-inch Gaming Monitor", price: 25000, originalPrice: 28000, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c3f124c435_27aba7988df0bb3a.png" },
          { id: "lenovo-gaming-27", name: "Lenovo 27-inch Gaming Monitor", price: 30000, originalPrice: 35000, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c3f124c435_27aba7988df0bb3a.png" }
        ]
      },
      {
        name: "Acer Monitors",
        products: [
          { id: "acer-monitor-22", name: "Acer 21.5-inch Monitor", price: 15000, originalPrice: 18000, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c3f124c435_27aba7988df0bb3a.png" }
        ]
      }
    ]
  },
  {
    name: "PC Component",
    brands: [
      {
        name: "Logitech Peripherals",
        products: [
          { id: "logitech-mx-master-3s", name: "Logitech MX Master 3S Mouse", price: 12999, originalPrice: 16999, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_2d5fbac152_464b19ac3186b14e.png" }
        ]
      }
    ]
  },
  {
    name: "Projector",
    brands: [
      {
        name: "BenQ Projectors",
        products: [
          { id: "benq-mh560", name: "BenQ MH560 Projector", price: 95000, originalPrice: 110000, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_119853faf6_22d9f2fe35fe8ed5.png" }
        ]
      },
      {
        name: "Wanbo Projectors",
        products: [
          { id: "wanbo-t2-max", name: "Wanbo T2 Max Projector", price: 22000, originalPrice: 25000, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_119853faf6_22d9f2fe35fe8ed5.png" }
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
          { id: "airpods-pro-2", name: "Apple AirPods Pro 2nd Gen", price: 39999, originalPrice: 44999, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_181a2f3663_0d08569ab5b28569.png" }
        ]
      }
    ]
  },
  {
    name: "Headphone",
    brands: [
      {
        name: "Sonic Gear",
        products: [
          { id: "sonic-gear-xenon-2", name: "Sonic Gear Xenon 2 Headphone", price: 2000, originalPrice: 2500, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_9e9d822318_955d2557e14ff237.png" }
        ]
      },
      {
        name: "Armaggeddon Headset",
        products: [
          { id: "armaggeddon-pulse-7", name: "Armaggeddon Pulse 7 Gaming Headset", price: 2500, originalPrice: 3200, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_9e9d822318_955d2557e14ff237.png" }
        ]
      }
    ]
  },
  {
    name: "Accessories",
    brands: [
      {
        name: "Premium Accessories",
        products: [
          { id: "fantech-wgd01", name: "FANTECH WGD01 Standing Desk", price: 25499, originalPrice: 29999, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_2d5fbac152_464b19ac3186b14e.png" }
        ]
      }
    ]
  }
]

const featuredPhoneBrands = [
  { name: "Apple", brand: "Apple" },
  { name: "Samsung", brand: "Samsung" },
  { name: "Infinix", brand: "Infinix" },
  { name: "HONOR", brand: "HONOR" },
  { name: "Xiaomi", brand: "Xiaomi" },
  { name: "OnePlus", brand: "OnePlus" },
  { name: "OPPO", brand: "OPPO" },
  { name: "vivo", brand: "vivo" },
  { name: "Nothing", brand: "Nothing" },
  { name: "realme", brand: "realme" },
  { name: "TECNO", brand: "TECNO" },
  { name: "Motorola", brand: "Motorola" },
  { name: "ASUS ROG", brand: "ASUS" },
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
  const [megaOpen, setMegaOpen] = React.useState(false)
  const [activeCategory, setActiveCategory] = React.useState("Laptop")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchFocused, setSearchFocused] = React.useState(false)
  const [headerVisible, setHeaderVisible] = React.useState(true)
  const [promoVisible, setPromoVisible] = React.useState(true)
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
    }, 500)
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
            <span>World Cup Special Sale is Live</span>
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
            if (firstMatch) window.location.href = `/product/${firstMatch.id}`
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
                    <Link
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
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-[8px] border border-[#f7e8d6] bg-[#fffaf4] px-4 py-3 text-sm font-bold text-[#2b0f52] lg:flex">
            <Headphones className="size-4 text-[#f97316]" />
            24/7 Live Chat
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={onLoginOpen}
            className="h-11 rounded-[8px] px-3 text-[#101322] hover:bg-[#fff6ed]"
          >
            <User className="size-5" />
            <span className="hidden sm:inline">Sign In</span>
          </Button>
          <Link
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
          </Link>
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
                              <Link
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
                              </Link>
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
    </motion.header>
  )
}
