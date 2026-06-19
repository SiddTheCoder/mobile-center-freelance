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

const userFields: EditableField[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role", type: "select", options: ["Super Admin", "Store Manager", "Order Manager", "Inventory Manager", "Content Manager", "Support Staff"] },
  { key: "permission", label: "Permissions", type: "textarea" },
  { key: "status", label: "Status", type: "select", options: ["Active", "Invited", "Disabled"] },
]

const newUser = {
  name: "New Staff",
  role: "Support Staff",
  permission: "Customers, Reviews",
  status: "Invited",
}

export function UsersTab() {
  const { rows } = useAdminCollection("users")

  return (
    <Panel
      title="Admin Users / Roles"
      description="Super Admin, Store Manager, Order Manager, Inventory Manager, Content Manager, and Support Staff"
      action={
        <ResourceControls
          collection="users"
          fields={userFields}
          newItem={newUser}
          createLabel="Add user"
        />
      }
    >
      <TableShell columns={["Name", "Role", "Permissions", "Status", "Manage"]}>
        {rows.map((user) => (
          <TableRow key={String(user._id)} className="hover:bg-[#fbfbfa]">
            <Cell className="font-black">{user.name}</Cell>
            <Cell>{user.role}</Cell>
            <Cell className="text-slate-500">{user.permission}</Cell>
            <Cell><StatusBadge status={String(user.status)} /></Cell>
            <Cell><RowControls collection="users" row={user} fields={userFields} /></Cell>
          </TableRow>
        ))}
      </TableShell>
    </Panel>
  )
}
