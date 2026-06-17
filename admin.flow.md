Main Admin Portal Tabs
1. Dashboard

This is the first screen after login.

Show quick business summary:

Today’s sales
Total orders
Pending orders
Processing orders
Delivered orders
Cancelled orders
Low stock products
Total products
Total customers
Revenue chart
Recent orders table
Top-selling products
Pending reviews/questions
Abandoned carts

This gives the owner a quick health check.

2. Orders

This is one of the most important tabs.

Order table columns:

Order ID
Customer name
Phone
Products
Total amount
Payment method
Payment status
Order status
Delivery status
Date
Actions

Order statuses:

Pending
Confirmed
Packed
Shipped
Out for Delivery
Delivered
Cancelled
Returned
Refunded

Inside order detail page:

Customer details
Shipping address
Ordered products
Quantity
Price
Payment method
Delivery charge
Discount
Grand total
Admin notes
Invoice download
Update order status
Update tracking status
Assign courier
Add tracking number
Cancel/refund action

This tab controls what the customer sees on the Order Tracking Page.

3. Tracking / Delivery

You can keep this inside Orders, but for a clean admin portal, make it its own tab.

Tracking fields:

Order ID
Courier partner
Tracking number
Dispatch date
Estimated delivery date
Current status
Status timeline
Delivery notes

Tracking timeline admin can update:

Order Placed
Confirmed
Packed
Shipped
Out for Delivery
Delivered

When admin changes status here, the customer tracking page updates.

Example:

Admin selects: Shipped
Customer sees: “Your package has been shipped and is expected to arrive by 18 June.”

4. Products

This manages all products.

Product list table:

Product image
Product name
SKU
Category
Brand
Price
Sale price
Stock
Status
Featured
Created date
Actions

Actions:

Add product
Edit product
Duplicate product
Delete product
Publish/unpublish
Mark featured
Mark sold out

Add/Edit product form sections:

Basic Info
Images / Gallery
Pricing
Inventory
Variants
Specifications
Shipping & Warranty
SEO
Related Products
Publish Settings

Fields:

Product name
Slug
Category
Brand
Short description
Full description
Main image
Gallery images
Regular price
Sale price
Discount
Stock quantity
SKU
Color
RAM/storage/size variants
Key specs
Full specification table
Warranty
Refund policy
Delivery time
Meta title
Meta description
Status: Draft / Published
5. Categories

Manage website categories.

Categories:

Laptop
Apple
Smart Phone
Tablet
Monitor
PC Components
Projector
Earbuds
Headphone
Gaming Tables
Projector Accessories
Speaker
Drone
Microphone
Smart Watch

Category fields:

Category name
Icon/image
Slug
Parent category
Description
Show on homepage toggle
Sort order
SEO title
SEO description
6. Brands

Useful for filters and product pages.

Brand fields:

Brand name
Logo
Slug
Description
Status
Featured brand toggle

Examples:

Lenovo
Apple
Samsung
Fantech
Asus
Acer
Dell
HP
BYINTEK
WANEBO
7. Inventory / Stock

This should focus only on stock movement.

Show:

Product
SKU
Current stock
Low stock alert
Sold quantity
Returned quantity
Damaged quantity
Stock status

Stock statuses:

In Stock
Low Stock
Out of Stock
Sold Out
Pre Order

Actions:

Add stock
Reduce stock
Mark damaged
Export stock report
Set low-stock threshold
8. Customers

Customer management.

Customer table:

Name
Email
Phone
Total orders
Total spent
Last order date
Status
Actions

Customer detail:

Profile info
Addresses
Order history
Wishlist
Cart history
Abandoned carts
Support notes
9. Carts / Abandoned Carts

This is not for manually controlling every active cart. That is usually unnecessary.

Use this for:

Abandoned carts
Cart recovery
Guest carts
Logged-in user carts

Show:

Customer/guest
Products in cart
Cart value
Last activity
Checkout started or not
Recovery status

Actions:

Send recovery email/SMS/WhatsApp
Apply coupon
View cart details
10. Coupons / Discounts

Manage offers.

Coupon fields:

Coupon code
Discount type: percentage / fixed
Discount value
Minimum order amount
Applicable categories
Applicable products
Usage limit
Start date
End date
Active/inactive

Also include:

Flash sale
Limited time deal
Homepage deal section
Product-level discount
Category discount
11. Homepage / Website CMS

This tab manages the website without touching code.

Do not make drag-and-drop first. Make section-based controls.

Manage homepage sections:

Hero Banner
Right Promo Banner
Smartphone Promo Banner
World Cup Banner
Featured Products
Trending Categories
Split Promo Banner
Shop By Categories
Pay Later Banner
Limited Time Deals
New Arrivals
Blogs
Footer

Each section should have:

Enable/disable toggle
Title
Subtitle
Image/banner upload
CTA text
CTA link
Sort order
Product/category selector

This lets the client manage the whole homepage safely.

12. Banners

Separate banner manager is useful.

Banner types:

Hero banner
Small promo card
Wide banner
Category banner
Flash sale banner
Pay later banner
Product page banner

Fields:

Banner title
Desktop image
Mobile image
Link URL
CTA text
Start date
End date
Status
Position
13. Reviews & Questions

For product reviews and product Q&A.

Reviews table:

Product
Customer
Rating
Review text
Status
Date

Actions:

Approve
Reject
Reply
Delete

Questions table:

Product
Customer question
Admin answer
Status
14. Blogs

Manage blog cards from homepage.

Fields:

Blog title
Slug
Cover image
Category
Content
Author
Tags
Meta title
Meta description
Publish status
Published date
15. Payments

Payment management.

Show:

Order ID
Customer
Payment method
Payment status
Amount
Transaction ID
Date

Payment statuses:

