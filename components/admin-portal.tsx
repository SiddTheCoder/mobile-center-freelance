"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  BarChart3,
  Bell,
  Boxes,
  Building2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Home,
  Image,
  LayoutDashboard,
  MessageSquareText,
  Newspaper,
  Package,
  Percent,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Tags,
  Truck,
  UserCog,
  Users,
} from "lucide-react"

import { BannersTab } from "@/components/admin/tabs/banners-tab"
import { BlogsTab } from "@/components/admin/tabs/blogs-tab"
import { BrandsTab } from "@/components/admin/tabs/brands-tab"
import { CartsTab } from "@/components/admin/tabs/carts-tab"
import { CategoriesTab } from "@/components/admin/tabs/categories-tab"
import { CouponsTab } from "@/components/admin/tabs/coupons-tab"
import { CustomersTab } from "@/components/admin/tabs/customers-tab"
import { DashboardTab } from "@/components/admin/tabs/dashboard-tab"
import { HomepageTab } from "@/components/admin/tabs/homepage-tab"
import { InventoryTab } from "@/components/admin/tabs/inventory-tab"
import { OrdersTab } from "@/components/admin/tabs/orders-tab"
import { PaymentsTab } from "@/components/admin/tabs/payments-tab"
import { ProductsTab } from "@/components/admin/tabs/products-tab"
import { ReportsTab } from "@/components/admin/tabs/reports-tab"
import { ReviewsTab } from "@/components/admin/tabs/reviews-tab"
import { SettingsTab } from "@/components/admin/tabs/settings-tab"
import { TrackingTab } from "@/components/admin/tabs/tracking-tab"
import { UsersTab } from "@/components/admin/tabs/users-tab"
import { AdminMemoryProvider } from "@/components/admin/admin-state"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteLogo } from "@/components/site-logo"
import { PLATFORM_NAME } from "@/lib/platform"
import { cn } from "@/lib/utils"

type AdminTabId =
  | "dashboard"
  | "orders"
  | "tracking"
  | "products"
  | "inventory"
  | "categories"
  | "brands"
  | "customers"
  | "carts"
  | "coupons"
  | "homepage"
  | "banners"
  | "reviews"
  | "blogs"
  | "payments"
  | "reports"
  | "users"
  | "settings"

type AdminTab = {
  id: AdminTabId
  label: string
  icon: React.ElementType
}

const adminTabs: AdminTab[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: ClipboardList },
  { id: "tracking", label: "Tracking", icon: Truck },
  { id: "products", label: "Products", icon: Package },
  { id: "inventory", label: "Inventory", icon: Boxes },
  { id: "categories", label: "Categories", icon: Tags },
  { id: "brands", label: "Brands", icon: Building2 },
  { id: "customers", label: "Customers", icon: Users },
  { id: "carts", label: "Carts", icon: ShoppingCart },
  { id: "coupons", label: "Coupons", icon: Percent },
  { id: "homepage", label: "Homepage CMS", icon: Home },
  { id: "banners", label: "Banners", icon: Image },
  { id: "reviews", label: "Reviews", icon: MessageSquareText },
  { id: "blogs", label: "Blogs", icon: Newspaper },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "users", label: "Users", icon: UserCog },
  { id: "settings", label: "Settings", icon: Settings },
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

function renderPanel(activeTab: AdminTabId) {
  switch (activeTab) {
    case "dashboard":
      return <DashboardTab />
    case "orders":
      return <OrdersTab />
    case "tracking":
      return <TrackingTab />
    case "products":
      return <ProductsTab />
    case "inventory":
      return <InventoryTab />
    case "categories":
      return <CategoriesTab />
    case "brands":
      return <BrandsTab />
    case "customers":
      return <CustomersTab />
    case "carts":
      return <CartsTab />
    case "coupons":
      return <CouponsTab />
    case "homepage":
      return <HomepageTab />
    case "banners":
      return <BannersTab />
    case "reviews":
      return <ReviewsTab />
    case "blogs":
      return <BlogsTab />
    case "payments":
      return <PaymentsTab />
    case "reports":
      return <ReportsTab />
    case "users":
      return <UsersTab />
    case "settings":
      return <SettingsTab />
  }
}

