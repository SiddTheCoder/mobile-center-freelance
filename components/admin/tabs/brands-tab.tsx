"use client"

import * as React from "react"
import {
  Search,
  X,
} from "lucide-react"

import { useAdminCollection } from "@/components/admin/admin-state"
import {
  type EditableField,
  ResourceControls,
  RowControls,
} from "@/components/admin/admin-shared"
import { Input } from "@/components/ui/input"

const storeFields: EditableField[] = [
  { key: "name", label: "Store Name" },
  { key: "location", label: "Location/City" },
  { key: "employees", label: "Employees count", type: "number" },
  { key: "items", label: "Items count", type: "number" },
  { key: "orders", label: "Orders count", type: "number" },
  { key: "refunds", label: "Refunds count", type: "number" },
  { key: "status", label: "Status", type: "select", options: ["Open", "Closed"] },
]

const newStore = {
  name: "New Store, UK",
  location: "UK",
  employees: 10,
  items: 150,
  orders: 0,
  refunds: 0,
  status: "Open",
}

// Stores metadata containing images and details
const STORES_DATA: Record<string, {
  image: string
  interiors: string[]
  mostSold: string
  popularCategory: string
  satisfaction: string
}> = {
  "Manchester, UK": {
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=300&auto=format&fit=crop&q=60",
    interiors: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200",
    ],
    mostSold: "Unisex T-shirt White",
    popularCategory: "T-shirts",
    satisfaction: "93%",
  },
  "Yorkshire, UK": {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&auto=format&fit=crop&q=60",
    interiors: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200",
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=200",
      "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=200",
    ],
    mostSold: "Rain Jacket Male",
    popularCategory: "Outwear",
    satisfaction: "89%",
  },
  "Hull, UK": {
    image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=300&auto=format&fit=crop&q=60",
    interiors: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200",
    ],
    mostSold: "Unisex Socks Black",
    popularCategory: "Accessories",
    satisfaction: "95%",
  },
  "Leicester, UK": {
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&auto=format&fit=crop&q=60",
    interiors: [
      "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=200",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200",
    ],
    mostSold: "Unisex T-shirt Black",
    popularCategory: "T-shirts",
    satisfaction: "91%",
  },
}

export function BrandsTab() {
  const { rows } = useAdminCollection("brands")
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedStoreId, setSelectedStoreId] = React.useState<string | null>("brands-1")
  const [showDetail, setShowDetail] = React.useState(true)

  // Map rows to display format
  const stores = rows.map((row, idx) => {
    const name = String(row.name);
    const meta = STORES_DATA[name] || {
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=300",
      interiors: [
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200",
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200",
      ],
      mostSold: "Unisex T-shirt White",
      popularCategory: "T-shirts",
      satisfaction: "90%",
    };

    return {
      id: String(row._id),
      name: name,
      employees: row.employees || (idx === 0 ? 23 : idx === 1 ? 11 : idx === 2 ? 5 : 16),
      items: row.products || (idx === 0 ? 308 : idx === 1 ? 291 : idx === 2 ? 41 : 261),
      orders: idx === 0 ? 2 : idx === 1 ? 15 : idx === 2 ? 11 : 8,
      refunds: idx === 0 ? 1 : idx === 1 ? 2 : idx === 2 ? 0 : 1,
      status: row.status === "Closed" ? "Closed" : "Open",
      ...meta,
    }
  })

  const filteredStores = stores.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeStore = stores.find((s) => s.id === selectedStoreId) || stores[0]

  return (
    <div className="space-y-6">
      {/* Title & Controls Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Stores</h1>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-orange-500" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="h-10 rounded-full border-slate-200 bg-white pl-9 pr-4 text-sm focus-visible:border-orange-500 focus-visible:ring-orange-500/20"
            />
          </div>

          {/* Filter by */}
          <select
            className="h-10 rounded-full border-0 bg-orange-100 px-4 text-sm font-semibold text-orange-700 hover:bg-orange-200 transition-colors focus:ring-0 outline-none cursor-pointer"
          >
            <option value="All">Filter by: All</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          {/* Add store button */}
          <ResourceControls
            collection="brands"
            fields={storeFields}
            newItem={newStore}
            createLabel="Add Store"
          />
        </div>
      </div>

      {/* Stores Horizontal Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {filteredStores.slice(0, 4).map((store) => {
          const isSelected = store.id === selectedStoreId && showDetail
          return (
            <div
              key={store.id}
              onClick={() => {
                setSelectedStoreId(store.id)
                setShowDetail(true)
              }}
              className={`bg-white border rounded-2xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.015)] cursor-pointer transition-all duration-200 flex flex-col gap-3 ${
                isSelected
                  ? "border-orange-300 bg-orange-50/40"
                  : "border-slate-150 hover:border-orange-200"
              }`}
            >
              {/* Store Photo */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Title & Info */}
              <div className="flex justify-between items-center px-0.5">
                <span className="font-semibold text-slate-800 text-sm">{store.name}</span>
                {/* Inline controls */}
                <div onClick={(e) => e.stopPropagation()}>
                  <RowControls
                    collection="brands"
                    row={rows.find((r) => String(r._id) === store.id) || rows[0]}
                    fields={storeFields}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Store Detailed Panel */}
      {showDetail && activeStore && (
        <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.015)] relative mt-5">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setShowDetail(false)}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-655 size-7 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="size-4.5" />
          </button>

          {/* Store name title */}
          <h2 className="text-base font-bold text-slate-800 mb-4">{activeStore.name}</h2>

          {/* Interior Photos Grid */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mb-6">
            {activeStore.interiors.map((url, index) => (
              <div key={index} className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                <img
                  src={url}
                  alt={`${activeStore.name} interior ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Store detailed metrics */}
          <div className="grid gap-8 sm:grid-cols-2 max-w-2xl text-sm">
            {/* Left Metrics column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="font-medium text-slate-500">Employees:</span>
                <span className="font-bold text-slate-850">{activeStore.employees}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="font-medium text-slate-500">Items:</span>
                <span className="font-bold text-slate-850">{activeStore.items}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="font-medium text-slate-500">Orders:</span>
                <span className="font-bold text-slate-850">{activeStore.orders}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="font-medium text-slate-500">Refunds:</span>
                <span className="font-bold text-slate-850">{activeStore.refunds}</span>
              </div>
            </div>

            {/* Right Info column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="font-medium text-slate-500">Most sold items:</span>
                <span className="font-bold text-orange-600 cursor-pointer hover:underline">{activeStore.mostSold}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="font-medium text-slate-500">Most popular category:</span>
                <span className="font-bold text-orange-600 cursor-pointer hover:underline">{activeStore.popularCategory}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="font-medium text-slate-500">Customer satisfaction:</span>
                <span className="font-bold text-slate-850">{activeStore.satisfaction}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="font-medium text-slate-500">Status:</span>
                <span className="font-bold text-emerald-600">{activeStore.status}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
