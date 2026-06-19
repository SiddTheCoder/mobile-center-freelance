"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  Bell,
  Home,
  ShoppingBag,
  Layers,
  Store,
  CreditCard,
  Wrench,
  PlusCircle,
  Search,
  MessageSquareText,
  LogOut,
  User,
} from "lucide-react"

import { CategoriesTab } from "@/components/admin/tabs/categories-tab"
import { DashboardTab } from "@/components/admin/tabs/dashboard-tab"
import { ProductsTab } from "@/components/admin/tabs/products-tab"
import { ReportsTab } from "@/components/admin/tabs/reports-tab"
import { SettingsTab } from "@/components/admin/tabs/settings-tab"
import { BrandsTab } from "@/components/admin/tabs/brands-tab"
import { AdminMemoryProvider } from "@/components/admin/admin-state"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { activeClient } from "@/clients"

type AdminTabId =
  | "dashboard"
  | "products"
  | "categories"
  | "brands"
  | "payments"
  | "settings"

type AdminTab = {
  id: AdminTabId
  label: string
  icon: React.ElementType
}

const adminTabs: AdminTab[] = [
  { id: "dashboard", label: "Home", icon: Home },
  { id: "products", label: "Products", icon: ShoppingBag },
  { id: "categories", label: "Categories", icon: Layers },
  { id: "brands", label: "Stores", icon: Store },
  { id: "payments", label: "Finances", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Wrench },
]

const notificationItems = [
  {
    title: "Low stock products",
    copy: "9 SKUs need restock before weekend.",
    time: "Just now",
  },
  {
    title: "Pending Q&A",
    copy: "2 product questions are waiting for answers.",
    time: "12 min ago",
  },
  {
    title: "Abandoned carts",
    copy: "3 high-value carts need recovery follow-up.",
    time: "27 min ago",
  },
  {
    title: "EMI approvals",
    copy: "1 customer document review is pending.",
    time: "1h ago",
  },
]

function renderPanel(activeTab: AdminTabId, productCreateSignal: number) {
  switch (activeTab) {
    case "dashboard":
      return <DashboardTab />
    case "products":
      return <ProductsTab createSignal={productCreateSignal} />
    case "categories":
      return <CategoriesTab />
    case "brands":
      return <BrandsTab />
    case "payments":
      return <ReportsTab />
    case "settings":
      return <SettingsTab />
  }
}

export function AdminPortal() {
  const [activeTab, setActiveTab] = React.useState<AdminTabId>("dashboard")
  const [alertsOpen, setAlertsOpen] = React.useState(false)
  const [productCreateSignal, setProductCreateSignal] = React.useState(0)
  const shouldReduceMotion = useReducedMotion()
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <AdminMemoryProvider>
      <main className="h-screen w-screen overflow-hidden flex bg-[#f8fafc] text-slate-800 font-sans text-sm">
        
        {/* Sidebar (Lock full height, non-scrollable unless content overflows) */}
        <aside className="w-56 bg-[#0f172a] text-slate-100 flex flex-col flex-shrink-0 z-20 shadow-lg border-r border-slate-900">
          <div className="p-5 flex flex-col justify-between h-full">
            {/* Nav Menu */}
            <div className="space-y-1.5">
              {/* Brand Heading inside Sidebar top */}
              <div className="mb-6 px-2">
                <span className="block text-sm font-bold text-white tracking-tight truncate">
                  {activeClient.shopName}
                </span>
                <span className="block text-[10px] font-bold text-orange-400 uppercase tracking-widest mt-0.5">
                  Inventory
                </span>
              </div>

              {adminTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold transition-all duration-150 w-full",
                    activeTab === tab.id
                      ? "bg-orange-600 text-white shadow-md shadow-orange-600/10"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <tab.icon className="size-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Bottom Menu */}
            <div className="space-y-1.5 pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("products")
                  setProductCreateSignal((signal) => signal + 1)
                }}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold text-slate-450 hover:bg-slate-800 hover:text-white w-full"
              >
                <PlusCircle className="size-4 text-orange-500" />
                Add product
              </button>
              <Link
                href="/"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold text-slate-450 hover:bg-slate-800 hover:text-white w-full"
              >
                <LogOut className="size-4" />
                Log out
              </Link>
            </div>
          </div>
        </aside>

        {/* Right side container */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          
          {/* Top Header */}
          <header className="sticky top-0 z-40 h-16 border-b border-slate-150 bg-white px-8 flex items-center justify-between flex-shrink-0">
            {/* Header Title / Breadcrumb */}
            <div>
              <span className="font-bold text-slate-800 text-base">Dashboard Portal</span>
            </div>

            {/* Center Search Bar */}
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search inventory..."
                className="h-10 rounded-full border-slate-200 bg-white pl-9 pr-4 text-sm focus-visible:border-orange-500 focus-visible:ring-orange-500/20"
              />
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-2">
              {/* Message bubble */}
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full text-slate-650 hover:bg-slate-100 hover:text-orange-600"
              >
                <MessageSquareText className="size-4.5" />
              </Button>

              {/* Bell */}
              <div className="relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setAlertsOpen((open) => !open)}
                  className="size-9 rounded-full text-slate-650 hover:bg-slate-100 hover:text-orange-600"
                >
                  <Bell className="size-4.5" />
                  <span className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-orange-600 text-[8px] font-bold text-white">
                    {notificationItems.length}
                  </span>
                </Button>
                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {alertsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={transition}
                      className="absolute right-0 top-[calc(100%+8px)] z-50 w-80 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50">
                        <div>
                          <p className="text-xs font-bold text-slate-800">Notifications</p>
                          <p className="text-[10px] text-slate-400">Admin alerts for today</p>
                        </div>
                        <button type="button" className="text-[10px] font-bold text-orange-655 hover:underline">
                          Mark all read
                        </button>
                      </div>
                      <div className="max-h-64 overflow-y-auto p-1.5" data-lenis-prevent>
                        {notificationItems.map((item) => (
                          <button
                            key={item.title}
                            type="button"
                            className="flex w-full gap-2.5 rounded-xl p-2.5 text-left transition hover:bg-orange-50/50"
                            onClick={() => setAlertsOpen(false)}
                          >
                            <span className="mt-1.5 size-1.5 rounded-full bg-orange-600 flex-shrink-0" />
                            <span className="min-w-0 flex-1">
                              <span className="block font-bold text-slate-700 text-xs">{item.title}</span>
                              <span className="mt-0.5 block text-xs text-slate-500 leading-snug">{item.copy}</span>
                              <span className="mt-0.5 block text-[10px] text-slate-400">{item.time}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Gear settings */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveTab("settings")}
                className="size-9 rounded-full text-slate-650 hover:bg-slate-100 hover:text-orange-600"
              >
                <Wrench className="size-4.5" />
              </Button>

              {/* Profile User avatar */}
              <div className="size-9 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm select-none shadow-md shadow-orange-600/10">
                <User className="size-4.5" />
              </div>
            </div>
          </header>

          {/* Content Area (Only this right side part is scrollable) */}
          <section className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
            <div className="max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                  transition={transition}
                >
                  {renderPanel(activeTab, productCreateSignal)}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </div>
      </main>
    </AdminMemoryProvider>
  )
}
