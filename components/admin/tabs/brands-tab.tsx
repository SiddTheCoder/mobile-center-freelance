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

const brandFields: EditableField[] = [
  { key: "name", label: "Brand name" },
  { key: "slug", label: "Slug" },
  { key: "products", label: "Product count", type: "number" },
  { key: "status", label: "Status", type: "select", options: ["Active", "Featured", "Draft"] },
]

const newBrand = {
  name: "New Brand",
  slug: "new-brand",
  products: 0,
  status: "Active",
}

export function BrandsTab() {
  const { rows } = useAdminCollection("brands")

  return (
    <Panel
      title="Brand Manager"
      description="Featured toggles, logos, slugs, descriptions, and publish status"
      action={
        <ResourceControls
          collection="brands"
          fields={brandFields}
          newItem={newBrand}
          createLabel="Add brand"
        />
      }
    >
      <TableShell columns={["Brand", "Slug", "Products", "Status", "Featured", "Manage"]}>
        {rows.map((brand) => (
          <tr key={String(brand._id)} className="hover:bg-[#fbfbfa]">
            <Cell className="font-black">{brand.name}</Cell>
            <Cell className="text-slate-500">/{brand.slug}</Cell>
            <Cell>{brand.products}</Cell>
            <Cell><StatusBadge status={String(brand.status)} /></Cell>
            <Cell>{brand.status === "Featured" ? "Yes" : "No"}</Cell>
            <Cell><RowControls collection="brands" row={brand} fields={brandFields} /></Cell>
          </tr>
        ))}
      </TableShell>
    </Panel>
  )
}
