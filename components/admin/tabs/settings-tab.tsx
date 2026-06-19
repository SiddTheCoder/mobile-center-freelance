import { ChevronRight, Settings } from "lucide-react"

import { useAdminCollection } from "@/components/admin/admin-state"
import {
  type EditableField,
  ResourceControls,
  RowControls,
} from "@/components/admin/admin-shared"

const settingFields: EditableField[] = [
  { key: "group", label: "Settings group" },
  { key: "items", label: "Items", type: "textarea" },
]

const newSetting = {
  group: "New Setting",
  items: "Configuration fields",
}

export function SettingsTab() {
  const { rows } = useAdminCollection("settings")

  return (
    <div className="space-y-6">
      {/* Title block */}
      <div className="rounded-2xl bg-orange-100 border border-orange-200/50 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800">Personal Settings</h2>
            <p className="mt-1 max-w-2xl text-xs text-slate-500 font-medium">
              Store-wide configuration for profile, shipping, payments, invoices,
              SEO, notifications, and policies.
            </p>
          </div>
          <ResourceControls
            collection="settings"
            fields={settingFields}
            newItem={newSetting}
            createLabel="Add setting"
          />
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Name*", "Demo Admin"],
            ["Store", "Manchester, UK"],
            ["Company email*", "demo@online.com"],
            ["Role", "Manager"],
            ["Security", "********************"],
            ["Store code", "INVENTOR-MAIN"],
          ].map(([label, value]) => (
            <div key={label} className="text-sm">
              <p className="font-bold text-slate-500">{label}</p>
              <p className="mt-1 font-bold text-slate-805 text-slate-800">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Roles List */}
        <div className="rounded-2xl border border-slate-150 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-800">Role Config</h2>
            <Settings className="size-4.5 text-orange-600" />
          </div>
          <div className="space-y-3">
            {rows.map((setting) => (
              <div
                key={String(setting._id)}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="size-4.5 rounded border border-orange-300 bg-white" />
                  <div className="min-w-0 text-sm">
                    <p className="truncate font-bold text-slate-700">
                      {setting.group}
                    </p>
                    <p className="truncate text-xs text-slate-400 font-medium mt-0.5">
                      {setting.items}
                    </p>
                  </div>
                </div>
                <RowControls
                  collection="settings"
                  row={setting}
                  fields={settingFields}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Permissions Table */}
        <div className="rounded-2xl border border-slate-150 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-800">Permissions Matrix</h2>
            <ChevronRight className="size-4.5 text-orange-600" />
          </div>
          <div className="space-y-4">
            {["Customer", "Product", "User", "Supplier", "Store", "Billing"].map(
              (item, index) => (
                <div
                  key={item}
                  className="grid grid-cols-[1fr_repeat(4,48px)] items-center gap-2 text-sm font-semibold text-slate-650"
                >
                  <span className="font-bold text-slate-705">{item}</span>
                  {["View", "Edit", "Create", "Approval"].map((label, labelIndex) => (
                    <span
                      key={label}
                      className="h-4.5 rounded-full bg-orange-600 data-[off=true]:bg-slate-200"
                      data-off={index > 2 && labelIndex > 1}
                      title={label}
                      style={{
                        backgroundColor: (index > 2 && labelIndex > 1) ? "#e2e8f0" : "#ea580c"
                      }}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
