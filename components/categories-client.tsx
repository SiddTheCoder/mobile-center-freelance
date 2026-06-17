"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
  ChevronDown,
  ChevronUp,
  Search,
  Laptop,
  Smartphone,
  Monitor,
  Headphones,
  Cpu,
  Camera,
  Layers,
  Wifi,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { SiteFooter } from "@/components/site-footer"
import { StorefrontHeader } from "@/components/storefront-header"
import { cn } from "@/lib/utils"

type Category = {
  id: string
  name: string
  icon: any
  subcategories: { name: string; slug: string }[]
}

const allCategories: Category[] = [
  {
    id: "laptop",
    name: "Laptop",
    icon: Laptop,
    subcategories: [
      { name: "Apple MacBooks", slug: "laptops" },
      { name: "Lenovo Laptops", slug: "laptops" },
      { name: "Dell XPS Workstations", slug: "laptops" },
      { name: "HP Pavilions", slug: "laptops" },
      { name: "ASUS ROG Gaming", slug: "laptops" },
    ],
  },
  {
    id: "microphone",
    name: "Microphone",
    icon: Headphones,
    subcategories: [
      { name: "Fifine Microphone", slug: "microphones" },
      { name: "Fantech Microphone", slug: "microphones" },
      { name: "Maono MIC", slug: "microphones" },
      { name: "Hollyland", slug: "microphones" },
      { name: "DJI", slug: "microphones" },
    ],
  },
  {
    id: "gaming-tables",
    name: "Gaming Tables",
    icon: Layers,
    subcategories: [
      { name: "Fantech Gaming Desk", slug: "tech-accessories" },
      { name: "Thermaltake Desks", slug: "tech-accessories" },
    ],
  },
  {
    id: "web-camera",
    name: "Web Camera",
    icon: Camera,
    subcategories: [
      { name: "Logitech Webcams", slug: "tech-accessories" },
      { name: "Fantech Webcams", slug: "tech-accessories" },
    ],
  },
  {
    id: "apple",
    name: "Apple",
    icon: Smartphone,
    subcategories: [
      { name: "iPhone 17 Series", slug: "iphone" },
      { name: "iPhone 15 Series", slug: "iphone" },
      { name: "iPads & Tablets", slug: "iphone" },
      { name: "AirPods & Audio", slug: "audio" },
    ],
  },
  {
    id: "smart-watch",
    name: "Smart Watch",
    icon: Cpu,
    subcategories: [
      { name: "Apple Watch", slug: "tech-accessories" },
      { name: "Samsung Galaxy Watch", slug: "tech-accessories" },
      { name: "Xiaomi Band", slug: "tech-accessories" },
      { name: "Amazfit", slug: "tech-accessories" },
    ],
  },
  {
    id: "router",
    name: "Router",
    icon: Wifi,
    subcategories: [
      { name: "TP-Link Routers", slug: "tech-accessories" },
      { name: "Netgear", slug: "tech-accessories" },
      { name: "ASUS Routers", slug: "tech-accessories" },
    ],
  },
  {
    id: "docking-station",
    name: "Docking Station",
    icon: Layers,
    subcategories: [
      { name: "USB-C Hubs", slug: "tech-accessories" },
      { name: "Thunderbolt Docks", slug: "tech-accessories" },
    ],
  },
  {
    id: "smart-phone",
    name: "Smart Phone",
    icon: Smartphone,
    subcategories: [
      { name: "Flagship Phones", slug: "smart-phones" },
      { name: "Mid-range Phones", slug: "smart-phones" },
      { name: "Budget Phones", slug: "smart-phones" },
    ],
  },
  {
    id: "monitor",
    name: "Monitor",
    icon: Monitor,
    subcategories: [
      { name: "Gaming Monitors", slug: "monitors" },
      { name: "QHD Displays", slug: "monitors" },
      { name: "IPS Displays", slug: "monitors" },
      { name: "LG OLED TVs", slug: "monitors" },
    ],
  },
]

export function CategoriesClient() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [expandedIds, setExpandedIds] = React.useState<string[]>([])
  const [cartItems, setCartItems] = React.useState<any[]>([])

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("cart")
      if (saved) setCartItems(JSON.parse(saved))
    } catch {}
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
        onLoginOpen={() => {}}
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
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-full bg-[#f5f5f6] text-[#2b0f52]">
                      <category.icon className="size-5" />
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
                    onClick={() => toggleExpand(category.id)}
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
                            className="flex items-center justify-between rounded-[8px] px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-[#fff6ed] hover:text-[#f97316]"
                          >
                            {sub.name}
                            <ChevronRight className="size-3.5 opacity-0 transition group-hover:opacity-100" />
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
    </main>
  )
}
