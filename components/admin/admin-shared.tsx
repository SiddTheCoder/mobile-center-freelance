import * as React from "react"
import { Edit3, Plus, Trash2, Upload } from "lucide-react"

import {
  type AdminCollection,
  type AdminRow,
  type AdminValue,
  useAdminCollection,
} from "@/components/admin/admin-state"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type EditableField = {
  key: string
  label: string
  type?: "text" | "number" | "textarea" | "select" | "checkbox"
  options?: string[]
}

const statusTone: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Enabled: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Featured: "bg-violet-50 text-violet-700 ring-violet-200",
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Published: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  VIP: "bg-violet-50 text-violet-700 ring-violet-200",
  Packed: "bg-blue-50 text-blue-700 ring-blue-200",
  Shipped: "bg-blue-50 text-blue-700 ring-blue-200",
  "Out for Delivery": "bg-orange-50 text-orange-700 ring-orange-200",
  "Ready to ship": "bg-blue-50 text-blue-700 ring-blue-200",
  Review: "bg-amber-50 text-amber-700 ring-amber-200",
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Scheduled: "bg-blue-50 text-blue-700 ring-blue-200",
  Draft: "bg-slate-100 text-slate-600 ring-slate-200",
  Invited: "bg-slate-100 text-slate-600 ring-slate-200",
  "Low Stock": "bg-amber-50 text-amber-700 ring-amber-200",
  "Out of Stock": "bg-rose-50 text-rose-700 ring-rose-200",
  "Sold Out": "bg-rose-50 text-rose-700 ring-rose-200",
  "COD Pending": "bg-amber-50 text-amber-700 ring-amber-200",
  Verification: "bg-amber-50 text-amber-700 ring-amber-200",
  Answered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "EMI Review": "bg-amber-50 text-amber-700 ring-amber-200",
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-bold ring-1",
        statusTone[status] ?? "bg-slate-100 text-slate-600 ring-slate-200"
      )}
    >
      {status}
    </span>
  )
}

export function Panel({
  title,
  description,
  action,
  children,
}: {
  title: string
  description?: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-[8px] border border-[#e7e8ec] bg-white">
      <div className="flex flex-col gap-3 border-b border-[#eef0f4] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-black text-[#101322]">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </section>
  )
}

function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: EditableField
  value: AdminValue | undefined
  onChange: (value: AdminValue) => void
}) {
  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-2 rounded-[8px] border border-[#e4e6eb] px-3 py-2 text-sm font-bold">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
        />
        {field.label}
      </label>
    )
  }

  if (field.type === "select") {
    return (
      <select
        value={String(value ?? "")}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-[8px] border border-[#e4e6eb] bg-white px-3 text-sm font-semibold outline-none focus:border-[#f97316]"
      >
        {(field.options ?? []).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }

  if (field.type === "textarea") {
    return (
      <textarea
        value={String(value ?? "")}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-24 w-full rounded-[8px] border border-[#e4e6eb] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#f97316]"
      />
    )
  }

  return (
    <Input
      type={field.type === "number" ? "number" : "text"}
      value={String(value ?? "")}
      onChange={(event) =>
        onChange(
          field.type === "number"
            ? Number(event.target.value)
            : event.target.value
        )
      }
      className="h-10 rounded-[8px] border-[#e4e6eb] bg-white"
    />
  )
}

function RecordDialog({
  open,
  title,
  description,
  fields,
  draft,
  onDraftChange,
  onOpenChange,
  onSave,
}: {
  open: boolean
  title: string
  description: string
  fields: EditableField[]
  draft: AdminRow
  onDraftChange: (draft: AdminRow) => void
  onOpenChange: (open: boolean) => void
  onSave: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[calc(100vh-2rem)] max-w-2xl overflow-y-auto rounded-[12px] border border-[#e7e8ec] bg-white p-0 shadow-2xl"
        data-lenis-prevent
      >
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-[#101322]">
              {title}
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.key}
                className={cn(field.type === "textarea" && "sm:col-span-2")}
              >
                {field.type !== "checkbox" && (
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                    {field.label}
                  </label>
                )}
                <FieldEditor
                  field={field}
                  value={draft[field.key]}
                  onChange={(value) =>
                    onDraftChange({ ...draft, [field.key]: value })
                  }
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-10 rounded-[8px]"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={onSave}
              className="h-10 rounded-[8px] bg-[#f97316] text-white hover:bg-[#ea580c]"
            >
              Save changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ResourceControls({
  collection,
  fields,
  newItem,
  createLabel = "Add item",
}: {
  collection: AdminCollection
  fields: EditableField[]
  newItem: AdminRow
  createLabel?: string
}) {
  const { addRow, setUpload, upload } = useAdminCollection(collection)
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState<AdminRow>(newItem)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  return (
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
      {upload && (
        <span className="rounded-full bg-[#f5f2ff] px-3 py-1 text-xs font-bold text-[#2b0f52]">
          Uploaded: {upload}
        </span>
      )}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) setUpload(file.name)
          event.currentTarget.value = ""
        }}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="h-9 rounded-[8px] bg-white"
      >
        <Upload className="size-4" />
        Upload
      </Button>
      <Button
        type="button"
        onClick={() => {
          setDraft(newItem)
          setOpen(true)
        }}
        className="h-9 rounded-[8px] bg-[#f97316] text-white hover:bg-[#ea580c]"
      >
        <Plus className="size-4" />
        {createLabel}
      </Button>
      <RecordDialog
        open={open}
        title={createLabel}
        description="Changes are saved in memory for this session only."
        fields={fields}
        draft={draft}
        onDraftChange={setDraft}
        onOpenChange={setOpen}
        onSave={() => {
          addRow(draft)
          setOpen(false)
        }}
      />
    </div>
  )
}

export function RowControls({
  collection,
  row,
  fields,
}: {
  collection: AdminCollection
  row: AdminRow
  fields: EditableField[]
}) {
  const { deleteRow, updateRow } = useAdminCollection(collection)
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState<AdminRow>(row)
  const id = String(row._id)

  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => {
          setDraft(row)
          setOpen(true)
        }}
        className="rounded-[8px] text-slate-500 hover:text-[#f97316]"
        aria-label="Edit row"
      >
        <Edit3 className="size-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => deleteRow(id)}
        className="rounded-[8px] text-slate-500 hover:text-rose-500"
        aria-label="Delete row"
      >
        <Trash2 className="size-4" />
      </Button>
      <RecordDialog
        open={open}
        title="Edit item"
        description="Changes are saved in memory for this session only."
        fields={fields}
        draft={draft}
        onDraftChange={setDraft}
        onOpenChange={setOpen}
        onSave={() => {
          updateRow(id, draft)
          setOpen(false)
        }}
      />
    </div>
  )
}

export function TableShell({
  columns,
  children,
}: {
  columns: string[]
  children: React.ReactNode
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="border-b border-[#eef0f4] bg-[#fbfbfa] px-3 py-3 text-xs font-black uppercase tracking-[0.12em] text-slate-400"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function Cell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <td
      className={cn(
        "border-b border-[#f1f2f5] px-3 py-3 align-middle",
        className
      )}
    >
      {children}
    </td>
  )
}
