import { ChevronRight, Settings } from "lucide-react"

import { useAdminCollection } from "@/components/admin/admin-state"
import {
  type EditableField,
  Panel,
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
    <Panel
      title="Settings"
      description="Store-wide configuration for profile, shipping, payments, invoices, SEO, notifications, policies"
      action={
        <ResourceControls
          collection="settings"
          fields={settingFields}
          newItem={newSetting}
          createLabel="Add setting"
        />
      }
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((setting) => (
          <div key={String(setting._id)} className="rounded-[8px] border border-[#eef0f4] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="grid size-9 place-items-center rounded-[8px] bg-[#f5f2ff] text-[#2b0f52]">
                <Settings className="size-4" />
              </span>
              <div className="flex items-center gap-1">
                <RowControls collection="settings" row={setting} fields={settingFields} />
                <ChevronRight className="size-4 text-slate-300" />
              </div>
            </div>
            <p className="mt-4 font-black text-[#101322]">{setting.group}</p>
            <p className="mt-1 text-sm text-slate-500">{setting.items}</p>
          </div>
        ))}
      </div>
    </Panel>
  )
}
