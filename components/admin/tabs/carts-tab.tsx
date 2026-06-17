import { useAdminCollection } from "@/components/admin/admin-state"
import {
  Cell,
  type EditableField,
  Panel,
  ResourceControls,
  RowControls,
  TableShell,
} from "@/components/admin/admin-shared"
import { formatPrice } from "@/lib/products"

const cartFields: EditableField[] = [
  { key: "owner", label: "Customer / Guest" },
  { key: "products", label: "Products", type: "textarea" },
  { key: "value", label: "Cart value", type: "number" },
  { key: "activity", label: "Last activity" },
  { key: "checkout", label: "Checkout" },
  { key: "recovery", label: "Recovery status" },
]

const newCart = {
  owner: "Guest #0000",
  products: "Product name",
  value: 0,
  activity: "Just now",
  checkout: "Not started",
  recovery: "Pending",
}

export function CartsTab() {
  const { rows } = useAdminCollection("carts")

  return (
    <Panel
      title="Carts / Abandoned Carts"
      description="Cart recovery, guest carts, logged-in carts, and checkout intent"
      action={
        <ResourceControls
          collection="carts"
          fields={cartFields}
          newItem={newCart}
          createLabel="Add cart"
        />
      }
    >
      <TableShell columns={["Customer / Guest", "Products", "Cart value", "Last activity", "Checkout", "Recovery", "Manage"]}>
        {rows.map((cart) => (
          <tr key={String(cart._id)} className="hover:bg-[#fbfbfa]">
            <Cell className="font-black">{cart.owner}</Cell>
            <Cell className="text-slate-500">{cart.products}</Cell>
            <Cell className="font-black">{formatPrice(Number(cart.value))}</Cell>
            <Cell>{cart.activity}</Cell>
            <Cell>{cart.checkout}</Cell>
            <Cell>{cart.recovery}</Cell>
            <Cell><RowControls collection="carts" row={cart} fields={cartFields} /></Cell>
          </tr>
        ))}
      </TableShell>
    </Panel>
  )
}
