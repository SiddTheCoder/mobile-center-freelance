"use client"

import * as React from "react"
import { motion } from "motion/react"
import {
  ChevronRight,
  Info,
  Shirt,
  ShoppingBag,
  Briefcase,
  Glasses,
  Crown,
  Activity,
} from "lucide-react"

// Categories grid with icons
const categoryIcons = [
  { icon: Shirt, label: "Bottoms" },
  { icon: Crown, label: "Coats" },
  { icon: ShoppingBag, label: "Jeans" },
  { icon: Activity, label: "Tops" },
  { icon: Briefcase, label: "T-shirts" },
  { icon: Glasses, label: "Accessories" },
]

export function DashboardTab() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Recent activity</h1>
      </div>

      {/* Row 1: Metric Cards Grid */}
      <div className="flex items-center gap-4 w-full overflow-x-auto pb-1 scrollbar-none">
        <div className="grid grid-cols-5 gap-4 flex-grow min-w-[720px]">
          {[
            { value: "741", label: "NEW ITEMS" },
            { value: "123", label: "NEW ORDERS" },
            { value: "12", label: "REFUNDS" },
            { value: "1", label: "MESSAGE" },
            { value: "4", label: "GROUPS" },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
              className="bg-white border border-slate-150 rounded-2xl p-4.5 shadow-[0_2px_8px_rgba(0,0,0,0.015)] flex flex-col items-center text-center"
            >
              <span className="text-2xl font-bold text-orange-600 tracking-tight">
                {metric.value}
              </span>
              <span className="text-xs text-slate-400 font-semibold mt-1">Qty</span>
              <span className="text-[10px] font-bold text-slate-600 tracking-wider mt-2.5">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
        {/* Next Arrow Icon */}
        <button
          type="button"
          className="size-9 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center hover:bg-orange-200 transition-colors flex-shrink-0"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Row 2: Sales Chart & Top Item Categories */}
      <div className="grid gap-6 md:grid-cols-[1.6fr_1fr]">
        {/* Sales Chart Card */}
        <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
          <h2 className="text-sm font-bold text-slate-800">Sales</h2>
          
          <div className="relative h-44 mt-5 flex flex-col justify-between">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-slate-100 w-full" />
              <div className="border-b border-slate-100 w-full" />
              <div className="border-b border-slate-100 w-full" />
              <div className="border-b border-slate-100 w-full" />
              <div className="border-b border-slate-800 w-full" />
            </div>

            {/* Bars */}
            <div className="relative z-10 flex h-full items-end justify-around px-8 pb-2">
              {[
                { label: "Confirmed", value: 65, color: "bg-orange-600" },
                { label: "Packed", value: 80, color: "bg-orange-600" },
                { label: "Refunded", value: 25, color: "bg-orange-100" },
                { label: "Shipped", value: 95, color: "bg-orange-600" },
              ].map((bar) => (
                <div key={bar.label} className="flex flex-col items-center h-full justify-end w-14">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      height: `${bar.value}%`,
                      transformOrigin: "bottom",
                    }}
                    className={`w-5 rounded-t ${bar.color} hover:opacity-85 transition-opacity`}
                  />
                </div>
              ))}
            </div>

            {/* Labels under the axis */}
            <div className="flex justify-around text-xs font-semibold text-slate-500 pt-1.5">
              <span>Confirmed</span>
              <span>Packed</span>
              <span>Refunded</span>
              <span>Shipped</span>
            </div>
          </div>
        </div>

        {/* Top Item Categories Card */}
        <div className="bg-white border border-slate-155 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.015)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">Top item categories</h2>
            <button type="button" className="text-xs font-bold text-slate-400 hover:text-slate-600">
              VIEW ALL
            </button>
          </div>

          <div className="flex items-center gap-4 mt-5">
            <div className="grid grid-cols-3 gap-2.5 flex-grow">
              {categoryIcons.map((item, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 hover:bg-orange-200 transition-colors"
                >
                  <item.icon className="size-6" />
                </div>
              ))}
            </div>
            {/* Arrow Button */}
            <button
              type="button"
              className="size-9 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center hover:bg-orange-200 transition-colors flex-shrink-0"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Stock Numbers & Stores List */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Stock Numbers Card */}
        <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
          <h2 className="text-sm font-bold text-slate-800 mb-4">Stock numbers</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm py-1.5 border-b border-slate-50">
              <span className="font-semibold text-orange-600 flex items-center gap-1">
                Low stock items
              </span>
              <div className="flex items-center gap-1.5 text-orange-600">
                <span className="font-bold">12</span>
                <Info className="size-4.5" />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm py-1.5 border-b border-slate-50">
              <span className="font-medium text-slate-650">Item categories</span>
              <span className="font-bold text-slate-700">6</span>
            </div>
            <div className="flex items-center justify-between text-sm py-1.5">
              <span className="font-medium text-slate-655">Refunded items</span>
              <span className="font-bold text-slate-700">1</span>
            </div>
          </div>
        </div>

        {/* Stores List Card */}
        <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800">Stores list</h2>
            <button type="button" className="text-xs font-bold text-slate-400 hover:text-slate-600">
              VIEW ALL
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { name: "Manchester, UK", employees: "23 employees", items: "308 items", orders: "2 orders" },
              { name: "Yorkshire, UK", employees: "11 employees", items: "291 items", orders: "15 orders" },
              { name: "Hull, UK", employees: "5 employees", items: "41 items", orders: "11 orders" },
              { name: "Leicester, UK", employees: "16 employees", items: "261 items", orders: "8 orders" },
            ].map((store, i) => (
              <div key={i} className="flex justify-between items-center py-0.5 text-slate-600 border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                <span className="font-semibold text-slate-800 min-w-[120px]">{store.name}</span>
                <span className="text-slate-500">{store.employees}</span>
                <span className="text-slate-500">{store.items}</span>
                <span className="text-slate-500">{store.orders}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