export function AdminPortal() {
  const [activeTab, setActiveTab] = React.useState<AdminTabId>("dashboard")
  const [alertsOpen, setAlertsOpen] = React.useState(false)
  const shouldReduceMotion = useReducedMotion()
  const activeTabData =
    adminTabs.find((tab) => tab.id === activeTab) ?? adminTabs[0]
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <AdminMemoryProvider>
    <main className="min-h-screen bg-[#f5f6f8] text-[#101322]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-[#e4e6eb] bg-white lg:sticky lg:top-0 lg:h-screen">
          <div className="flex h-full flex-col">
            <div className="border-b border-[#eef0f4] p-4">
              <SiteLogo />
              <div className="mt-4 rounded-[8px] bg-[#101322] p-3 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                  Admin portal
                </p>
                <p className="mt-1 font-black">{PLATFORM_NAME}</p>
              </div>
            </div>

            <nav className="scrollbar-none flex gap-2 overflow-x-auto p-3 lg:block lg:space-y-1 lg:overflow-y-auto">
              {adminTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex h-10 shrink-0 items-center gap-3 rounded-[8px] px-3 text-sm font-bold transition lg:w-full",
                    activeTab === tab.id
                      ? "bg-[#fff6ed] text-[#f97316]"
                      : "text-slate-600 hover:bg-[#f6f7f9] hover:text-[#101322]"
                  )}
                >
                  <tab.icon className="size-4" />
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="mt-auto hidden border-t border-[#eef0f4] p-4 lg:block">
              <Link
                href="/"
                className="flex h-10 items-center justify-center rounded-[8px] border border-[#e4e6eb] text-sm font-bold text-slate-600 transition hover:border-[#f97316]/50 hover:text-[#f97316]"
              >
                View storefront
              </Link>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-[#e4e6eb] bg-white/90 px-4 py-3 backdrop-blur-xl lg:px-6">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  Admin
                  <ChevronRight className="size-3" />
                  {activeTabData.label}
                </div>
                <h1 className="mt-1 text-2xl font-black tracking-tight text-[#101322]">
                  {activeTabData.label}
                </h1>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-80">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search orders, products, customers"
                    className="h-10 rounded-[8px] border-[#e4e6eb] bg-white pl-9"
                  />
                </div>
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setAlertsOpen((open) => !open)}
                    className="relative h-10 rounded-[8px] bg-white"
                    aria-expanded={alertsOpen}
                  >
                    <Bell className="size-4" />
                    Alerts
                    <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-rose-500 text-[11px] font-black text-white">
                      {notificationItems.length}
                    </span>
                  </Button>
                  <AnimatePresence>
                    {alertsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={transition}
                        className="absolute right-0 top-[calc(100%+10px)] z-50 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-[12px] border border-[#e4e6eb] bg-white shadow-2xl"
                      >
                        <div className="flex items-center justify-between border-b border-[#eef0f4] px-4 py-3">
                          <div>
                            <p className="text-lg font-black">Notifications</p>
                            <p className="text-xs font-semibold text-slate-400">
                              Admin alerts for today
                            </p>
                          </div>
                          <button
                            type="button"
                            className="text-xs font-black text-[#f97316]"
                          >
                            Mark all read
                          </button>
                        </div>
                        <div className="max-h-[420px] overflow-y-auto p-2" data-lenis-prevent>
                          {notificationItems.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              className="flex w-full gap-3 rounded-[8px] p-3 text-left transition hover:bg-[#f6f7f9]"
                              onClick={() => setAlertsOpen(false)}
                            >
                              <span className="mt-1 size-2.5 rounded-full bg-[#f97316]" />
                              <span className="min-w-0 flex-1">
                                <span className="block font-black text-[#101322]">
                                  {item.title}
                                </span>
                                <span className="mt-1 block text-sm leading-5 text-slate-500">
                                  {item.copy}
                                </span>
                                <span className="mt-1 block text-xs font-bold text-slate-400">
                                  {item.time}
                                </span>
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Button className="h-10 rounded-[8px] bg-[#f97316] text-white hover:bg-[#ea580c]">
                  <ShieldCheck className="size-4" />
                  Admin
                </Button>
              </div>
            </div>
          </header>

          <div className="p-4 lg:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
                transition={transition}
              >
                {renderPanel(activeTab)}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
    </AdminMemoryProvider>
  )
}
