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

const couponFields: EditableField[] = [
  { key: "code", label: "Coupon code" },
  { key: "type", label: "Discount type", type: "select", options: ["Percentage", "Fixed"] },
  { key: "value", label: "Discount value" },
  { key: "minimum", label: "Minimum order", type: "number" },
  { key: "usage", label: "Usage limit" },
  { key: "status", label: "Status", type: "select", options: ["Active", "Scheduled", "Draft", "Expired"] },
]

const newCoupon = {
  code: "NEWCODE",
  type: "Percentage",
  value: "5%",
  minimum: 0,
  usage: "0/100",
  status: "Draft",
}

export function CouponsTab() {
  const { rows } = useAdminCollection("coupons")

  return (
    <Panel
      title="Coupons / Discounts"
      description="Coupon codes, flash sales, product discounts, category discounts, and homepage deal sections"
      action={
        <ResourceControls
          collection="coupons"
          fields={couponFields}
          newItem={newCoupon}
          createLabel="Add coupon"
        />
      }
    >
      <TableShell columns={["Code", "Type", "Value", "Minimum order", "Usage", "Status", "Manage"]}>
        {rows.map((coupon) => (
          <tr key={String(coupon._id)} className="hover:bg-[#fbfbfa]">
            <Cell className="font-black text-[#2b0f52]">{coupon.code}</Cell>
            <Cell>{coupon.type}</Cell>
            <Cell className="font-black">{coupon.value}</Cell>
            <Cell>{formatPrice(Number(coupon.minimum))}</Cell>
            <Cell>{coupon.usage}</Cell>
            <Cell><StatusBadge status={String(coupon.status)} /></Cell>
            <Cell><RowControls collection="coupons" row={coupon} fields={couponFields} /></Cell>
          </tr>
        ))}
      </TableShell>
    </Panel>
  )
}
