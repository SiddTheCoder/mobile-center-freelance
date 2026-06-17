import { Package } from "lucide-react"

import { useAdminCollection } from "@/components/admin/admin-state"
import {
  Cell,
  type EditableField,
  Panel,
  ResourceControls,
  RowControls,
  StatusBadge,
  TableShell,
} from "@/components/admin/admin-shared"
import { formatPrice } from "@/lib/products"

const productFields: EditableField[] = [
  { key: "name", label: "Product name" },
  { key: "sku", label: "SKU" },
  { key: "category", label: "Category" },
  { key: "brand", label: "Brand" },
  { key: "price", label: "Regular price", type: "number" },
  { key: "sale", label: "Sale price", type: "number" },
  { key: "stock", label: "Stock", type: "number" },
  { key: "status", label: "Status", type: "select", options: ["Draft", "Published", "Low Stock", "Sold Out"] },
  { key: "featured", label: "Featured", type: "checkbox" },
]

const newProduct = {
  name: "New Product",
  sku: "NEW-SKU",
  category: "Laptop",
  brand: "Brand",
  price: 0,
  sale: 0,
  stock: 0,
  status: "Draft",
  featured: false,
}

export function ProductsTab() {
  const { rows } = useAdminCollection("products")

  return (
    <div className="space-y-4">
      <Panel
        title="Product List"
        description="Add, edit, duplicate, publish, unpublish, feature, or mark products sold out"
        action={
          <ResourceControls
            collection="products"
            fields={productFields}
            newItem={newProduct}
            createLabel="Add product"
          />
        }
      >
        <TableShell columns={["Product", "SKU", "Category", "Brand", "Price", "Sale", "Stock", "Status", "Featured", ""]}>
          {rows.map((product) => (
            <tr key={String(product._id)} className="hover:bg-[#fbfbfa]">
              <Cell>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-[8px] bg-[#f5f5f6]">
                    <Package className="size-4 text-slate-500" />
                  </span>
                  <span className="font-bold text-[#101322]">{product.name}</span>
                </div>
              </Cell>
              <Cell className="font-semibold text-slate-500">{product.sku}</Cell>
              <Cell>{product.category}</Cell>
              <Cell>{product.brand}</Cell>
              <Cell>{formatPrice(Number(product.price))}</Cell>
              <Cell className="font-black">{formatPrice(Number(product.sale))}</Cell>
              <Cell>{product.stock}</Cell>
              <Cell><StatusBadge status={String(product.status)} /></Cell>
              <Cell>{product.featured ? "Yes" : "No"}</Cell>
              <Cell>
                <RowControls collection="products" row={product} fields={productFields} />
              </Cell>
            </tr>
          ))}
        </TableShell>
      </Panel>

      <Panel title="Add/Edit Product Form Sections" description="The data groups the admin form should expose">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            "Basic Info",
            "Images / Gallery",
            "Pricing",
            "Inventory",
            "Variants",
            "Specifications",
            "Shipping & Warranty",
            "SEO",
            "Related Products",
            "Publish Settings",
          ].map((section) => (
            <div key={section} className="rounded-[8px] border border-[#eef0f4] p-3 font-bold">
              {section}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}
