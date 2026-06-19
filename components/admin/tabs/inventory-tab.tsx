import { useAdminCollection } from "@/components/admin/admin-state"
import {
  Cell,
  type EditableField,
  Panel,
  ResourceControls,
  RowControls,
  StatusBadge,
  TableRow,
  TableShell,
} from "@/components/admin/admin-shared"
import { Button } from "@/components/ui/button"

const inventoryFields: EditableField[] = [
  { key: "sku", label: "SKU" },
  { key: "product", label: "Product" },
  { key: "current", label: "Current stock", type: "number" },
  { key: "sold", label: "Sold quantity", type: "number" },
  { key: "returned", label: "Returned quantity", type: "number" },
  { key: "damaged", label: "Damaged quantity", type: "number" },
  { key: "status", label: "Status", type: "select", options: ["In Stock", "Low Stock", "Out of Stock", "Sold Out", "Pre Order"] },
]

const newInventoryItem = {
  sku: "NEW-STOCK",
  product: "New stock item",
  current: 0,
  sold: 0,
  returned: 0,
  damaged: 0,
  status: "In Stock",
}

export function InventoryTab() {
  const { rows } = useAdminCollection("inventory")

  return (
    <Panel
      title="Inventory / Stock"
      description="Stock movement, low-stock alerts, returns, and damaged units"
      action={
        <div className="flex flex-col gap-2 sm:flex-row">
          <ResourceControls
            collection="inventory"
            fields={inventoryFields}
            newItem={newInventoryItem}
            createLabel="Add stock"
          />
          <Button className="h-9 rounded-[8px] bg-[#101322] text-white">
            Export stock report
          </Button>
        </div>
      }
    >
      <TableShell columns={["SKU", "Product", "Current", "Sold", "Returned", "Damaged", "Status", "Manage"]}>
        {rows.map((item) => (
          <TableRow key={String(item._id)} className="hover:bg-[#fbfbfa]">
            <Cell className="font-black text-[#2b0f52]">{item.sku}</Cell>
            <Cell className="font-bold">{item.product}</Cell>
            <Cell>{item.current}</Cell>
            <Cell>{item.sold}</Cell>
            <Cell>{item.returned}</Cell>
            <Cell>{item.damaged}</Cell>
            <Cell><StatusBadge status={String(item.status)} /></Cell>
            <Cell><RowControls collection="inventory" row={item} fields={inventoryFields} /></Cell>
          </TableRow>
        ))}
      </TableShell>
    </Panel>
  )
}
