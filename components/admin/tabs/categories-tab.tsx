"use client"

import * as React from "react"
import {
  Shirt,
  ShoppingBag,
  Briefcase,
  Glasses,
  Crown,
  Activity,
  Layers,
} from "lucide-react"

import { useAdminCollection } from "@/components/admin/admin-state"
import {
  type EditableField,
  ResourceControls,
  RowControls,
} from "@/components/admin/admin-shared"

const categoryFields: EditableField[] = [
  { key: "name", label: "Category name" },
  { key: "slug", label: "Slug" },
  { key: "status", label: "Status", type: "select", options: ["Active", "Draft"] },
  { key: "sortOrder", label: "Sort order", type: "number" },
]

const newCategory = {
  name: "New Category",
  slug: "new-category",
  status: "Active",
  sortOrder: 99,
}

// Map category names to icons
function getCategoryIcon(name: string) {
  const norm = name.toLowerCase();
  if (norm.includes("bottom")) return Shirt;
  if (norm.includes("coat") || norm.includes("jacket")) return Crown;
  if (norm.includes("jean")) return ShoppingBag;
  if (norm.includes("top")) return Activity;
  if (norm.includes("t-shirt") || norm.includes("shirt")) return Briefcase;
  if (norm.includes("accessor") || norm.includes("glass")) return Glasses;
  return Layers;
}

export function CategoriesTab() {
  const { rows } = useAdminCollection("categories")

  return (
    <div className="space-y-6">
      {/* Custom Title and Add button Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Categories</h1>
          <p className="text-xs text-slate-450 font-medium mt-0.5">
            Last update January 29, 2023 at 2:39PM
          </p>
        </div>
        <div>
          <ResourceControls
            collection="categories"
            fields={categoryFields}
            newItem={newCategory}
            createLabel="Add Category"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {rows.map((category, index) => {
          const IconComponent = getCategoryIcon(String(category.name));
          return (
            <div
              key={String(category._id)}
              className="bg-white border border-slate-150 rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.015)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition flex flex-col justify-between"
            >
              {/* Orange banner block */}
              <div className="h-32 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
                <IconComponent className="size-10" />
              </div>

              {/* Title & Stats */}
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{category.name}</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    {Number(category.sortOrder || 10) + index} items
                  </p>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  <RowControls
                    collection="categories"
                    row={category}
                    fields={categoryFields}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
