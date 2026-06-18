Product Upload MVP Guide
Build exactly these three flows first: Manual Add Product, Bulk Product Import, Bulk Price/Stock Update.

1. Manual Add Product
Use a form for single products. Required fields: SKU, Category, Brand, Product_Name, Price_NPR, Stock_Quantity, Availability, Featured, Product_Status.
Validate before save. SKU must be unique. Price must be positive. Stock must be integer >= 0. Show clear inline errors.

2. Bulk Product Import
Allow CSV/XLSX upload. Show a mapping screen so shop owners can map their columns to your system fields.
After mapping, validate every row and show summary: total rows, valid rows, warning rows, error rows.
Do not insert bad rows. Let the user import only valid rows or download an error report.

3. Bulk Price/Stock Update
This flow is for existing products only. Match rows by SKU. Only update price, stock, availability, and status.
Show not-found SKU errors. Do not create new products from this flow.

Recommended Import Steps
Step 1: Upload file. Step 2: Map columns. Step 3: Validate and preview. Step 4: Confirm import. Step 5: Show import report.


Build the product upload system for a tech retailer admin portal.

The platform is for mobile phone shops, laptop shops, and tech accessory retailers.

Build these 3 MVP flows first:

1. Manual Add Product
2. Bulk Product Import from CSV/XLSX
3. Bulk Price/Stock Update from CSV/XLSX

For Manual Add Product:
Create a clean form with these required fields:

* SKU
* Category
* Brand
* Product_Name
* Price_NPR
* Stock_Quantity
* Availability
* Featured
* Product_Status

Optional fields:

* Model
* Variant
* RAM
* Storage
* Processor_Chipset
* Color
* Condition
* Old_Price_NPR
* Warranty
* Short_Description
* Image_URLs
* Supplier
* Supplier_Code
* Tags
* Barcode_Optional

Validation rules:

* SKU is required and unique per shop.
* Category must be Mobile, Laptop, Tablet, Smartwatch, or Accessory.
* Price_NPR must be greater than 0.
* Old_Price_NPR should be empty or greater than/equal to Price_NPR.
* Stock_Quantity must be an integer greater than or equal to 0.
* Availability must be In Stock, Out of Stock, or Preorder.
* Featured must be Yes or No.
* Product_Status must be Draft or Published.

For Bulk Product Import:
Allow CSV and XLSX upload.
Flow:

1. Upload file
2. Map columns
3. Validate rows
4. Preview import
5. Confirm import
6. Show import report

The mapping screen is required because different shops may use different column names. Example: Product -> Product_Name, MRP -> Price_NPR, Qty -> Stock_Quantity.

Do not insert invalid rows. Show total rows, valid rows, warning rows, and error rows. Allow importing only valid rows. Allow downloading an error report.

For Bulk Price/Stock Update:
Match products by SKU only.
Required fields:

* SKU
* New_Price_NPR
* New_Stock_Quantity
* Availability

Optional:

* Product_Status
* Updated_By
* Update_Note

Rules:

* Do not create new products in this flow.
* If SKU does not exist, show error.
* If stock becomes 0, set Availability to Out of Stock unless admin overrides it.
* Show updated products, skipped rows, invalid rows, and not-found SKUs.

Database:
Use a Product model with a unique index on shopId + sku.

Main goal:
Retailer should be able to upload 200 products quickly, fix errors clearly, and update stock/price in bulk without touching every product manually.
