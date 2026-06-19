import { Star } from "lucide-react"

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

const reviewFields: EditableField[] = [
  { key: "product", label: "Product" },
  { key: "customer", label: "Customer" },
  { key: "rating", label: "Rating", type: "number" },
  { key: "text", label: "Review text", type: "textarea" },
  { key: "status", label: "Status", type: "select", options: ["Pending", "Approved", "Rejected"] },
]

const questionFields: EditableField[] = [
  { key: "product", label: "Product" },
  { key: "question", label: "Question", type: "textarea" },
  { key: "status", label: "Status", type: "select", options: ["Pending", "Answered", "Rejected"] },
]

const newReview = {
  product: "Product name",
  customer: "Customer",
  rating: 5,
  text: "Review text",
  status: "Pending",
}

const newQuestion = {
  product: "Product name",
  question: "Customer question",
  status: "Pending",
}

export function ReviewsTab() {
  const reviewCollection = useAdminCollection("reviews")
  const questionCollection = useAdminCollection("questions")

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.75fr]">
      <Panel
        title="Product Reviews"
        description="Approve, reject, reply, or delete product reviews"
        action={
          <ResourceControls
            collection="reviews"
            fields={reviewFields}
            newItem={newReview}
            createLabel="Add review"
          />
        }
      >
        <TableShell columns={["Product", "Customer", "Rating", "Review", "Status", "Manage"]}>
          {reviewCollection.rows.map((review) => (
            <TableRow key={String(review._id)} className="hover:bg-[#fbfbfa]">
              <Cell className="font-black">{review.product}</Cell>
              <Cell>{review.customer}</Cell>
              <Cell>
                <span className="inline-flex items-center gap-1 font-black text-[#d99056]">
                  <Star className="size-4 fill-[#d99056]" />
                  {String(review.rating)}
                </span>
              </Cell>
              <Cell className="text-slate-500">{review.text}</Cell>
              <Cell><StatusBadge status={String(review.status)} /></Cell>
              <Cell><RowControls collection="reviews" row={review} fields={reviewFields} /></Cell>
            </TableRow>
          ))}
        </TableShell>
      </Panel>

      <Panel
        title="Product Q&A"
        description="Questions from product pages"
        action={
          <ResourceControls
            collection="questions"
            fields={questionFields}
            newItem={newQuestion}
            createLabel="Add Q&A"
          />
        }
      >
        <div className="space-y-3">
          {questionCollection.rows.map((question) => (
            <div key={String(question._id)} className="rounded-[8px] border border-[#eef0f4] p-3">
              <p className="font-black">{question.product}</p>
              <p className="mt-1 text-sm text-slate-500">{question.question}</p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <StatusBadge status={String(question.status)} />
                <RowControls collection="questions" row={question} fields={questionFields} />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}
