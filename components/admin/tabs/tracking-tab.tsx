import { trackingTimeline } from "@/components/admin/admin-data"
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

const trackingFields: EditableField[] = [
  { key: "order", label: "Order ID" },
  { key: "courier", label: "Courier partner" },
  { key: "tracking", label: "Tracking number" },
  { key: "dispatch", label: "Dispatch date" },
  { key: "eta", label: "Estimated delivery" },
  { key: "status", label: "Current status", type: "select", options: ["Order Placed", "Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered"] },
  { key: "note", label: "Delivery notes", type: "textarea" },
]

const newTracking = {
  order: "ORD-NEW",
  courier: "Courier partner",
  tracking: "TRACK-000",
  dispatch: "17 Jun",
  eta: "18 Jun",
  status: "Order Placed",
  note: "Delivery note",
}

export function TrackingTab() {
  const { rows } = useAdminCollection("tracking")

  return (
    <div className="space-y-4">
      <Panel
        title="Tracking Management"
        description="Update courier, tracking number, ETA, and customer timeline"
        action={
          <ResourceControls
            collection="tracking"
            fields={trackingFields}
            newItem={newTracking}
            createLabel="Add tracking"
          />
        }
      >
        <TableShell columns={["Order", "Courier", "Tracking", "Dispatch", "ETA", "Status", "Notes", "Manage"]}>
          {rows.map((row) => (
            <TableRow key={String(row._id)} className="hover:bg-[#fbfbfa]">
              <Cell className="font-black text-[#2b0f52]">{row.order}</Cell>
              <Cell>{row.courier}</Cell>
              <Cell className="font-semibold text-slate-500">{row.tracking}</Cell>
              <Cell>{row.dispatch}</Cell>
              <Cell>{row.eta}</Cell>
              <Cell><StatusBadge status={String(row.status)} /></Cell>
              <Cell className="text-slate-500">{row.note}</Cell>
              <Cell><RowControls collection="tracking" row={row} fields={trackingFields} /></Cell>
            </TableRow>
          ))}
        </TableShell>
      </Panel>

      <Panel title="Customer Tracking Timeline" description="Status changes here are reflected on the order tracking page">
        <div className="grid gap-3 md:grid-cols-6">
          {trackingTimeline.map((step, index) => (
            <div key={step} className="rounded-[8px] border border-[#eef0f4] bg-[#fbfbfa] p-3">
              <span className="grid size-8 place-items-center rounded-full bg-[#2b0f52] text-xs font-black text-white">
                {index + 1}
              </span>
              <p className="mt-3 text-sm font-black text-[#101322]">{step}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}
