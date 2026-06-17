import { motion } from "motion/react"
import {
  Activity,
  Bell,
  Boxes,
  ClipboardList,
  Gauge,
  Truck,
  Users,
  WalletCards,
} from "lucide-react"

import { revenueBars } from "@/components/admin/admin-data"
import { useAdminCollection } from "@/components/admin/admin-state"
import { Panel } from "@/components/admin/admin-shared"
import { OrdersTable } from "@/components/admin/tabs/orders-tab"
import { formatPrice } from "@/lib/products"

const metricCards = [
  { label: "Today's sales", value: formatPrice(584500), delta: "+16%", icon: WalletCards },
  { label: "Total orders", value: "1,248", delta: "+32", icon: ClipboardList },
  { label: "Pending orders", value: "18", delta: "Needs action", icon: Bell },
  { label: "Processing", value: "27", delta: "Packed today", icon: Gauge },
  { label: "Delivered", value: "842", delta: "93% on time", icon: Truck },
  { label: "Cancelled", value: "11", delta: "-4%", icon: Activity },
  { label: "Low stock", value: "9", delta: "Restock", icon: Boxes },
  { label: "Customers", value: "3,904", delta: "+88", icon: Users },
]

function TopProductsPanel() {
  const { rows } = useAdminCollection("products")

  return (
    <Panel title="Top-Selling Products" description="Best performers this month">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {rows.slice(0, 4).map((product, index) => (
          <div
            key={String(product._id)}
            className="grid min-h-28 grid-cols-[40px_1fr] items-center gap-3 rounded-[8px] border border-[#eef0f4] p-4"
          >
            <span className="grid size-10 place-items-center rounded-[8px] bg-[#f5f2ff] text-sm font-black text-[#2b0f52]">
              {index + 1}
            </span>
            <div className="min-w-0">
              <p className="truncate font-bold text-[#101322]">
                {product.name}
              </p>
              <p className="text-xs text-slate-400">
                {product.category} - {product.brand}
              </p>
              <p className="mt-2 font-black text-[#f97316]">
                {formatPrice(Number(product.sale))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

export function DashboardTab() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.025, duration: 0.25 }}
            className="rounded-[8px] border border-[#e7e8ec] bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-[8px] bg-[#fff6ed] text-[#f97316]">
                <metric.icon className="size-4" />
              </span>
              <span className="text-xs font-bold text-slate-400">
                {metric.delta}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-500">
              {metric.label}
            </p>
            <p className="mt-1 text-2xl font-black tracking-tight text-[#101322]">
              {metric.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel title="Revenue Chart" description="Dummy weekly revenue health check">
          <div className="relative h-72 overflow-hidden rounded-[8px] bg-[linear-gradient(180deg,#fbfbfa_0%,#ffffff_100%)] px-4 pb-8 pt-5">
            <div className="absolute inset-x-4 top-5 h-px bg-[#eef0f4]" />
            <div className="absolute inset-x-4 top-1/3 h-px bg-[#eef0f4]" />
            <div className="absolute inset-x-4 top-2/3 h-px bg-[#eef0f4]" />
            <div className="relative z-10 flex h-full items-end gap-3">
            {revenueBars.map((bar) => (
              <div key={bar.day} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ height: `${bar.value}%`, transformOrigin: "bottom" }}
                  className="min-h-6 w-full rounded-t-[8px] bg-[linear-gradient(180deg,#f97316,#5531d4)] shadow-lg shadow-orange-500/10"
                />
                <span className="text-xs font-bold text-slate-400">{bar.day}</span>
              </div>
            ))}
            </div>
          </div>
        </Panel>

        <Panel title="Store Alerts" description="Pending reviews, low stock, abandoned carts">
          <div className="space-y-3">
            {[
              ["Low stock products", "9 SKUs need restock before weekend"],
              ["Pending Q&A", "2 product questions waiting for answer"],
              ["Abandoned carts", "3 high-value carts need recovery"],
              ["EMI approvals", "1 customer document review pending"],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-[8px] border border-[#eef0f4] p-3">
                <p className="font-bold text-[#101322]">{title}</p>
                <p className="mt-1 text-sm text-slate-500">{copy}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <TopProductsPanel />
      <OrdersTable compact />
    </div>
  )
}
