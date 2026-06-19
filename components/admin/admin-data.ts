import { products } from "@/lib/products"

export const orderRows = [
  {
    id: "ORD-1048",
    customer: "Siddhant Shrestha",
    phone: "9800001122",
    products: "Apple iPhone 17 Pro Max, CMF Watch Pro 3",
    amount: 261998,
    payment: "Khalti",
    paymentStatus: "Paid",
    orderStatus: "Packed",
    deliveryStatus: "Ready to ship",
    date: "17 Jun 2026",
  },
  {
    id: "ORD-1047",
    customer: "Aayush Maharjan",
    phone: "9812345678",
    products: "Samsung Galaxy S26 Ultra",
    amount: 202999,
    payment: "EMI",
    paymentStatus: "Review",
    orderStatus: "Confirmed",
    deliveryStatus: "Verification",
    date: "17 Jun 2026",
  },
  {
    id: "ORD-1046",
    customer: "Priya Gurung",
    phone: "9841004455",
    products: "Redmi Note 15 Pro",
    amount: 53999,
    payment: "COD",
    paymentStatus: "COD Pending",
    orderStatus: "Out for Delivery",
    deliveryStatus: "With rider",
    date: "16 Jun 2026",
  },
  {
    id: "ORD-1045",
    customer: "Niraj Karki",
    phone: "9867002211",
    products: "Motorola G96 5G",
    amount: 44999,
    payment: "eSewa",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    deliveryStatus: "Completed",
    date: "16 Jun 2026",
  },
]

export const productRows = products.map((product, index) => {
  const stock = product.soldOut ? 0 : [16, 12, 9, 7, 5, 3][index % 6]

  return {
    name: product.name,
    sku: product.id.toUpperCase().replace(/-/g, "-").slice(0, 24),
    category: product.category,
    brand: product.brand,
    price: product.originalPrice ?? product.price,
    sale: product.price,
    stock,
    status: product.soldOut ? "Sold Out" : stock <= 4 ? "Low Stock" : "Active",
    featured: ["Flagship", "New"].includes(product.badge ?? ""),
    location: product.soldOut ? 0 : (index % 4) + 1,
    image: product.image,
  }
})

export const trackingRows = [
  {
    order: "ORD-1048",
    courier: "Pathao Courier",
    tracking: "PT-7712048",
    dispatch: "17 Jun",
    eta: "18 Jun",
    status: "Packed",
    note: "Courier pickup scheduled for 4 PM.",
  },
  {
    order: "ORD-1046",
    courier: "Demo Store Rider",
    tracking: "DSR-99012",
    dispatch: "16 Jun",
    eta: "17 Jun",
    status: "Out for Delivery",
    note: "Rider called customer before dispatch.",
  },
  {
    order: "ORD-1044",
    courier: "Nepal Can Move",
    tracking: "NCM-802341",
    dispatch: "15 Jun",
    eta: "18 Jun",
    status: "Shipped",
    note: "Left Kathmandu sorting hub.",
  },
]

export const trackingTimeline = [
  "Order Placed",
  "Confirmed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
]

export const inventoryRows = [
  { sku: "APL-17PM-256", product: "Apple iPhone 17 Pro Max", current: 12, sold: 8, returned: 1, damaged: 0, status: "In Stock" },
  { sku: "RED-N15P-256", product: "Redmi Note 15 Pro", current: 3, sold: 14, returned: 0, damaged: 1, status: "Low Stock" },
  { sku: "SGBUDS-FE", product: "Samsung Galaxy Buds FE", current: 0, sold: 6, returned: 0, damaged: 0, status: "Out of Stock" },
  { sku: "CMF-WP3", product: "CMF Watch Pro 3", current: 24, sold: 18, returned: 2, damaged: 0, status: "In Stock" },
]

export const categories = [
  "Apple",
  "Samsung",
  "OnePlus",
  "Nothing",
  "Redmi",
  "Xiaomi",
  "POCO",
  "OPPO",
  "vivo",
  "realme",
  "Infinix",
  "HONOR",
  "Motorola",
  "Smart Phone",
  "Earbuds",
  "Accessories",
]

export const brands = [
  { name: "Apple", products: 6, status: "Featured", slug: "apple" },
  { name: "Samsung", products: 4, status: "Featured", slug: "samsung" },
  { name: "OnePlus", products: 4, status: "Featured", slug: "oneplus" },
  { name: "Redmi", products: 3, status: "Active", slug: "redmi" },
  { name: "Nothing", products: 4, status: "Active", slug: "nothing" },
  { name: "Motorola", products: 3, status: "Active", slug: "motorola" },
]

export const customers = [
  { name: "Siddhant Shrestha", email: "siddhant@example.com", phone: "9800001122", orders: 8, spent: 420500, status: "VIP" },
  { name: "Priya Gurung", email: "priya@example.com", phone: "9841004455", orders: 4, spent: 118000, status: "Active" },
  { name: "Aayush Maharjan", email: "aayush@example.com", phone: "9812345678", orders: 2, spent: 214999, status: "EMI Review" },
  { name: "Niraj Karki", email: "niraj@example.com", phone: "9867002211", orders: 6, spent: 76500, status: "Active" },
]

