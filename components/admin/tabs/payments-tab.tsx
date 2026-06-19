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

const paymentFields: EditableField[] = [
  { key: "order", label: "Order ID" },
  { key: "customer", label: "Customer" },
  { key: "method", label: "Payment method" },
  { key: "status", label: "Status", type: "select", options: ["Unpaid", "Paid", "Failed", "Refunded", "Partially Refunded", "COD Pending", "Review"] },
  { key: "amount", label: "Amount", type: "number" },
  { key: "transaction", label: "Transaction ID" },
]

const newPayment = {
  order: "ORD-NEW",
  customer: "Customer",
  method: "COD",
  status: "Unpaid",
  amount: 0,
  transaction: "TXN-000",
}

export function PaymentsTab() {
  const { rows } = useAdminCollection("payments")

  return (
    <Panel
      title="Payments"
      description="Payment methods, transaction IDs, refunds, COD pending, and EMI payments"
      action={
        <ResourceControls
          collection="payments"
          fields={paymentFields}
          newItem={newPayment}
          createLabel="Add payment"
        />
      }
    >
      <TableShell columns={["Order", "Customer", "Method", "Status", "Amount", "Transaction", "Manage"]}>
        {rows.map((payment) => (
          <TableRow key={String(payment._id)} className="hover:bg-[#fbfbfa]">
            <Cell className="font-black text-[#2b0f52]">{payment.order}</Cell>
            <Cell>{payment.customer}</Cell>
            <Cell>{payment.method}</Cell>
            <Cell><StatusBadge status={String(payment.status)} /></Cell>
            <Cell className="font-black">{formatPrice(Number(payment.amount))}</Cell>
            <Cell className="text-slate-500">{payment.transaction}</Cell>
            <Cell><RowControls collection="payments" row={payment} fields={paymentFields} /></Cell>
          </TableRow>
        ))}
      </TableShell>
    </Panel>
  )
}
