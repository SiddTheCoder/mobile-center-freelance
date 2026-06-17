import { useAdminCollection } from "@/components/admin/admin-state"
import {
  type EditableField,
  Panel,
  ResourceControls,
  RowControls,
} from "@/components/admin/admin-shared"

const reportFields: EditableField[] = [
  { key: "name", label: "Report name" },
  { key: "value", label: "Value" },
  { key: "trend", label: "Trend" },
  { key: "note", label: "Note", type: "textarea" },
]

const newReport = {
  name: "New report",
  value: "0",
  trend: "+0%",
  note: "Report note",
}

export function ReportsTab() {
  const { rows } = useAdminCollection("reports")

  return (
    <Panel
      title="Reports / Analytics"
      description="Sales, products, customers, coupons, inventory, delivery, and payment reports"
      action={
        <ResourceControls
          collection="reports"
          fields={reportFields}
          newItem={newReport}
          createLabel="Add report"
        />
      }
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {rows.map((report) => (
          <div key={String(report._id)} className="rounded-[8px] border border-[#eef0f4] p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-slate-500">{report.name}</p>
              <RowControls collection="reports" row={report} fields={reportFields} />
            </div>
            <p className="mt-2 text-2xl font-black text-[#101322]">{report.value}</p>
            <p className="mt-2 text-sm font-bold text-[#f97316]">{report.trend}</p>
            <p className="mt-1 text-xs text-slate-400">{report.note}</p>
          </div>
        ))}
      </div>
    </Panel>
  )
}
