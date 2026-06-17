export const orderRows = [
  {
    id: "ORD-1048",
    customer: "Siddhant Shrestha",
    phone: "9800001122",
    products: "MacBook Air M3, AirPods Pro",
    amount: 229998,
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
    products: "Samsung Galaxy S24 Ultra",
    amount: 189999,
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
    products: "Lenovo 24-inch Gaming Monitor",
    amount: 25000,
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
    products: "Logitech MX Master 3S Mouse",
    amount: 12999,
    payment: "eSewa",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    deliveryStatus: "Completed",
    date: "16 Jun 2026",
  },
]

export const productRows = [
  {
    name: "Apple MacBook Air 13-inch M3",
    sku: "MBA-M3-256",
    category: "Laptop",
    brand: "Apple",
    price: 189999,
    sale: 179999,
    stock: 12,
    status: "Published",
    featured: true,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    sku: "SAM-S24U-512",
    category: "Smart Phone",
    brand: "Samsung",
    price: 189999,
    sale: 184999,
    stock: 7,
    status: "Published",
    featured: true,
  },
  {
    name: "Lenovo 24-inch Gaming Monitor",
    sku: "LEN-G24-165",
    category: "Monitor",
    brand: "Lenovo",
    price: 25000,
    sale: 23999,
    stock: 3,
    status: "Low Stock",
    featured: false,
  },
  {
    name: "Wanbo T2 Max Projector",
    sku: "WAN-T2MAX",
    category: "Projector",
    brand: "Wanbo",
    price: 22000,
    sale: 20999,
    stock: 0,
    status: "Sold Out",
    featured: false,
  },
]

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
  { sku: "MBA-M3-256", product: "MacBook Air M3", current: 12, sold: 8, returned: 1, damaged: 0, status: "In Stock" },
  { sku: "LEN-G24-165", product: "Lenovo Gaming Monitor", current: 3, sold: 14, returned: 0, damaged: 1, status: "Low Stock" },
  { sku: "WAN-T2MAX", product: "Wanbo T2 Max Projector", current: 0, sold: 6, returned: 0, damaged: 0, status: "Out of Stock" },
  { sku: "AIRPODS-PRO2", product: "AirPods Pro 2nd Gen", current: 24, sold: 18, returned: 2, damaged: 0, status: "In Stock" },
]

export const categories = [
  "Laptop",
  "Apple",
  "Smart Phone",
  "Tablet",
  "Monitor",
  "PC Components",
  "Projector",
  "Earbuds",
  "Headphone",
  "Gaming Tables",
  "Projector Accessories",
  "Speaker",
  "Drone",
  "Microphone",
  "Smart Watch",
]

export const brands = [
  { name: "Apple", products: 18, status: "Featured", slug: "apple" },
  { name: "Samsung", products: 14, status: "Featured", slug: "samsung" },
  { name: "Lenovo", products: 22, status: "Active", slug: "lenovo" },
  { name: "Fantech", products: 31, status: "Active", slug: "fantech" },
  { name: "Wanbo", products: 8, status: "Active", slug: "wanbo" },
  { name: "Asus", products: 16, status: "Active", slug: "asus" },
]

export const customers = [
  { name: "Siddhant Shrestha", email: "siddhant@example.com", phone: "9800001122", orders: 8, spent: 420500, status: "VIP" },
  { name: "Priya Gurung", email: "priya@example.com", phone: "9841004455", orders: 4, spent: 118000, status: "Active" },
  { name: "Aayush Maharjan", email: "aayush@example.com", phone: "9812345678", orders: 2, spent: 214999, status: "EMI Review" },
  { name: "Niraj Karki", email: "niraj@example.com", phone: "9867002211", orders: 6, spent: 76500, status: "Active" },
]

export const carts = [
  { owner: "Guest #8821", products: "MacBook Air M3, Mouse", value: 202998, activity: "18 min ago", checkout: "Started", recovery: "WhatsApp sent" },
  { owner: "Priya Gurung", products: "Samsung S24 Ultra", value: 189999, activity: "44 min ago", checkout: "Not started", recovery: "Pending" },
  { owner: "Aayush Maharjan", products: "AirPods Pro 2", value: 39999, activity: "2h ago", checkout: "Started", recovery: "Coupon applied" },
]

export const coupons = [
  { code: "SAVE5", type: "Percentage", value: "5%", minimum: 5000, usage: "38/200", status: "Active" },
  { code: "WORLD2026", type: "Fixed", value: "Rs. 2,026", minimum: 25000, usage: "12/80", status: "Active" },
  { code: "LAPTOP10", type: "Percentage", value: "10%", minimum: 100000, usage: "7/50", status: "Scheduled" },
]

export const homepageSections = [
  { section: "Hero Banner", title: "Xiaomi 17T EMI", status: "Enabled", order: 1 },
  { section: "World Cup Banner", title: "Projector bundle", status: "Enabled", order: 2 },
  { section: "Pay Later Banner", title: "40% down payment", status: "Enabled", order: 8 },
  { section: "Blogs", title: "Buying guides", status: "Enabled", order: 12 },
  { section: "Footer", title: "Store info", status: "Enabled", order: 13 },
]

export const banners = [
  { title: "World Cup Projector Sale", type: "Wide banner", position: "Homepage", start: "17 Jun", end: "30 Jun", status: "Active" },
  { title: "Laptop EMI Offer", type: "Hero banner", position: "Hero 1", start: "15 Jun", end: "28 Jun", status: "Active" },
  { title: "New Arrivals", type: "Category banner", position: "Products", start: "18 Jun", end: "05 Jul", status: "Draft" },
]

export const reviews = [
  { product: "MacBook Air M3", customer: "Siddhant", rating: 5, text: "Fast pickup and clean packaging.", status: "Approved" },
  { product: "Samsung S24 Ultra", customer: "Aayush", rating: 4, text: "Need clarity on EMI documents.", status: "Pending" },
  { product: "Lenovo Monitor", customer: "Priya", rating: 5, text: "Color accuracy is great.", status: "Approved" },
]

export const questions = [
  { product: "Wanbo T2 Max", question: "Does it include HDMI cable?", status: "Answered" },
  { product: "MacBook Air M3", question: "Is EMI available for students?", status: "Pending" },
]

export const blogs = [
  { title: "RTX workstations for creators", category: "Buying guide", author: "Admin", status: "Published", date: "17 Jun" },
  { title: "Phone camera guide for Nepal", category: "Phones", author: "Support", status: "Draft", date: "18 Jun" },
  { title: "How to choose a projector", category: "Projectors", author: "Admin", status: "Scheduled", date: "21 Jun" },
]

export const payments = [
  { order: "ORD-1048", customer: "Siddhant", method: "Khalti", status: "Paid", amount: 229998, transaction: "KHALTI-7812" },
  { order: "ORD-1047", customer: "Aayush", method: "EMI", status: "Review", amount: 189999, transaction: "EMI-REQ-44" },
  { order: "ORD-1046", customer: "Priya", method: "COD", status: "COD Pending", amount: 25000, transaction: "COD" },
]

export const reports = [
  { name: "Sales report", value: "Rs. 12.4L", trend: "+18%", note: "Last 30 days" },
  { name: "Product performance", value: "MacBook Air", trend: "Top", note: "42 units sold" },
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
