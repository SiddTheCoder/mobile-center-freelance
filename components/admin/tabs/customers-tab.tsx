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
import { formatPrice } from "@/lib/products"

const customerFields: EditableField[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "orders", label: "Orders", type: "number" },
  { key: "spent", label: "Total spent", type: "number" },
  { key: "status", label: "Status", type: "select", options: ["Active", "VIP", "EMI Review", "Blocked"] },
]

const newCustomer = {
  name: "New Customer",
  email: "customer@example.com",
  phone: "98XXXXXXXX",
  orders: 0,
  spent: 0,
  status: "Active",
}

export function CustomersTab() {
  const { rows } = useAdminCollection("customers")

  return (
    <Panel
      title="Customers"
      description="Profiles, addresses, order history, wishlist, cart history, and support notes"
      action={
        <ResourceControls
          collection="customers"
          fields={customerFields}
          newItem={newCustomer}
          createLabel="Add customer"
        />
      }
    >
      <TableShell columns={["Name", "Email", "Phone", "Orders", "Total spent", "Status", "Manage"]}>
        {rows.map((customer) => (
          <TableRow key={String(customer._id)} className="hover:bg-[#fbfbfa]">
            <Cell className="font-black">{customer.name}</Cell>
            <Cell className="text-slate-500">{customer.email}</Cell>
            <Cell>{customer.phone}</Cell>
            <Cell>{customer.orders}</Cell>
            <Cell className="font-black">{formatPrice(Number(customer.spent))}</Cell>
            <Cell><StatusBadge status={String(customer.status)} /></Cell>
            <Cell><RowControls collection="customers" row={customer} fields={customerFields} /></Cell>
          </TableRow>
        ))}
      </TableShell>
    </Panel>
  )
}
