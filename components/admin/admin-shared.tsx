import * as React from "react"
import { Edit3, Plus, Trash2, Upload } from "lucide-react"

import {
  type AdminCollection,
  type AdminRow,
  type AdminValue,
  useAdminCollection,
} from "@/components/admin/admin-state"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export type EditableField = {
  key: string
  label: string
  type?: "text" | "number" | "textarea" | "select" | "checkbox"
  options?: string[]
}

const statusTone: Record<string, string> = {
  Active: "bg-orange-50 text-orange-700 ring-orange-200",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Delivered: "bg-orange-50 text-orange-700 ring-orange-200",
  Enabled: "bg-orange-50 text-orange-700 ring-orange-200",
  Featured: "bg-orange-600 text-white ring-orange-600",
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Published: "bg-orange-50 text-orange-700 ring-orange-200",
  VIP: "bg-orange-50 text-orange-700 ring-orange-200",
  Packed: "bg-orange-50 text-orange-700 ring-orange-200",
  Shipped: "bg-orange-50 text-orange-700 ring-orange-200",
  "Out for Delivery": "bg-orange-50 text-orange-700 ring-orange-200",
  "Ready to ship": "bg-orange-50 text-orange-700 ring-orange-200",
  Review: "bg-amber-50 text-amber-700 ring-amber-200",
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Scheduled: "bg-orange-50 text-orange-700 ring-orange-200",
  Draft: "bg-slate-100 text-slate-600 ring-slate-200",
  Invited: "bg-slate-100 text-slate-600 ring-slate-200",
  "Low Stock": "bg-amber-50 text-amber-700 ring-amber-200",
  "Low stock": "bg-amber-50 text-amber-700 ring-amber-200",
  "Low in stock": "bg-amber-50 text-amber-700 ring-amber-200",
  "Out of Stock": "bg-rose-50 text-rose-700 ring-rose-200",
  "Sold Out": "bg-rose-50 text-rose-700 ring-rose-200",
  "COD Pending": "bg-amber-50 text-amber-700 ring-amber-200",
  Verification: "bg-amber-50 text-amber-700 ring-amber-200",
  Answered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "EMI Review": "bg-amber-50 text-amber-700 ring-amber-200",
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "h-7 rounded-full border-0 px-3 text-xs font-semibold ring-1",
        statusTone[status] ?? "bg-slate-100 text-slate-600 ring-slate-200"
      )}
    >
      {status}
    </Badge>
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
    <Card className="gap-0 rounded-2xl border border-slate-150 bg-white py-0 shadow-sm ring-0">
      <CardHeader className="flex flex-col gap-2 rounded-t-2xl px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-base font-bold text-slate-800">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="mt-1 text-sm text-slate-500">
              {description}
            </CardDescription>
          )}
        </div>
        {action && (
          <CardAction className="static row-auto self-auto justify-self-auto">
            {action}
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0 text-sm">{children}</CardContent>
    </Card>
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
      <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold">
        <Checkbox
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
        />
        {field.label}
      </label>
    )
  }

  if (field.type === "select") {
    return (
      <Select
        value={String(value ?? "")}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 rounded-xl border-slate-250 bg-white text-sm font-semibold"
      >
        {(field.options ?? []).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    )
  }

  if (field.type === "textarea") {
    return (
      <Textarea
        value={String(value ?? "")}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-24 rounded-xl border-slate-250 bg-white text-sm font-semibold"
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
      className="h-10 rounded-xl border-slate-250 bg-white text-sm"
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
        className="max-h-[calc(100vh-2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-0 shadow-xl"
        data-lenis-prevent
      >
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-800">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-400">
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
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
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

          <div className="mt-6 flex justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-10 rounded-xl text-sm px-4"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={onSave}
              className="h-10 rounded-xl bg-orange-600 text-sm text-white hover:bg-orange-700 px-4"
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
    <div className="flex flex-row items-center gap-2.5">
      {upload && (
        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
          {upload}
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
        className="h-10 rounded-xl bg-white text-sm border-slate-200 text-slate-650 hover:bg-slate-50 px-4"
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
        className="h-10 rounded-xl bg-orange-600 text-sm text-white hover:bg-orange-700 px-4"
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
        className="size-8 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50"
        aria-label="Edit row"
      >
        <Edit3 className="size-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => deleteRow(id)}
        className="size-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
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
    <Table className="min-w-[760px] text-left text-sm">
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b border-orange-100">
          {columns.map((column) => (
            <TableHead
              key={column}
              className="h-10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
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
    <TableCell
      className={cn(
        "border-b border-slate-100 px-5 py-3 align-middle text-sm text-slate-650",
        className
      )}
    >
      {children}
    </TableCell>
  )
}

export { TableRow }
