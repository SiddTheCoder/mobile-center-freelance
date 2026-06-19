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
import { formatPrice } from "@/lib/products"

const orderFields: EditableField[] = [
  { key: "id", label: "Order ID" },
  { key: "customer", label: "Customer" },
  { key: "phone", label: "Phone" },
  { key: "products", label: "Products", type: "textarea" },
  { key: "amount", label: "Amount", type: "number" },
  { key: "payment", label: "Payment method" },
  { key: "paymentStatus", label: "Payment status", type: "select", options: ["Paid", "Review", "COD Pending", "Failed", "Refunded"] },
  { key: "orderStatus", label: "Order status", type: "select", options: ["Pending", "Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled", "Returned", "Refunded"] },
  { key: "deliveryStatus", label: "Delivery status" },
  { key: "date", label: "Date" },
]

const newOrder = {
  id: "ORD-NEW",
  customer: "New Customer",
  phone: "98XXXXXXXX",
  products: "Product name",
  amount: 0,
  payment: "COD",
  paymentStatus: "COD Pending",
  orderStatus: "Pending",
  deliveryStatus: "Not dispatched",
  date: "17 Jun 2026",
}

export function OrdersTable({ compact = false }: { compact?: boolean }) {
  const { rows } = useAdminCollection("orders")
  const columns = compact
    ? ["Order", "Customer", "Products", "Amount", "Payment", "Fulfillment", "Manage"]
    : [
        "Order ID",
        "Customer",
        "Phone",
        "Products",
        "Amount",
        "Payment",
        "Order",
        "Delivery",
        "Date",
        "Manage",
      ]

  return (
    <Panel
      title={compact ? "Recent Orders" : "Orders"}
      description="Customer order, payment, and fulfillment status"
      action={!compact &&
        <div className="flex flex-col gap-2 sm:flex-row">
          <ResourceControls
            collection="orders"
            fields={orderFields}
            newItem={newOrder}
            createLabel="Add order"
          />
          <Button className="h-9 rounded-[8px] bg-[#101322] text-white hover:bg-[#d99056]">
            Export
          </Button>
        </div>
      }
    >
      <TableShell columns={columns}>
        {rows.map((order) => (
          <TableRow key={String(order._id)} className="hover:bg-[#fbfbfa]">
            <Cell>
              <span className="font-black text-[#2b0f52]">{order.id}</span>
            </Cell>
            <Cell>
              <span className="font-bold text-[#101322]">{order.customer}</span>
            </Cell>
            {!compact && <Cell className="text-slate-500">{order.phone}</Cell>}
            <Cell className="max-w-[220px] text-slate-500">
              {order.products}
            </Cell>
            <Cell className="font-black">{formatPrice(Number(order.amount))}</Cell>
            <Cell>
              <div className="space-y-1">
                <span className="block font-semibold">{order.payment}</span>
                <StatusBadge status={String(order.paymentStatus)} />
              </div>
            </Cell>
            {!compact && (
              <Cell>
              <StatusBadge status={String(order.orderStatus)} />
              </Cell>
            )}
            <Cell>
              {compact ? (
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={String(order.orderStatus)} />
                  <StatusBadge status={String(order.deliveryStatus)} />
                </div>
              ) : (
                <StatusBadge status={String(order.deliveryStatus)} />
              )}
            </Cell>
            {!compact && <Cell className="text-slate-500">{order.date}</Cell>}
            <Cell>
              <RowControls collection="orders" row={order} fields={orderFields} />
            </Cell>
          </TableRow>
        ))}
      </TableShell>
    </Panel>
  )
}

export function OrdersTab() {
  return <OrdersTable />
}