Unpaid
Paid
Failed
Refunded
Partially Refunded
COD Pending

Payment methods:

Cash on Delivery
eSewa
Khalti
Fonepay
Card
EMI
16. Reports / Analytics

Useful after the store starts getting real orders.

Reports:

Sales report
Product performance
Category performance
Customer report
Coupon usage
Inventory report
Delivery report
Payment report

Filters:

Today
Last 7 days
Last 30 days
Custom date range
17. Admin Users / Roles

For staff access.

Roles:

Super Admin
Store Manager
Order Manager
Inventory Manager
Content Manager
Support Staff

Permissions:

View dashboard
Manage products
Manage orders
Update tracking
Manage homepage
Manage coupons
Manage users
View reports
18. Settings

This controls store-wide configuration.

Settings sections:

Store Profile
Contact Info
Social Links
Shipping Settings
Payment Settings
Tax/Service Charge
Invoice Settings
SEO Settings
Email/SMS/WhatsApp Notifications
Return & Refund Policy
Terms & Privacy Pages

Store profile fields:

Store name
Logo
Favicon
Address
Phone
Email
Google Map embed
WhatsApp number
MVP Admin Screens You Should Design First

Don’t design 30 screens immediately. For demo, design these first:

1. Admin Dashboard
2. Product List
3. Add/Edit Product
4. Orders List
5. Order Detail + Tracking Update
6. Homepage CMS
7. Category Manager
8. Coupon Manager
9. Customers
10. Settings

These are enough to prove the full system.

Most Important Flow

The real ecommerce flow should be:

Admin adds product
↓
Product appears on website
↓
Customer adds to cart
↓
Customer checks out
↓
Admin receives order
↓
Admin confirms order
↓
Admin updates tracking status
↓
Customer sees tracking progress
↓
Order delivered

That is the core logic.

UXPilot Prompt for Admin Portal
Design a premium desktop admin portal for "Demo Store", a Nepal electronics ecommerce store. The admin should manage the whole website: products, orders, carts, checkout, tracking, homepage banners, categories, customers, coupons, blogs, payments, reports, users, and settings.

Style: modern ecommerce admin dashboard, 1440px desktop, dark/white sidebar layout, deep purple primary color, orange accent, clean cards, rounded corners, subtle shadows, Inter/Poppins font, production-ready UI.

Create these admin screens:
1. Dashboard with sales, orders, pending orders, revenue chart, low stock, recent orders, top products.
2. Product List with image, name, SKU, category, brand, price, stock, status, actions.
3. Add/Edit Product form with basic info, images, pricing, inventory, variants, specs, shipping, warranty, SEO, publish status.
4. Orders List with order ID, customer, phone, products, total, payment status, order status, delivery status, date, actions.
5. Order Detail page with customer info, shipping address, ordered items, payment summary, admin notes, invoice, update order status, update tracking status, courier, tracking number.
6. Tracking Management screen with order timeline: Order Placed, Confirmed, Packed, Shipped, Out for Delivery, Delivered.
7. Homepage CMS to manage hero banner, promo banners, featured products, trending categories, limited deals, new arrivals, blogs, footer.
8. Category and Brand Manager with icons, images, slugs, status, sort order.
9. Customers page with order history, total spent, addresses, abandoned carts.
10. Carts / Abandoned Carts page with guest carts, cart value, last activity, checkout started, and recovery status.
11. Coupons/Discounts page with code, discount type, value, usage limit, start/end date, status.
12. Banners manager with desktop image, mobile image, CTA, dates, status, and position.
13. Reviews and Product Q&A manager with approve, reject, reply, and delete actions.
14. Blogs manager with cover image, category, author, content, tags, SEO, and publish status.
15. Payments page with order ID, customer, payment method, payment status, transaction ID, amount, refunds, COD, and EMI.
16. Reports/Analytics page for sales, product performance, category performance, customer report, coupon usage, inventory, delivery, and payment reports.
17. Users/Roles page for Super Admin, Store Manager, Order Manager, Inventory Manager, Content Manager, and Support Staff.
18. Settings page for store info, contact, shipping, payment, invoice, SEO, notifications, return policy, terms, and privacy.

Use a left sidebar with tabs: Dashboard, Orders, Tracking, Products, Inventory, Categories, Brands, Customers, Carts, Coupons, Homepage CMS, Banners, Reviews, Blogs, Payments, Reports, Users, Settings.

Make the UI clean, practical, and easy for a non-technical store owner to manage the full ecommerce website.

Scalable Admin Route Structure

The admin portal should not live as one huge component. Use a route shell plus independent tab components.

Current structure:

app/admin/page.tsx
components/admin-portal.tsx
components/admin/admin-data.ts
components/admin/admin-shared.tsx
components/admin/tabs/dashboard-tab.tsx
components/admin/tabs/orders-tab.tsx
components/admin/tabs/tracking-tab.tsx
components/admin/tabs/products-tab.tsx
components/admin/tabs/inventory-tab.tsx
components/admin/tabs/categories-tab.tsx
components/admin/tabs/brands-tab.tsx
components/admin/tabs/customers-tab.tsx
components/admin/tabs/carts-tab.tsx
components/admin/tabs/coupons-tab.tsx
components/admin/tabs/homepage-tab.tsx
components/admin/tabs/banners-tab.tsx
components/admin/tabs/reviews-tab.tsx
components/admin/tabs/blogs-tab.tsx
components/admin/tabs/payments-tab.tsx
components/admin/tabs/reports-tab.tsx
components/admin/tabs/users-tab.tsx
components/admin/tabs/settings-tab.tsx

Implementation rule:
Each sidebar tab should have its own component file. Shared table, panel, and status badge UI should stay in admin-shared.tsx. Dummy data should stay in admin-data.ts until a real backend is connected.
