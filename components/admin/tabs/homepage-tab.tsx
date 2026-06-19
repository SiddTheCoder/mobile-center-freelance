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

const homepageFields: EditableField[] = [
  { key: "section", label: "Section" },
  { key: "title", label: "Title" },
  { key: "status", label: "Status", type: "select", options: ["Enabled", "Draft", "Disabled"] },
  { key: "order", label: "Sort order", type: "number" },
]

const newHomepageSection = {
  section: "New Section",
  title: "New homepage section",
  status: "Draft",
  order: 99,
}

export function HomepageTab() {
  const { rows } = useAdminCollection("homepage")

  return (
    <Panel
      title="Homepage / Website CMS"
      description="Section-based controls for the homepage, without touching code"
      action={
        <ResourceControls
          collection="homepage"
          fields={homepageFields}
          newItem={newHomepageSection}
          createLabel="Add section"
        />
      }
    >
      <TableShell columns={["Section", "Title", "Status", "Sort order", "Managed fields", "Manage"]}>
        {rows.map((section) => (
          <TableRow key={String(section._id)} className="hover:bg-[#fbfbfa]">
            <Cell className="font-black">{section.section}</Cell>
            <Cell>{section.title}</Cell>
            <Cell><StatusBadge status={String(section.status)} /></Cell>
            <Cell>{section.order}</Cell>
            <Cell className="text-slate-500">Toggle, title, subtitle, image, CTA, link, selector</Cell>
            <Cell><RowControls collection="homepage" row={section} fields={homepageFields} /></Cell>
          </TableRow>
        ))}
      </TableShell>
    </Panel>
  )
}