export const carts = [
  { owner: "Guest #8821", products: "Apple iPhone 17 Pro Max, CMF Watch Pro 3", value: 261998, activity: "18 min ago", checkout: "Started", recovery: "WhatsApp sent" },
  { owner: "Priya Gurung", products: "Samsung Galaxy S26 Ultra", value: 202999, activity: "44 min ago", checkout: "Not started", recovery: "Pending" },
  { owner: "Aayush Maharjan", products: "Redmi Buds 6 Play", value: 2499, activity: "2h ago", checkout: "Started", recovery: "Coupon applied" },
]

export const coupons = [
  { code: "SAVE5", type: "Percentage", value: "5%", minimum: 5000, usage: "38/200", status: "Active" },
  { code: "PHONE2026", type: "Fixed", value: "Rs. 2,026", minimum: 25000, usage: "12/80", status: "Active" },
  { code: "FLAGSHIP10", type: "Percentage", value: "10%", minimum: 100000, usage: "7/50", status: "Scheduled" },
]

export const homepageSections = [
  { section: "Hero Banner", title: "Xiaomi 17 Ultra EMI", status: "Enabled", order: 1 },
  { section: "Launch Offer Banner", title: "Phone and accessory bundle", status: "Enabled", order: 2 },
  { section: "Pay Later Banner", title: "40% down payment", status: "Enabled", order: 8 },
  { section: "Blogs", title: "Buying guides", status: "Enabled", order: 12 },
  { section: "Footer", title: "Store info", status: "Enabled", order: 13 },
]

export const banners = [
  { title: "Phone Launch Offer", type: "Wide banner", position: "Homepage", start: "17 Jun", end: "30 Jun", status: "Active" },
  { title: "Flagship EMI Offer", type: "Hero banner", position: "Hero 1", start: "15 Jun", end: "28 Jun", status: "Active" },
  { title: "New Arrivals", type: "Category banner", position: "Products", start: "18 Jun", end: "05 Jul", status: "Draft" },
]

export const reviews = [
  { product: "Apple iPhone 17 Pro Max", customer: "Siddhant", rating: 5, text: "Fast pickup and clean packaging.", status: "Approved" },
  { product: "Samsung Galaxy S26 Ultra", customer: "Aayush", rating: 4, text: "Need clarity on EMI documents.", status: "Pending" },
  { product: "CMF Watch Pro 3", customer: "Priya", rating: 5, text: "Color options were clearly shown.", status: "Approved" },
]

export const questions = [
  { product: "CMF Watch Pro 3", question: "Which colors are available?", status: "Answered" },
  { product: "Apple iPhone 17 Pro Max", question: "Is EMI available for students?", status: "Pending" },
]

export const blogs = [
  { title: "iPhone 17 Pro Max buying notes", category: "Buying guide", author: "Admin", status: "Published", date: "17 Jun" },
  { title: "Phone camera guide for Nepal", category: "Phones", author: "Support", status: "Draft", date: "18 Jun" },
  { title: "Best accessories from the new catalog", category: "Accessories", author: "Admin", status: "Scheduled", date: "21 Jun" },
]

export const payments = [
  { order: "ORD-1048", customer: "Siddhant", method: "Khalti", status: "Paid", amount: 261998, transaction: "KHALTI-7812" },
  { order: "ORD-1047", customer: "Aayush", method: "EMI", status: "Review", amount: 202999, transaction: "EMI-REQ-44" },
  { order: "ORD-1046", customer: "Priya", method: "COD", status: "COD Pending", amount: 53999, transaction: "COD" },
]

export const reports = [
  { name: "Sales report", value: "Rs. 12.4L", trend: "+18%", note: "Last 30 days" },
  { name: "Product performance", value: "iPhone 17 Pro Max", trend: "Top", note: "42 units sold" },
  { name: "Coupon usage", value: "57 uses", trend: "+9%", note: "SAVE5 leads" },
  { name: "Delivery report", value: "93%", trend: "On-time", note: "This month" },
]

export const users = [
  { name: "Store Owner", role: "Super Admin", permission: "Full access", status: "Active" },
  { name: "Order Desk", role: "Order Manager", permission: "Orders, Tracking", status: "Active" },
  { name: "Warehouse", role: "Inventory Manager", permission: "Products, Stock", status: "Active" },
  { name: "Support", role: "Support Staff", permission: "Customers, Reviews", status: "Invited" },
]

export const settings = [
  { group: "Store Profile", items: "Name, logo, favicon, address" },
  { group: "Contact Info", items: "Phone, email, WhatsApp, map embed" },
  { group: "Shipping Settings", items: "Delivery charge, courier partners, zones" },
  { group: "Payment Settings", items: "COD, Khalti, eSewa, Fonepay, EMI" },
  { group: "Invoice Settings", items: "Prefix, tax, company details" },
  { group: "Notifications", items: "Email, SMS, WhatsApp templates" },
]

export const revenueBars = [
  { day: "Mon", value: 48 },
  { day: "Tue", value: 64 },
  { day: "Wed", value: 58 },
  { day: "Thu", value: 76 },
  { day: "Fri", value: 92 },
  { day: "Sat", value: 84 },
  { day: "Sun", value: 67 },
]
