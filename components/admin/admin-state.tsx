"use client"

import * as React from "react"

import {
  banners,
  blogs,
  brands,
  carts,
  categories,
  coupons,
  customers,
  homepageSections,
  inventoryRows,
  orderRows,
  payments,
  productRows,
  questions,
  reports,
  reviews,
  settings,
  trackingRows,
  users,
} from "@/components/admin/admin-data"

export type AdminValue = string | number | boolean
export type AdminRow = Record<string, AdminValue>

export type AdminCollection =
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
  | "questions"
  | "blogs"
  | "payments"
  | "reports"
  | "users"
  | "settings"

type AdminMemoryState = Record<AdminCollection, AdminRow[]>
type UploadMemoryState = Partial<Record<AdminCollection, string>>

type AdminMemoryContextValue = {
  data: AdminMemoryState
  uploads: UploadMemoryState
  addRow: (collection: AdminCollection, row: AdminRow) => void
  updateRow: (collection: AdminCollection, id: string, row: AdminRow) => void
  deleteRow: (collection: AdminCollection, id: string) => void
  setUpload: (collection: AdminCollection, fileName: string) => void
}

const AdminMemoryContext =
  React.createContext<AdminMemoryContextValue | null>(null)

function withIds(rows: AdminRow[], prefix: AdminCollection) {
  return rows.map((row, index) => ({
    _id: `${prefix}-${index + 1}`,
    ...row,
  }))
}

const initialAdminData: AdminMemoryState = {
  orders: withIds(orderRows, "orders"),
  tracking: withIds(trackingRows, "tracking"),
  products: withIds(productRows, "products"),
  inventory: withIds(inventoryRows, "inventory"),
  categories: withIds(
    categories.map((name, index) => ({
      name,
      slug: name.toLowerCase().replaceAll(" ", "-"),
      status: "Active",
      sortOrder: index + 1,
    })),
    "categories"
  ),
  brands: withIds(brands, "brands"),
  customers: withIds(customers, "customers"),
  carts: withIds(carts, "carts"),
  coupons: withIds(coupons, "coupons"),
  homepage: withIds(homepageSections, "homepage"),
  banners: withIds(banners, "banners"),
  reviews: withIds(reviews, "reviews"),
  questions: withIds(questions, "questions"),
  blogs: withIds(blogs, "blogs"),
  payments: withIds(payments, "payments"),
  reports: withIds(reports, "reports"),
  users: withIds(users, "users"),
  settings: withIds(settings, "settings"),
}

function createId(collection: AdminCollection) {
  return `${collection}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function AdminMemoryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [data, setData] = React.useState<AdminMemoryState>(initialAdminData)
  const [uploads, setUploads] = React.useState<UploadMemoryState>({})

  const addRow = React.useCallback(
    (collection: AdminCollection, row: AdminRow) => {
      setData((current) => ({
        ...current,
        [collection]: [
          { ...row, _id: createId(collection) },
          ...current[collection],
        ],
      }))
    },
    []
  )

  const updateRow = React.useCallback(
    (collection: AdminCollection, id: string, row: AdminRow) => {
      setData((current) => ({
        ...current,
        [collection]: current[collection].map((item) =>
          item._id === id ? { ...item, ...row, _id: id } : item
        ),
      }))
    },
    []
  )

  const deleteRow = React.useCallback(
    (collection: AdminCollection, id: string) => {
      setData((current) => ({
        ...current,
        [collection]: current[collection].filter((item) => item._id !== id),
      }))
    },
    []
  )

  const setUpload = React.useCallback(
    (collection: AdminCollection, fileName: string) => {
      setUploads((current) => ({ ...current, [collection]: fileName }))
    },
    []
  )

  const value = React.useMemo(
    () => ({ data, uploads, addRow, updateRow, deleteRow, setUpload }),
    [addRow, data, deleteRow, setUpload, updateRow, uploads]
  )

  return (
    <AdminMemoryContext.Provider value={value}>
      {children}
    </AdminMemoryContext.Provider>
  )
}

export function useAdminCollection(collection: AdminCollection) {
  const context = React.useContext(AdminMemoryContext)

  if (!context) {
    throw new Error("useAdminCollection must be used inside AdminMemoryProvider")
  }

  return {
    rows: context.data[collection],
    upload: context.uploads[collection],
    addRow: (row: AdminRow) => context.addRow(collection, row),
    updateRow: (id: string, row: AdminRow) =>
      context.updateRow(collection, id, row),
    deleteRow: (id: string) => context.deleteRow(collection, id),
    setUpload: (fileName: string) => context.setUpload(collection, fileName),
  }
}
