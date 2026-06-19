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

const bannerFields: EditableField[] = [
  { key: "title", label: "Banner title" },
  { key: "type", label: "Banner type" },
  { key: "position", label: "Position" },
  { key: "start", label: "Start date" },
  { key: "end", label: "End date" },
  { key: "status", label: "Status", type: "select", options: ["Active", "Draft", "Scheduled", "Expired"] },
]

const newBanner = {
  title: "New Banner",
  type: "Wide banner",
  position: "Homepage",
  start: "17 Jun",
  end: "30 Jun",
  status: "Draft",
}

export function BannersTab() {
  const { rows } = useAdminCollection("banners")

  return (
    <Panel
      title="Banners"
      description="Hero, small promo, wide, category, flash sale, pay later, and product page banners"
      action={
        <ResourceControls
          collection="banners"
          fields={bannerFields}
          newItem={newBanner}
          createLabel="Add banner"
        />
      }
    >
      <TableShell columns={["Title", "Type", "Position", "Start", "End", "Status", "Manage"]}>
        {rows.map((banner) => (
          <TableRow key={String(banner._id)} className="hover:bg-[#fbfbfa]">
            <Cell className="font-black">{banner.title}</Cell>
            <Cell>{banner.type}</Cell>
            <Cell>{banner.position}</Cell>
            <Cell>{banner.start}</Cell>
            <Cell>{banner.end}</Cell>
            <Cell><StatusBadge status={String(banner.status)} /></Cell>
            <Cell><RowControls collection="banners" row={banner} fields={bannerFields} /></Cell>
          </TableRow>
        ))}
      </TableShell>
    </Panel>
  )
}
