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

const blogFields: EditableField[] = [
  { key: "title", label: "Blog title" },
  { key: "category", label: "Category" },
  { key: "author", label: "Author" },
  { key: "status", label: "Status", type: "select", options: ["Draft", "Published", "Scheduled"] },
  { key: "date", label: "Publish date" },
]

const newBlog = {
  title: "New Blog",
  category: "Buying guide",
  author: "Admin",
  status: "Draft",
  date: "17 Jun",
}

export function BlogsTab() {
  const { rows } = useAdminCollection("blogs")

  return (
    <Panel
      title="Blogs"
      description="Homepage blog cards, content, SEO, tags, author, and publish schedule"
      action={
        <ResourceControls
          collection="blogs"
          fields={blogFields}
          newItem={newBlog}
          createLabel="Add blog"
        />
      }
    >
      <TableShell columns={["Title", "Category", "Author", "Status", "Publish date", "Manage"]}>
        {rows.map((blog) => (
          <tr key={String(blog._id)} className="hover:bg-[#fbfbfa]">
            <Cell className="font-black">{blog.title}</Cell>
            <Cell>{blog.category}</Cell>
            <Cell>{blog.author}</Cell>
            <Cell><StatusBadge status={String(blog.status)} /></Cell>
            <Cell>{blog.date}</Cell>
            <Cell><RowControls collection="blogs" row={blog} fields={blogFields} /></Cell>
          </tr>
        ))}
      </TableShell>
    </Panel>
  )
}
