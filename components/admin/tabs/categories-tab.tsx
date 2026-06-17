import { Tags } from "lucide-react"

import { useAdminCollection } from "@/components/admin/admin-state"
import {
  type EditableField,
  Panel,
  ResourceControls,
  RowControls,
  StatusBadge,
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

export function CategoriesTab() {
  const { rows } = useAdminCollection("categories")

  return (
    <Panel
      title="Category Manager"
      description="Manage icon, slug, parent, homepage visibility, sort order, and SEO"
      action={
        <ResourceControls
          collection="categories"
          fields={categoryFields}
          newItem={newCategory}
          createLabel="Add category"
        />
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {rows.map((category, index) => (
          <div key={String(category._id)} className="rounded-[8px] border border-[#eef0f4] bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="grid size-9 place-items-center rounded-[8px] bg-[#fff6ed] text-[#f97316]">
                <Tags className="size-4" />
              </span>
              <span className="text-xs font-black text-slate-400">#{index + 1}</span>
            </div>
            <p className="mt-4 font-black text-[#101322]">{category.name}</p>
            <p className="mt-1 text-sm text-slate-500">
              /{category.slug}
            </p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <StatusBadge status={String(category.status)} />
              <RowControls collection="categories" row={category} fields={categoryFields} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
