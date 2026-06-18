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
import { SiteFooter } from "@/components/site-footer"
import { StorefrontHeader } from "@/components/storefront-header"

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

const allCategories: Category[] = [
  {
    id: "laptop",
    name: "Laptop",
    image: "https://images.unsplash.com/photo-1496181130204-755241524eab?w=150&auto=format&fit=crop&q=60",
    subcategories: [
      { name: "Apple MacBooks", slug: "laptops", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&auto=format&fit=crop&q=60" },
      { name: "Lenovo Laptops", slug: "laptops", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=80&auto=format&fit=crop&q=60" },
      { name: "Dell XPS Workstations", slug: "laptops", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=80&auto=format&fit=crop&q=60" },
      { name: "HP Pavilions", slug: "laptops", image: "https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?w=80&auto=format&fit=crop&q=60" },
      { name: "ASUS ROG Gaming", slug: "laptops", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=80&auto=format&fit=crop&q=60" },
    ],
  },
  {
    id: "microphone",
    name: "Microphone",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=150&auto=format&fit=crop&q=60",
    subcategories: [
      { name: "Fifine Microphone", slug: "microphones", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=80&auto=format&fit=crop&q=60" },
      { name: "Fantech Microphone", slug: "microphones", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=80&auto=format&fit=crop&q=60" },
      { name: "Maono MIC", slug: "microphones", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=80&auto=format&fit=crop&q=60" },
      { name: "Hollyland", slug: "microphones", image: "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?w=80&auto=format&fit=crop&q=60" },
      { name: "DJI", slug: "microphones", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=80&auto=format&fit=crop&q=60" },
    ],
  },
  {
    id: "gaming-tables",
    name: "Gaming Tables",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fce6e?w=150&auto=format&fit=crop&q=60",
    subcategories: [
      { name: "Fantech Gaming Desk", slug: "tech-accessories", image: "https://images.unsplash.com/photo-1598550476439-6847785fce6e?w=80&auto=format&fit=crop&q=60" },
      { name: "Thermaltake Desks", slug: "tech-accessories", image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=80&auto=format&fit=crop&q=60" },
    ],
  },
  {
    id: "web-camera",
    name: "Web Camera",
    image: "https://images.unsplash.com/photo-1616428784860-2646ff5bd365?w=150&auto=format&fit=crop&q=60",
    subcategories: [
      { name: "Logitech Webcams", slug: "tech-accessories", image: "https://images.unsplash.com/photo-1616428784860-2646ff5bd365?w=80&auto=format&fit=crop&q=60" },
      { name: "Fantech Webcams", slug: "tech-accessories", image: "https://images.unsplash.com/photo-1600541519468-4a9121c60b56?w=80&auto=format&fit=crop&q=60" },
    ],
  },
  {
    id: "apple",
    name: "Apple",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=150&auto=format&fit=crop&q=60",
    subcategories: [
      { name: "iPhone 17 Series", slug: "iphone", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=80&auto=format&fit=crop&q=60" },
      { name: "iPhone 15 Series", slug: "iphone", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=80&auto=format&fit=crop&q=60" },
      { name: "iPads & Tablets", slug: "iphone", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=80&auto=format&fit=crop&q=60" },
      { name: "AirPods & Audio", slug: "audio", image: "https://images.unsplash.com/photo-1588449668365-d15e397f6787?w=80&auto=format&fit=crop&q=60" },
    ],
  },
  {
    id: "smart-watch",
    name: "Smart Watch",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=150&auto=format&fit=crop&q=60",
    subcategories: [
      { name: "Apple Watch", slug: "tech-accessories", image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=80&auto=format&fit=crop&q=60" },
      { name: "Samsung Galaxy Watch", slug: "tech-accessories", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=80&auto=format&fit=crop&q=60" },
      { name: "Xiaomi Band", slug: "tech-accessories", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=80&auto=format&fit=crop&q=60" },
      { name: "Amazfit", slug: "tech-accessories", image: "https://images.unsplash.com/photo-1517502884422-41eaaced0168?w=80&auto=format&fit=crop&q=60" },
    ],
  },
  {
    id: "router",
    name: "Router",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=150&auto=format&fit=crop&q=60",
    subcategories: [
      { name: "TP-Link Routers", slug: "tech-accessories", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=80&auto=format&fit=crop&q=60" },
      { name: "Netgear", slug: "tech-accessories", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=80&auto=format&fit=crop&q=60" },
      { name: "ASUS Routers", slug: "tech-accessories", image: "https://images.unsplash.com/photo-1631553127988-348df80c0514?w=80&auto=format&fit=crop&q=60" },
    ],
  },
  {
    id: "docking-station",
    name: "Docking Station",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=150&auto=format&fit=crop&q=60",
    subcategories: [
      { name: "USB-C Hubs", slug: "tech-accessories", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=80&auto=format&fit=crop&q=60" },
      { name: "Thunderbolt Docks", slug: "tech-accessories", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=80&auto=format&fit=crop&q=60" },
    ],
  },
  {
    id: "smart-phone",
    name: "Smart Phone",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=60",
    subcategories: [
      { name: "Flagship Phones", slug: "smart-phones", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=80&auto=format&fit=crop&q=60" },
      { name: "Mid-range Phones", slug: "smart-phones", image: "https://images.unsplash.com/photo-1565849906660-4df8e17812c3?w=80&auto=format&fit=crop&q=60" },
      { name: "Budget Phones", slug: "smart-phones", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=80&auto=format&fit=crop&q=60" },
    ],
  },
  {
    id: "monitor",
    name: "Monitor",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&auto=format&fit=crop&q=60",
    subcategories: [
      { name: "Gaming Monitors", slug: "monitors", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=80&auto=format&fit=crop&q=60" },
      { name: "QHD Displays", slug: "monitors", image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=80&auto=format&fit=crop&q=60" },
      { name: "IPS Displays", slug: "monitors", image: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=80&auto=format&fit=crop&q=60" },
      { name: "LG OLED TVs", slug: "monitors", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=80&auto=format&fit=crop&q=60" },
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
    </main>
  )
}
