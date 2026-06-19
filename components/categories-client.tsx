"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
  ChevronDown,
  ChevronUp,
  Search,
  ChevronRight,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { LoginDialog } from "@/components/login-dialog"
import { SiteFooter } from "@/components/site-footer"
import { StorefrontHeader } from "@/components/storefront-header"
import { readCartItems, subscribeToCartChanges } from "@/lib/cart-store"
import { getProductById, type CartItem } from "@/lib/products"

type Subcategory = {
  name: string
  slug: string
  image: string
}

type Category = {
  id: string
  name: string
  image: string
  subcategories: Subcategory[]
}

const productImage = (id: string) =>
  getProductById(id)?.image ??
  "https://cdn.hukut.com/Apple-iphone-16e-Price-in-Nepal.png1744176698913"

const allCategories: Category[] = [
  {
    id: "apple",
    name: "Apple",
    image: productImage("apple-iphone-17-pro-max"),
    subcategories: [
      { name: "iPhone 17 Series", slug: "iphone", image: productImage("apple-iphone-17") },
      { name: "iPhone 16 Series", slug: "iphone", image: productImage("apple-iphone-16") },
      { name: "iPhone 15 Series", slug: "iphone", image: productImage("apple-iphone-15") },
    ],
  },
  {
    id: "samsung",
    name: "Samsung",
    image: productImage("samsung-galaxy-s26-ultra"),
    subcategories: [
      { name: "Galaxy S26 Ultra", slug: "samsung", image: productImage("samsung-galaxy-s26-ultra") },
      { name: "Galaxy S25 Series", slug: "samsung", image: productImage("samsung-galaxy-s25-ultra") },
      { name: "Galaxy Buds", slug: "audio", image: productImage("samsung-galaxy-buds-fe") },
    ],
  },
  {
    id: "oneplus",
    name: "OnePlus",
    image: productImage("oneplus-15"),
    subcategories: [
      { name: "OnePlus 15", slug: "oneplus", image: productImage("oneplus-15") },
      { name: "OnePlus Nord", slug: "oneplus", image: productImage("oneplus-nord-5") },
      { name: "OnePlus 13R", slug: "oneplus", image: productImage("oneplus-13r") },
    ],
  },
  {
    id: "nothing",
    name: "Nothing",
    image: productImage("nothing-phone-3"),
    subcategories: [
      { name: "Nothing Phone (3)", slug: "nothing", image: productImage("nothing-phone-3") },
      { name: "Nothing Phone (3a)", slug: "nothing", image: productImage("nothing-phone-3a") },
      { name: "CMF Phone", slug: "nothing", image: productImage("nothing-cmf-phone-2-pro") },
    ],
  },
  {
    id: "redmi-xiaomi-poco",
    name: "Redmi, Xiaomi & POCO",
    image: productImage("xiaomi-17-ultra"),
    subcategories: [
      { name: "Redmi Phones", slug: "redmi", image: productImage("redmi-note-15-pro") },
      { name: "Xiaomi Flagships", slug: "xiaomi", image: productImage("xiaomi-17-ultra") },
      { name: "POCO Performance", slug: "poco", image: productImage("poco-f8-pro") },
      { name: "Redmi Buds", slug: "audio", image: productImage("redmi-buds-6-play") },
    ],
  },
  {
    id: "oppo-vivo-realme",
    name: "OPPO, vivo & realme",
    image: productImage("oppo-find-n5"),
    subcategories: [
      { name: "OPPO Phones", slug: "oppo", image: productImage("oppo-find-n5") },
      { name: "vivo Phones", slug: "vivo", image: productImage("vivo-x300-pro") },
      { name: "realme Phones", slug: "realme", image: productImage("realme-15-pro") },
    ],
  },
  {
    id: "value-phones",
    name: "Value Phones",
    image: productImage("infinix-gt-30-pro"),
    subcategories: [
      { name: "Infinix", slug: "infinix", image: productImage("infinix-gt-30-pro") },
      { name: "HONOR", slug: "honor", image: productImage("honor-400-pro") },
      { name: "Motorola", slug: "motorola", image: productImage("motorola-g96-5g") },
    ],
  },
  {
    id: "smart-phone",
    name: "Smart Phone",
    image: productImage("apple-iphone-17"),
    subcategories: [
      { name: "All Phones", slug: "smart-phones", image: productImage("apple-iphone-17") },
      { name: "Flagship Phones", slug: "featured-phones", image: productImage("samsung-galaxy-s26-ultra") },
      { name: "Midrange Phones", slug: "deals", image: productImage("redmi-note-15-pro") },
    ],
  },
  {
    id: "earbuds",
    name: "Earbuds",
    image: productImage("samsung-galaxy-buds-fe"),
    subcategories: [
      { name: "Samsung Buds", slug: "audio", image: productImage("samsung-galaxy-buds-fe") },
      { name: "Redmi Buds", slug: "audio", image: productImage("redmi-buds-6-play") },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    image: productImage("cmf-watch-pro-3"),
    subcategories: [
      { name: "Chargers", slug: "tech-accessories", image: productImage("apple-20watt-usb-c-power-adapter") },
      { name: "Smart Watches", slug: "tech-accessories", image: productImage("cmf-watch-pro-3") },
    ],
  },
]

export function CategoriesClient() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [expandedIds, setExpandedIds] = React.useState<string[]>([])
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [loginOpen, setLoginOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<"login" | "signup">("login")

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setCartItems(readCartItems())
    }, 0)
    const unsubscribe = subscribeToCartChanges(setCartItems)

    return () => {
      window.clearTimeout(timer)
      unsubscribe()
    }
  }, [])

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const filteredCategories = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return allCategories

    return allCategories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        cat.subcategories.some((sub) => sub.name.toLowerCase().includes(query))
    )
  }, [searchQuery])

  return (
    <main className="min-h-screen bg-[#fbfbfa] text-[#101322]">
      <StorefrontHeader
        totalItems={totalItems}
        onLoginOpen={() => setLoginOpen(true)}
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#f97316]">
            Home
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-[#101322] font-semibold">Categories</span>
        </nav>

        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">
              All Categories
            </h1>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              Browse {allCategories.length} categories and their subcategories
            </p>
          </div>
          <div className="relative w-full max-w-sm shrink-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories..."
              className="h-10 rounded-[8px] border-[#e3e3e7] bg-white pl-9 text-sm focus-visible:border-[#f97316] focus-visible:ring-[#f97316]/20"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => {
            const isExpanded = expandedIds.includes(category.id)
            return (
              <motion.div
                key={category.id}
                layout
                className="overflow-hidden rounded-[12px] border border-[#ececf1] bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div
                  onClick={() => toggleExpand(category.id)}
                  className="flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-[#f5f5f6]">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <div>
                      <h3 className="font-black text-[#101322]">{category.name}</h3>
                      <p className="text-xs font-semibold text-slate-400 mt-0.5">
                        {category.subcategories.length} subcategories
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(category.id);
                    }}
                    className="grid size-9 place-items-center rounded-full bg-[#f5f5f6] text-[#2b0f52] transition hover:bg-[#fff6ed] hover:text-[#f97316]"
                    aria-label={`Toggle ${category.name} subcategories`}
                  >
                    {isExpanded ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 border-t border-slate-100 pt-4 flex flex-col gap-1">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            href={`/section/${sub.slug}`}
                            className="group flex items-center justify-between rounded-[8px] px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-[#fff6ed] hover:text-[#f97316]"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="grid size-7 shrink-0 place-items-center overflow-hidden rounded-full bg-slate-100 border border-slate-200/50">
                                <img
                                  src={sub.image}
                                  alt={sub.name}
                                  className="h-full w-full object-cover"
                                />
                              </span>
                              <span>{sub.name}</span>
                            </div>
                            <ChevronRight className="size-3.5 text-slate-400 group-hover:text-[#f97316] transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      <SiteFooter />
      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </main>
  )
}
