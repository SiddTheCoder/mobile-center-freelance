"use client"

import * as React from "react"
import { 
  Package, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertTriangle, 
  Trash2, 
  PlusCircle, 
  UploadCloud, 
  RefreshCw,
  Check, 
  X, 
  Info,
} from "lucide-react"

import { type AdminRow, useAdminCollection } from "@/components/admin/admin-state"
import {
  Cell,
  Panel,
  TableRow,
  TableShell,
  StatusBadge
} from "@/components/admin/admin-shared"
import { formatPrice } from "@/lib/products"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Available system categories
const VALID_CATEGORIES = ["Smart Phone", "Accessories", "Earbuds"]

type ProductSubTab = "list" | "manual" | "import" | "update"

type ValidatedImportRow = {
  index: number
  sku: string
  category: string
  brand: string
  name: string
  price: number
  stock: number
  availability: string
  featured: boolean
  status: string
  errors: string[]
  isValid: boolean
}

type ValidatedUpdateRow = {
  index: number
  sku: string
  catalogProduct?: AdminRow
  exists: boolean
  newPrice: number | null
  newStock: number | null
  availability: string
  status: string
  errors: string[]
  isValid: boolean
}

// Helper function to parse CSV text
function parseCSV(text: string): string[][] {
  const result: string[][] = []
  const lines = text.split(/\r?\n/)
  for (const line of lines) {
    if (!line.trim()) continue
    const row: string[] = []
    let current = ""
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        row.push(current.trim())
        current = ""
      } else {
        current += char
      }
    }
    row.push(current.trim())
    result.push(row)
  }
  return result
}

// Sample CSV templates for demo
const DEMO_IMPORT_CSV = `SKU,Product_Name,Category,Brand,Price_NPR,Stock_Quantity,Availability,Featured,Product_Status,Color,Condition
APPLE-IPHONE-17-PRO-MAX,Apple iPhone 17 Pro Max 12GB/256GB,Smart Phone,Apple,247999,15,In Stock,Yes,Published,Silver,New
SAMSUNG-GALAXY-S26-ULTRA,Samsung Galaxy S26 Ultra 12GB/256GB,Smart Phone,Samsung,202999,8,In Stock,Yes,Published,Gray,New
CMF-WATCH-PRO-3,CMF Watch Pro 3,Accessories,CMF by Nothing,13999,12,In Stock,No,Published,Light Grey,New
BAD-SKU-1,Invalid Price Phone,Smart Phone,Generic,-5000,10,In Stock,No,Published,Black,New
APPLE-IPHONE-17-PRO-MAX,Duplicate SKU Phone,Smart Phone,Apple,240000,5,In Stock,No,Published,Gold,New
REDMI-NOTE-15-PRO,Invalid Category Phone,Desktop,Redmi,53999,3,In Stock,No,Published,Black,New`

const DEMO_UPDATE_CSV = `SKU,New_Price_NPR,New_Stock_Quantity,Availability,Product_Status
APPLE-IPHONE-17-PRO-MAX,247999,10,In Stock,Published
SAMSUNG-GALAXY-S26-ULTRA,202999,0,Out of Stock,Published
INVALID-SKU-999,50000,5,In Stock,Published
CMF-WATCH-PRO-3,13999,0,Out of Stock,Published`

export function ProductsTab({ createSignal }: { createSignal?: number } = {}) {
  const { rows, addRow, updateRow, deleteRow } = useAdminCollection("products")
  const [activeSubTab, setActiveSubTab] = React.useState<ProductSubTab>("list")

  React.useEffect(() => {
    if (createSignal && createSignal > 0) {
      setManualSuccess(false)
      setActiveSubTab("manual")
    }
  }, [createSignal])

  // Search & filter
  const [searchTerm, setSearchTerm] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("All")

  const filteredProducts = React.useMemo(() => {
    return rows.filter((p) => {
      const matchesSearch = 
        String(p.name).toLowerCase().includes(searchTerm.toLowerCase()) || 
        String(p.sku).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(p.brand).toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = categoryFilter === "All" || String(p.category) === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [rows, searchTerm, categoryFilter])

  // --- MANUAL ADD STATE ---
  const [manualForm, setManualForm] = React.useState({
    sku: "",
    category: "Mobile",
    brand: "",
    name: "",
    price: "",
    stock: "",
    availability: "In Stock",
    featured: "No",
    status: "Published",
    // Optionals
    model: "",
    variant: "",
    ram: "",
    storage: "",
    processor: "",
    color: "",
    condition: "New",
    oldPrice: "",
    warranty: "",
    shortDesc: "",
    images: "",
    supplier: "",
    supplierCode: "",
    tags: "",
    barcode: ""
  })
  const [manualErrors, setManualErrors] = React.useState<Record<string, string>>({})
  const [manualSuccess, setManualSuccess] = React.useState(false)

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors: Record<string, string> = {}

    // Validation Rules
    if (!manualForm.sku.trim()) errors.sku = "SKU is required."
    else if (rows.some(p => String(p.sku).toLowerCase() === manualForm.sku.trim().toLowerCase())) {
      errors.sku = "SKU must be unique per shop."
    }

    if (!VALID_CATEGORIES.includes(manualForm.category)) {
      errors.category = `Category must be one of: ${VALID_CATEGORIES.join(", ")}`
    }

    if (!manualForm.brand.trim()) errors.brand = "Brand is required."
    if (!manualForm.name.trim()) errors.name = "Product name is required."

    const priceNum = Number(manualForm.price)
    if (!manualForm.price || isNaN(priceNum) || priceNum <= 0) {
      errors.price = "Price_NPR must be greater than 0."
    }

    const stockNum = Number(manualForm.stock)
    if (manualForm.stock === "" || isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) {
      errors.stock = "Stock_Quantity must be an integer >= 0."
    }

    if (manualForm.oldPrice) {
      const oldPriceNum = Number(manualForm.oldPrice)
      if (isNaN(oldPriceNum) || oldPriceNum < priceNum) {
        errors.oldPrice = "Old_Price_NPR should be empty or greater than/equal to Price_NPR."
      }
    }

    if (Object.keys(errors).length > 0) {
      setManualErrors(errors)
      return
    }

    setManualErrors({})
    // Add in-memory row mapped to store format
    addRow({
      name: manualForm.name,
      sku: manualForm.sku.trim().toUpperCase(),
      category: manualForm.category,
      brand: manualForm.brand,
      price: priceNum,
      sale: manualForm.oldPrice ? Number(manualForm.oldPrice) : priceNum,
      stock: stockNum,
      status: manualForm.status,
      featured: manualForm.featured === "Yes",
      availability: manualForm.availability,
      model: manualForm.model,
      variant: manualForm.variant,
      ram: manualForm.ram,
      storage: manualForm.storage,
      processor: manualForm.processor,
      color: manualForm.color,
      condition: manualForm.condition,
      warranty: manualForm.warranty,
      shortDesc: manualForm.shortDesc,
      images: manualForm.images,
      supplier: manualForm.supplier,
      supplierCode: manualForm.supplierCode,
      tags: manualForm.tags,
      barcode: manualForm.barcode
    })

    setManualSuccess(true)
    // Clear form
    setManualForm({
      sku: "",
      category: "Mobile",
      brand: "",
      name: "",
      price: "",
      stock: "",
      availability: "In Stock",
      featured: "No",
      status: "Published",
      model: "",
      variant: "",
      ram: "",
      storage: "",
      processor: "",
      color: "",
      condition: "New",
      oldPrice: "",
      warranty: "",
      shortDesc: "",
      images: "",
      supplier: "",
      supplierCode: "",
      tags: "",
      barcode: ""
    })
  }

  // --- BULK IMPORT STATE ---
  const [importStep, setImportStep] = React.useState<1 | 2 | 3 | 4>(1)
  const [csvHeaders, setCsvHeaders] = React.useState<string[]>([])
  const [csvDataRows, setCsvDataRows] = React.useState<string[][]>([])
  
  // Mappings system field -> CSV header index
  const [columnMappings, setColumnMappings] = React.useState<Record<string, string>>({
    sku: "",
    category: "",
    brand: "",
    name: "",
    price: "",
    stock: "",
    availability: "",
    featured: "",
    status: ""
  })

  // Parsed and validated rows
  const [validatedImportRows, setValidatedImportRows] = React.useState<ValidatedImportRow[]>([])
  const [importSummary, setImportSummary] = React.useState({
    total: 0,
    valid: 0,
    warnings: 0,
    errors: 0
  })

  const loadDemoImport = () => {
    handleRawCsvLoad(DEMO_IMPORT_CSV)
  }

  const handleRawCsvLoad = (csvText: string) => {
    const parsed = parseCSV(csvText)
    if (parsed.length < 2) return

    const headers = parsed[0]
    const data = parsed.slice(1)
    setCsvHeaders(headers)
    setCsvDataRows(data)

    // Automap headers
    const autoMap: Record<string, string> = {}
    const systemFields = ["sku", "category", "brand", "name", "price", "stock", "availability", "featured", "status"]
    
    systemFields.forEach(field => {
      let matchedHeader = ""
      const fLower = field.toLowerCase()
      headers.forEach(h => {
        const hLower = h.toLowerCase()
        if (hLower === fLower) matchedHeader = h
        else if (fLower === "name" && (hLower === "product_name" || hLower === "item" || hLower === "title")) matchedHeader = h
        else if (fLower === "price" && (hLower === "price_npr" || hLower === "mrp" || hLower === "cost")) matchedHeader = h
        else if (fLower === "stock" && (hLower === "stock_quantity" || hLower === "qty" || hLower === "quantity")) matchedHeader = h
        else if (fLower === "status" && (hLower === "product_status" || hLower === "state")) matchedHeader = h
      })
      autoMap[field] = matchedHeader || headers[0] || ""
    })
    
    setColumnMappings(autoMap)
    setImportStep(2)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        handleRawCsvLoad(event.target.result as string)
      }
    }
    reader.readAsText(file)
  }

  const startValidation = () => {
    const parsedRows: ValidatedImportRow[] = []
    const total = csvDataRows.length
    let validCount = 0
    let errorCount = 0

    // Keep track of SKUs within the import to check duplicates
    const importSkuSet = new Set<string>()

    csvDataRows.forEach((row, index) => {
      const getValue = (field: string) => {
        const headerName = columnMappings[field]
        const headerIndex = csvHeaders.indexOf(headerName)
        return headerIndex !== -1 ? row[headerIndex] : ""
      }

      const rawSku = getValue("sku")?.trim()
      const rawCategory = getValue("category")?.trim()
      const rawBrand = getValue("brand")?.trim()
      const rawName = getValue("name")?.trim()
      const rawPrice = getValue("price")?.trim()
      const rawStock = getValue("stock")?.trim()
      const rawAvailability = getValue("availability")?.trim()
      const rawFeatured = getValue("featured")?.trim()
      const rawStatus = getValue("status")?.trim()

      const errors: string[] = []

      // Validate
      if (!rawSku) errors.push("SKU is required.")
      else {
        const skuUpper = rawSku.toUpperCase()
        if (importSkuSet.has(skuUpper)) {
          errors.push(`Duplicate SKU '${rawSku}' inside import sheet.`)
        } else {
          importSkuSet.add(skuUpper)
        }

        if (rows.some(p => String(p.sku).toUpperCase() === skuUpper)) {
          errors.push(`SKU '${rawSku}' already exists in store catalog.`)
        }
      }

      if (!rawCategory) errors.push("Category is required.")
      else if (!VALID_CATEGORIES.includes(rawCategory)) {
        errors.push(`Category '${rawCategory}' must be Smart Phone, Accessories, or Earbuds.`)
      }

      if (!rawBrand) errors.push("Brand is required.")
      if (!rawName) errors.push("Product name is required.")

      const priceNum = Number(rawPrice)
      if (!rawPrice || isNaN(priceNum) || priceNum <= 0) {
        errors.push("Price must be greater than 0.")
      }

      const stockNum = Number(rawStock)
      if (rawStock === "" || isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) {
        errors.push("Stock must be an integer >= 0.")
      }

      const parsedAvailability = rawAvailability || "In Stock"
      if (parsedAvailability && !["In Stock", "Out of Stock", "Preorder"].includes(parsedAvailability)) {
        errors.push("Availability must be In Stock, Out of Stock, or Preorder.")
      }

      const parsedFeatured = rawFeatured === "Yes" || rawFeatured === "true" || rawFeatured === "1"
      const parsedStatus = rawStatus || "Published"

      const isValid = errors.length === 0
      if (isValid) validCount++
      else errorCount++

      parsedRows.push({
        index: index + 1,
        sku: rawSku || "MISSING",
        category: rawCategory,
        brand: rawBrand,
        name: rawName,
        price: priceNum,
        stock: stockNum,
        availability: parsedAvailability,
        featured: parsedFeatured,
        status: parsedStatus,
        errors,
        isValid
      })
    })

    setValidatedImportRows(parsedRows)
    setImportSummary({
      total,
      valid: validCount,
      warnings: 0,
      errors: errorCount
    })

    setImportStep(3)
  }

  const confirmImport = () => {
    // Add only valid rows
    const validRows = validatedImportRows.filter(r => r.isValid)
    validRows.forEach(row => {
      addRow({
        name: row.name,
        sku: row.sku.toUpperCase(),
        category: row.category,
        brand: row.brand,
        price: row.price,
        sale: row.price,
        stock: row.stock,
        status: row.status,
        featured: row.featured,
        availability: row.availability
      })
    })
    setImportStep(4)
  }

  // --- BULK UPDATE STATE ---
  const [updateStep, setUpdateStep] = React.useState<1 | 2 | 3>(1)
  const [validatedUpdateRows, setValidatedUpdateRows] = React.useState<ValidatedUpdateRow[]>([])
  const [updateSummary, setUpdateSummary] = React.useState({
    total: 0,
    updated: 0,
    notFound: 0,
    errors: 0
  })

  const loadDemoUpdate = () => {
    handleUpdateCsvLoad(DEMO_UPDATE_CSV)
  }

  const handleUpdateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        handleUpdateCsvLoad(event.target.result as string)
      }
    }
    reader.readAsText(file)
  }

  const handleUpdateCsvLoad = (csvText: string) => {
    const parsed = parseCSV(csvText)
    if (parsed.length < 2) return

    const headers = parsed[0].map(h => h.toLowerCase().trim())
    const dataRows = parsed.slice(1)

    const skuIdx = headers.indexOf("sku")
    const priceIdx = headers.indexOf("new_price_npr") !== -1 ? headers.indexOf("new_price_npr") : headers.indexOf("price")
    const stockIdx = headers.indexOf("new_stock_quantity") !== -1 ? headers.indexOf("new_stock_quantity") : headers.indexOf("stock")
    const availIdx = headers.indexOf("availability")
    const statusIdx = headers.indexOf("product_status") !== -1 ? headers.indexOf("product_status") : headers.indexOf("status")

    if (skuIdx === -1) {
      alert("CSV must contain a 'SKU' column.")
      return
    }

    const updates: ValidatedUpdateRow[] = []
    let updatedCount = 0
    let notFoundCount = 0
    let errorCount = 0

    dataRows.forEach((row, index) => {
      const sku = row[skuIdx]?.trim()
      const rawPrice = priceIdx !== -1 ? row[priceIdx]?.trim() : ""
      const rawStock = stockIdx !== -1 ? row[stockIdx]?.trim() : ""
      const rawAvail = availIdx !== -1 ? row[availIdx]?.trim() : ""
      const rawStatus = statusIdx !== -1 ? row[statusIdx]?.trim() : ""

      const errors: string[] = []
      
      if (!sku) {
        errors.push("SKU is empty on row " + (index + 2))
        errorCount++
        updates.push({
          index: index + 1,
          sku: "EMPTY",
          exists: false,
          newPrice: null,
          newStock: null,
          availability: "",
          status: "",
          errors,
          isValid: false,
        })
        return
      }

      // Check catalog matching
      const catalogProduct = rows.find(p => String(p.sku).toUpperCase() === sku.toUpperCase())
      const exists = !!catalogProduct

      const priceNum = rawPrice ? Number(rawPrice) : null
      const stockNum = rawStock ? Number(rawStock) : null

      if (priceNum !== null && (isNaN(priceNum) || priceNum <= 0)) {
        errors.push("New Price must be greater than 0.")
      }

      if (stockNum !== null && (isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum))) {
        errors.push("New Stock must be an integer >= 0.")
      }

      // Auto-set availability if stock becomes 0
      let finalAvailability = rawAvail || (exists ? String(catalogProduct.availability) : "In Stock")
      if (stockNum === 0) {
        finalAvailability = "Out of Stock"
      }

      if (finalAvailability && !["In Stock", "Out of Stock", "Preorder"].includes(finalAvailability)) {
        errors.push("Availability must be In Stock, Out of Stock, or Preorder.")
      }

      if (!exists) {
        errors.push(`SKU '${sku}' not found in catalog. Row will be skipped.`)
        notFoundCount++
      }

      const isValid = errors.length === 0
      if (isValid && exists) {
        updatedCount++
      } else if (!exists) {
        // counted in notFoundCount
      } else {
        errorCount++
      }

      updates.push({
        index: index + 1,
        sku: sku.toUpperCase(),
        catalogProduct,
        exists,
        newPrice: priceNum,
        newStock: stockNum,
        availability: finalAvailability,
        status: rawStatus || (exists ? String(catalogProduct.status) : "Published"),
        errors,
        isValid: isValid && exists
      })
    })

    setValidatedUpdateRows(updates)
    setUpdateSummary({
      total: dataRows.length,
      updated: updatedCount,
      notFound: notFoundCount,
      errors: errorCount
    })
    setUpdateStep(2)
  }

  const confirmBulkUpdate = () => {
    validatedUpdateRows.forEach(upd => {
      if (!upd.isValid || !upd.catalogProduct) return
      
      // Update catalog row values
      const updatedFields: AdminRow = {}
      if (upd.newPrice !== null) updatedFields.price = upd.newPrice
      if (upd.newStock !== null) {
        updatedFields.stock = upd.newStock
        // Auto set status tags for list
        if (upd.newStock === 0) updatedFields.status = "Sold Out"
        else if (upd.newStock <= 3) updatedFields.status = "Low Stock"
        else updatedFields.status = upd.status || "Published"
      }
      if (upd.availability) updatedFields.availability = upd.availability
      
      updateRow(String(upd.catalogProduct._id), updatedFields)
    })
    setUpdateStep(3)
  }

  // Categories list options
  const categoryOptions = ["All", ...VALID_CATEGORIES]

  return (
    <div className="space-y-4">
      {/* Sub tabs navigation */}
      <div className="flex border-b border-slate-200 gap-1 bg-white p-1.5 rounded-xl shadow-sm">
        {[
          { id: "list", label: "Product List", icon: Package },
          { id: "manual", label: "Manual Add Product", icon: PlusCircle },
          { id: "import", label: "Bulk Product Import", icon: UploadCloud },
          { id: "update", label: "Bulk Price/Stock Update", icon: RefreshCw },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveSubTab(tab.id as ProductSubTab)
              // Reset status
              setManualSuccess(false)
              setImportStep(1)
              setUpdateStep(1)
            }}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg transition duration-200 cursor-pointer",
              activeSubTab === tab.id
                ? "bg-orange-50 text-orange-600 shadow-inner"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            )}
          >
            <tab.icon className="size-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. PRODUCT LIST VIEW */}
      {activeSubTab === "list" && (
        <div className="space-y-4">
          {/* Header Controls */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Products</h1>
            
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-orange-500" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  className="h-10 rounded-full border-slate-200 bg-white pl-9 pr-4 text-sm focus-visible:border-orange-500 focus-visible:ring-orange-500/20"
                />
              </div>

              {/* Filter by */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-10 rounded-full border-0 bg-orange-100 px-4 text-sm font-semibold text-orange-700 hover:bg-orange-200 transition-colors focus:ring-0 outline-none cursor-pointer"
              >
                <option value="All">Filter by: All</option>
                {categoryOptions.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              {/* Add product button */}
              <Button
                type="button"
                onClick={() => {
                  setManualSuccess(false)
                  setActiveSubTab("manual")
                }}
                className="h-10 rounded-full bg-orange-600 px-5 text-sm font-semibold text-white hover:bg-orange-700"
              >
                <PlusCircle className="size-4" />
                Add Product
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-slate-150 rounded-2xl shadow-sm overflow-hidden">
            <TableShell columns={["", "Name of product", "Status", "Stock Info", "Category", "Location", ""]}>
              {filteredProducts.map((product) => {
                const isSoldOut = String(product.status) === "Sold Out";
                return (
                  <TableRow
                    key={String(product._id)}
                    className={cn(
                      "hover:bg-orange-50/10 transition-colors",
                      isSoldOut && "opacity-55"
                    )}
                  >
                    {/* Circular Checkbox */}
                    <Cell className="w-10">
                      <div className="size-5 rounded-full border border-orange-300 flex items-center justify-center cursor-pointer hover:border-orange-500">
                        <span className="size-2.5 rounded-full bg-orange-600 scale-0 transition-transform" />
                      </div>
                    </Cell>

                    {/* Image & Product Name */}
                    <Cell>
                      <div className="flex items-center gap-3">
                        <img
                          src={String(product.image ?? "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150")}
                          alt={String(product.name)}
                          className="size-11 rounded-lg object-cover border border-slate-100 flex-shrink-0"
                        />
                        <span className="font-semibold text-slate-800 text-sm">{product.name}</span>
                      </div>
                    </Cell>

                    {/* Status Badge */}
                    <Cell>
                      <StatusBadge status={String(product.status)} />
                    </Cell>

                    {/* Stock Info */}
                    <Cell className="font-semibold text-slate-700">
                      {product.stock} in stock
                    </Cell>

                    {/* Category */}
                    <Cell className="font-medium text-slate-500">
                      {product.category}
                    </Cell>

                    {/* Location */}
                    <Cell className="font-medium text-slate-500">
                      {product.location ?? 0} stores
                    </Cell>

                    {/* Delete controls */}
                    <Cell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => deleteRow(String(product._id))}
                          className="size-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          aria-label="Delete product"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </Cell>
                  </TableRow>
                );
              })}
            </TableShell>
          </div>
        </div>
      )}

      {/* 2. MANUAL ADD PRODUCT FORM */}
      {activeSubTab === "manual" && (
        <Panel 
          title="Manual Single Product Registration"
          description="Fill out the fields to add a single product manually to catalog database."
        >
          {manualSuccess ? (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <Check className="size-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Product Registered Successfully!</h3>
                <p className="text-sm text-slate-500">
                  The new item has been added to your catalog and is active in-memory.
                </p>
              </div>
              <div className="flex gap-2 justify-center pt-2">
                <Button
                  onClick={() => setManualSuccess(false)}
                  className="rounded-[8px] bg-[#ea580c] text-white hover:bg-[#c2410c]"
                >
                  Add Another Product
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveSubTab("list")}
                  className="rounded-[8px]"
                >
                  View Product List
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-6">
              <div className="bg-slate-50/80 p-4 rounded-[10px] border border-slate-100">
                <h3 className="text-xs font-black text-[#ea580c] uppercase tracking-wider mb-4">Required Parameters</h3>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">SKU (Unique)</label>
                    <Input
                      value={manualForm.sku}
                      onChange={(e) => setManualForm({ ...manualForm, sku: e.target.value })}
                      placeholder="e.g. MBA-M3-512"
                      className={cn("h-10 border-slate-200 bg-white", manualErrors.sku && "border-rose-500 focus-visible:ring-rose-500/20")}
                    />
                    {manualErrors.sku && <span className="text-[10px] text-rose-500 font-bold block">{manualErrors.sku}</span>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Category</label>
                    <Select
                      value={manualForm.category}
                      onChange={(e) => setManualForm({ ...manualForm, category: e.target.value })}
                      className="h-10 rounded-[8px] border-slate-200 bg-white text-sm font-semibold text-slate-800"
                    >
                      {VALID_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Brand</label>
                    <Input
                      value={manualForm.brand}
                      onChange={(e) => setManualForm({ ...manualForm, brand: e.target.value })}
                      placeholder="e.g. Apple"
                      className={cn("h-10 border-slate-200 bg-white", manualErrors.brand && "border-rose-500")}
                    />
                    {manualErrors.brand && <span className="text-[10px] text-rose-500 font-bold block">{manualErrors.brand}</span>}
                  </div>

                  <div className="space-y-1 sm:col-span-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Product Name</label>
                    <Input
                      value={manualForm.name}
                      onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                      placeholder="e.g. Apple iPhone 17 Pro Max 12GB/256GB"
                      className={cn("h-10 border-slate-200 bg-white", manualErrors.name && "border-rose-500")}
                    />
                    {manualErrors.name && <span className="text-[10px] text-rose-500 font-bold block">{manualErrors.name}</span>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Price (NPR)</label>
                    <Input
                      type="number"
                      value={manualForm.price}
                      onChange={(e) => setManualForm({ ...manualForm, price: e.target.value })}
                      placeholder="e.g. 245000"
                      className={cn("h-10 border-slate-200 bg-white", manualErrors.price && "border-rose-500")}
                    />
                    {manualErrors.price && <span className="text-[10px] text-rose-500 font-bold block">{manualErrors.price}</span>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Stock Quantity</label>
                    <Input
                      type="number"
                      value={manualForm.stock}
                      onChange={(e) => setManualForm({ ...manualForm, stock: e.target.value })}
                      placeholder="e.g. 5"
                      className={cn("h-10 border-slate-200 bg-white", manualErrors.stock && "border-rose-500")}
                    />
                    {manualErrors.stock && <span className="text-[10px] text-rose-500 font-bold block">{manualErrors.stock}</span>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Availability</label>
                    <Select
                      value={manualForm.availability}
                      onChange={(e) => setManualForm({ ...manualForm, availability: e.target.value })}
                      className="h-10 rounded-[8px] border-slate-200 bg-white text-sm font-semibold text-slate-800"
                    >
                      {["In Stock", "Out of Stock", "Preorder"].map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Featured On Site</label>
                    <Select
                      value={manualForm.featured}
                      onChange={(e) => setManualForm({ ...manualForm, featured: e.target.value })}
                      className="h-10 rounded-[8px] border-slate-200 bg-white text-sm font-semibold text-slate-800"
                    >
                      {["No", "Yes"].map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Product Status</label>
                    <Select
                      value={manualForm.status}
                      onChange={(e) => setManualForm({ ...manualForm, status: e.target.value })}
                      className="h-10 rounded-[8px] border-slate-200 bg-white text-sm font-semibold text-slate-800"
                    >
                      {["Published", "Draft"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              {/* Optional Section */}
              <div className="border border-slate-100 rounded-[10px] overflow-hidden">
                <div className="bg-slate-50/50 p-3 px-4 border-b border-slate-100">
                  <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider">Optional Details / Specs</h3>
                </div>
                <div className="p-4 grid gap-4 sm:grid-cols-4 bg-white">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">Model Name</label>
                    <Input
                      value={manualForm.model}
                      onChange={(e) => setManualForm({ ...manualForm, model: e.target.value })}
                      placeholder="e.g. Pro 14"
                      className="h-9 border-slate-200 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">Variant/Details</label>
                    <Input
                      value={manualForm.variant}
                      onChange={(e) => setManualForm({ ...manualForm, variant: e.target.value })}
                      placeholder="e.g. M3 Max Chip"
                      className="h-9 border-slate-200 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">RAM</label>
                    <Input
                      value={manualForm.ram}
                      onChange={(e) => setManualForm({ ...manualForm, ram: e.target.value })}
                      placeholder="e.g. 36GB"
                      className="h-9 border-slate-200 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">Storage Size</label>
                    <Input
                      value={manualForm.storage}
                      onChange={(e) => setManualForm({ ...manualForm, storage: e.target.value })}
                      placeholder="e.g. 1TB SSD"
                      className="h-9 border-slate-200 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">Processor/Chipset</label>
                    <Input
                      value={manualForm.processor}
                      onChange={(e) => setManualForm({ ...manualForm, processor: e.target.value })}
                      placeholder="e.g. 16-Core GPU"
                      className="h-9 border-slate-200 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">Color</label>
                    <Input
                      value={manualForm.color}
                      onChange={(e) => setManualForm({ ...manualForm, color: e.target.value })}
                      placeholder="e.g. Space Black"
                      className="h-9 border-slate-200 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">Condition</label>
                    <Select
                      value={manualForm.condition}
                      onChange={(e) => setManualForm({ ...manualForm, condition: e.target.value })}
                      className="h-9 rounded-[8px] border-slate-200 bg-white text-xs font-semibold text-slate-800"
                    >
                      {["New", "Refurbished", "Pre-Owned"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">Old Price (NPR)</label>
                    <Input
                      type="number"
                      value={manualForm.oldPrice}
                      onChange={(e) => setManualForm({ ...manualForm, oldPrice: e.target.value })}
                      placeholder="e.g. 260000"
                      className={cn("h-9 border-slate-200 text-xs", manualErrors.oldPrice && "border-rose-500")}
                    />
                    {manualErrors.oldPrice && <span className="text-[9px] text-rose-500 font-bold block">{manualErrors.oldPrice}</span>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">Warranty Term</label>
                    <Input
                      value={manualForm.warranty}
                      onChange={(e) => setManualForm({ ...manualForm, warranty: e.target.value })}
                      placeholder="e.g. 1 Year Store Warranty"
                      className="h-9 border-slate-200 text-xs"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-3">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">Short Description</label>
                    <Input
                      value={manualForm.shortDesc}
                      onChange={(e) => setManualForm({ ...manualForm, shortDesc: e.target.value })}
                      placeholder="Enter short marketing brief..."
                      className="h-9 border-slate-200 text-xs"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">Image URLs (comma separated)</label>
                    <Input
                      value={manualForm.images}
                      onChange={(e) => setManualForm({ ...manualForm, images: e.target.value })}
                      placeholder="http://image.url/pic.png"
                      className="h-9 border-slate-200 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">Supplier Name</label>
                    <Input
                      value={manualForm.supplier}
                      onChange={(e) => setManualForm({ ...manualForm, supplier: e.target.value })}
                      placeholder="e.g. Apple Distributors Nepal"
                      className="h-9 border-slate-200 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">Supplier Code</label>
                    <Input
                      value={manualForm.supplierCode}
                      onChange={(e) => setManualForm({ ...manualForm, supplierCode: e.target.value })}
                      placeholder="e.g. SUP-APL-KT"
                      className="h-9 border-slate-200 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveSubTab("list")}
                  className="rounded-[8px] h-11"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-[8px] bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold h-11 px-6 shadow-md shadow-black/5 cursor-pointer"
                >
                  Save to Catalog
                </Button>
              </div>
            </form>
          )}
        </Panel>
      )}

      {/* 3. BULK PRODUCT IMPORT */}
      {activeSubTab === "import" && (
        <Panel 
          title="Bulk Product Import Manager"
          description="Import products in bulk using a structured CSV sheet."
        >
          {/* Step indicators */}
          <div className="mb-6 grid grid-cols-4 gap-2 text-center text-xs font-bold border-b border-slate-100 pb-3">
            {[
              { num: 1, label: "Upload Sheet" },
              { num: 2, label: "Map Columns" },
              { num: 3, label: "Validate & Preview" },
              { num: 4, label: "Import Status" }
            ].map((step) => (
              <div 
                key={step.num} 
                className={cn(
                  "pb-1 border-b-2 transition duration-200", 
                  importStep === step.num 
                    ? "border-[#ea580c] text-[#ea580c]" 
                    : importStep > step.num 
                      ? "border-emerald-500 text-emerald-600" 
                      : "border-transparent text-slate-400"
                )}
              >
                Step {step.num}: {step.label}
              </div>
            ))}
          </div>

          {/* STEP 1: UPLOAD FILE */}
          {importStep === 1 && (
            <div className="space-y-6 text-center py-10 max-w-lg mx-auto">
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-slate-50 border border-slate-100 text-slate-400">
                <UploadCloud className="size-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-800">Select or Drag CSV File</h3>
                <p className="text-xs text-slate-500">
                  Upload a standard product catalog file. Map headers in the next step.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button
                  onClick={loadDemoImport}
                  className="rounded-[8px] bg-slate-900 hover:bg-slate-800 text-white font-bold h-11"
                >
                  Load Demo Import Data
                </Button>
                <div className="relative">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    id="csv-file-input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-[8px] h-11 border-dashed border-2 hover:border-[#ea580c]/50"
                  >
                    Upload Custom CSV
                  </Button>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-[8px] p-4 text-left text-xs text-slate-500 space-y-2 mt-4">
                <p className="font-bold text-slate-700 flex items-center gap-1">
                  <Info className="size-3.5 text-[#ea580c]" /> Schema Requirements
                </p>
                <ul className="list-disc pl-4 space-y-1 font-medium">
                  <li>Category must be Smart Phone, Accessories, or Earbuds.</li>
                  <li>Price must be positive, Stock must be non-negative integer.</li>
                  <li>SKU values must be unique in shop database.</li>
                </ul>
              </div>
            </div>
          )}

          {/* STEP 2: COLUMN MAPPING */}
          {importStep === 2 && (
            <div className="space-y-6">
              <div className="bg-amber-50/70 border border-amber-100 p-3 rounded-[8px] text-xs font-semibold text-slate-600 flex items-center gap-2">
                <Info className="size-4 text-amber-500 shrink-0" />
                Please map system fields to match the headers detected in your uploaded CSV.
              </div>

              <div className="border border-slate-100 rounded-[10px] bg-white overflow-hidden">
                <div className="grid grid-cols-[200px_1fr] border-b border-slate-100 bg-slate-50/50 p-3 text-xs font-black uppercase tracking-wider text-slate-400">
                  <div>Required System Field</div>
                  <div>Select CSV Column Header</div>
                </div>

                <div className="divide-y divide-slate-100">
                  {Object.keys(columnMappings).map((field) => (
                    <div key={field} className="grid grid-cols-[200px_1fr] items-center p-3.5">
                      <div className="text-sm font-bold text-slate-700 capitalize">
                        {field.replace("_", " ")} <span className="text-rose-500">*</span>
                      </div>
                      <div>
                        <Select
                          value={columnMappings[field]}
                          onChange={(e) => setColumnMappings({ ...columnMappings, [field]: e.target.value })}
                          className="h-10 max-w-sm rounded-[8px] border-slate-200 bg-white text-sm font-semibold text-slate-800"
                        >
                          {csvHeaders.map((h) => (
                            <option key={h} value={h}>{h}</option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setImportStep(1)}
                  className="rounded-[8px]"
                >
                  Back
                </Button>
                <Button
                  onClick={startValidation}
                  className="rounded-[8px] bg-[#ea580c] text-white hover:bg-[#c2410c] font-bold"
                >
                  Validate Data Sheet
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: VALIDATE & PREVIEW */}
          {importStep === 3 && (
            <div className="space-y-6">
              {/* Report Panel */}
              <div className="grid gap-3 sm:grid-cols-4">
                <div className="bg-slate-50 border border-slate-100 rounded-[8px] p-4 text-center">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Total Rows</span>
                  <span className="text-2xl font-black text-slate-700">{importSummary.total}</span>
                </div>
                <div className="bg-emerald-50/70 border border-emerald-100 rounded-[8px] p-4 text-center">
                  <span className="block text-xs font-bold text-emerald-600/70 uppercase tracking-wider">Valid Rows</span>
                  <span className="text-2xl font-black text-emerald-600">{importSummary.valid}</span>
                </div>
                <div className="bg-rose-50/70 border border-rose-100 rounded-[8px] p-4 text-center">
                  <span className="block text-xs font-bold text-rose-500/70 uppercase tracking-wider">Error Rows</span>
                  <span className="text-2xl font-black text-rose-600">{importSummary.errors}</span>
                </div>
                <div className="bg-amber-50/70 border border-amber-100 rounded-[8px] p-4 text-center flex items-center justify-center">
                  {importSummary.errors > 0 ? (
                    <span className="text-xs font-bold text-amber-600 leading-snug">
                      Bad rows will be skipped automatically during catalog import.
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600 leading-snug">
                      All catalog rows are valid and ready to import.
                    </span>
                  )}
                </div>
              </div>

              {/* Preview List */}
              <div className="border border-slate-100 rounded-[10px] overflow-hidden bg-white">
                <div className="bg-slate-50/50 p-3.5 border-b border-slate-100">
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Validation Preview</h3>
                </div>

                <div className="max-h-[350px] overflow-y-auto" data-lenis-prevent>
                  <TableShell columns={["Row", "Status", "SKU", "Product Name", "Category", "Price", "Stock", "Errors"]}>
                    {validatedImportRows.map((row) => (
                      <TableRow key={row.index} className={cn("hover:bg-slate-50/50", !row.isValid && "bg-rose-50/20")}>
                        <Cell className="font-semibold text-slate-400">#{row.index}</Cell>
                        <Cell>
                          {row.isValid ? (
                            <span className="flex items-center gap-1 text-emerald-600 text-xs font-black">
                              <CheckCircle className="size-3.5 shrink-0" /> Valid
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-rose-500 text-xs font-black">
                              <AlertTriangle className="size-3.5 shrink-0" /> Error
                            </span>
                          )}
                        </Cell>
                        <Cell className="font-semibold">{row.sku}</Cell>
                        <Cell className="font-semibold line-clamp-1">{row.name}</Cell>
                        <Cell>{row.category}</Cell>
                        <Cell>{formatPrice(row.price)}</Cell>
                        <Cell>{row.stock}</Cell>
                        <Cell className="text-rose-500 text-xs max-w-xs">
                          {row.errors.map((e: string, i: number) => (
                            <span key={i} className="block">• {e}</span>
                          ))}
                        </Cell>
                      </TableRow>
                    ))}
                  </TableShell>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setImportStep(2)}
                  className="rounded-[8px]"
                >
                  Back to Mapping
                </Button>
                {importSummary.valid > 0 ? (
                  <Button
                    onClick={confirmImport}
                    className="rounded-[8px] bg-emerald-600 text-white hover:bg-emerald-700 font-bold"
                  >
                    Import Valid Rows ({importSummary.valid})
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="rounded-[8px] bg-slate-300 text-slate-500 font-bold"
                  >
                    No Valid Rows to Import
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS REPORT */}
          {importStep === 4 && (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <Check className="size-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Import Complete!</h3>
                <p className="text-sm text-slate-500">
                  Successfully added <span className="font-bold text-emerald-600">{importSummary.valid}</span> products to your in-memory database.
                </p>
              </div>
              
              <div className="flex gap-2 justify-center pt-2">
                <Button
                  onClick={() => setImportStep(1)}
                  className="rounded-[8px] bg-[#ea580c] text-white hover:bg-[#c2410c] font-bold"
                >
                  Import Another Sheet
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveSubTab("list")}
                  className="rounded-[8px]"
                >
                  View Updated Catalog
                </Button>
              </div>
            </div>
          )}
        </Panel>
      )}

      {/* 4. BULK PRICE/STOCK UPDATE */}
      {activeSubTab === "update" && (
        <Panel 
          title="Bulk Price & Stock Update Utility"
          description="Update existing product prices and stock quantities by SKU matching."
        >
          {/* Step indicators */}
          <div className="mb-6 grid grid-cols-3 gap-2 text-center text-xs font-bold border-b border-slate-100 pb-3">
            {[
              { num: 1, label: "Upload Sheet" },
              { num: 2, label: "Verify Match Updates" },
              { num: 3, label: "Success Status" }
            ].map((step) => (
              <div 
                key={step.num} 
                className={cn(
                  "pb-1 border-b-2 transition duration-200", 
                  updateStep === step.num 
                    ? "border-[#ea580c] text-[#ea580c]" 
                    : updateStep > step.num 
                      ? "border-emerald-500 text-emerald-600" 
                      : "border-transparent text-slate-400"
                )}
              >
                Step {step.num}: {step.label}
              </div>
            ))}
          </div>

          {/* STEP 1: UPLOAD CSV */}
          {updateStep === 1 && (
            <div className="space-y-6 text-center py-10 max-w-lg mx-auto">
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-slate-50 border border-slate-100 text-slate-400">
                <UploadCloud className="size-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-800">Select Price/Stock CSV Sheet</h3>
                <p className="text-xs text-slate-500">
                  Must include SKU column to map changes to active database items.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button
                  onClick={loadDemoUpdate}
                  className="rounded-[8px] bg-slate-900 hover:bg-slate-800 text-white font-bold h-11"
                >
                  Load Demo Update Data
                </Button>
                <div className="relative">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleUpdateFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    id="update-file-input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-[8px] h-11 border-dashed border-2 hover:border-[#ea580c]/50"
                  >
                    Upload Custom CSV
                  </Button>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-[8px] p-4 text-left text-xs text-slate-500 space-y-2 mt-4">
                <p className="font-bold text-slate-700 flex items-center gap-1">
                  <Info className="size-3.5 text-[#ea580c]" /> Schema Fields
                </p>
                <ul className="list-disc pl-4 space-y-1 font-medium">
                  <li><strong>SKU</strong> (Required for match)</li>
                  <li><strong>New_Price_NPR</strong> (Optional replacement cost)</li>
                  <li><strong>New_Stock_Quantity</strong> (Optional replacement stock quantity)</li>
                  <li><strong>Availability</strong> (In Stock, Out of Stock, or Preorder)</li>
                </ul>
              </div>
            </div>
          )}

          {/* STEP 2: VERIFY UPDATES */}
          {updateStep === 2 && (
            <div className="space-y-6">
              {/* Report Panel */}
              <div className="grid gap-3 sm:grid-cols-4">
                <div className="bg-slate-50 border border-slate-100 rounded-[8px] p-4 text-center">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Total Sheet Rows</span>
                  <span className="text-2xl font-black text-slate-700">{updateSummary.total}</span>
                </div>
                <div className="bg-emerald-50/70 border border-emerald-100 rounded-[8px] p-4 text-center">
                  <span className="block text-xs font-bold text-emerald-600/70 uppercase tracking-wider">Match Found Rows</span>
                  <span className="text-2xl font-black text-emerald-600">{updateSummary.updated}</span>
                </div>
                <div className="bg-amber-50/70 border border-amber-100 rounded-[8px] p-4 text-center">
                  <span className="block text-xs font-bold text-amber-600/70 uppercase tracking-wider">SKUs Not Found</span>
                  <span className="text-2xl font-black text-amber-600">{updateSummary.notFound}</span>
                </div>
                <div className="bg-rose-50/70 border border-rose-100 rounded-[8px] p-4 text-center">
                  <span className="block text-xs font-bold text-rose-500/70 uppercase tracking-wider">Constraint Errors</span>
                  <span className="text-2xl font-black text-rose-600">{updateSummary.errors}</span>
                </div>
              </div>

              {/* Preview table of updates */}
              <div className="border border-slate-100 rounded-[10px] overflow-hidden bg-white">
                <div className="bg-slate-50/50 p-3.5 border-b border-slate-100">
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Verify Modifications</h3>
                </div>

                <div className="max-h-[350px] overflow-y-auto" data-lenis-prevent>
                  <TableShell columns={["Row", "Status", "SKU", "Catalog Name", "Change Summary", "Warnings/Errors"]}>
                    {validatedUpdateRows.map((upd) => {
                      const catalogProduct = upd.catalogProduct

                      return (
                        <TableRow key={upd.index} className={cn("hover:bg-slate-50/50", !upd.exists && "bg-amber-50/20", upd.errors.length > 0 && !upd.isValid && "bg-rose-50/20")}>
                          <Cell className="font-semibold text-slate-400">#{upd.index}</Cell>
                          <Cell>
                            {upd.isValid ? (
                              <span className="flex items-center gap-1 text-emerald-600 text-xs font-black">
                                <CheckCircle className="size-3.5 shrink-0" /> Ready
                              </span>
                            ) : !upd.exists ? (
                              <span className="flex items-center gap-1 text-amber-600 text-xs font-black">
                                <AlertTriangle className="size-3.5 shrink-0" /> Not Found
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-rose-500 text-xs font-black">
                                <X className="size-3.5 shrink-0" /> Error
                              </span>
                            )}
                          </Cell>
                          <Cell className="font-semibold">{upd.sku}</Cell>
                          <Cell className="font-semibold">
                            {catalogProduct ? catalogProduct.name : <span className="text-slate-400">—</span>}
                          </Cell>
                          <Cell className="text-xs font-semibold text-slate-600">
                            {catalogProduct ? (
                              <div className="space-y-0.5">
                                {upd.newPrice !== null && (
                                  <p>Price: <span className="line-through text-slate-400">{formatPrice(Number(catalogProduct.price))}</span> → <span className="font-bold text-[#ea580c]">{formatPrice(upd.newPrice)}</span></p>
                                )}
                                {upd.newStock !== null && (
                                  <p>Stock: <span className="line-through text-slate-400">{catalogProduct.stock}</span> → <span className="font-bold text-slate-900">{upd.newStock}</span></p>
                                )}
                                {upd.availability && upd.availability !== String(catalogProduct.availability) && (
                                  <p>Availability: <span className="font-bold text-[#2b0f52]">{upd.availability}</span></p>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-400">No action</span>
                            )}
                          </Cell>
                          <Cell className="text-xs text-rose-500 max-w-xs">
                            {upd.errors.map((e: string, i: number) => (
                              <span key={i} className="block">• {e}</span>
                            ))}
                          </Cell>
                        </TableRow>
                      )
                    })}
                  </TableShell>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setUpdateStep(1)}
                  className="rounded-[8px]"
                >
                  Upload Again
                </Button>
                {updateSummary.updated > 0 ? (
                  <Button
                    onClick={confirmBulkUpdate}
                    className="rounded-[8px] bg-emerald-600 text-white hover:bg-emerald-700 font-bold"
                  >
                    Confirm Bulk Updates ({updateSummary.updated})
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="rounded-[8px] bg-slate-300 text-slate-500 font-bold"
                  >
                    No Valid Matches to Update
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS REPORT */}
          {updateStep === 3 && (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <Check className="size-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Database Updated!</h3>
                <p className="text-sm text-slate-500">
                  Successfully modified price/stock data for <span className="font-bold text-emerald-600">{updateSummary.updated}</span> catalog products.
                </p>
              </div>

              <div className="flex gap-2 justify-center pt-2">
                <Button
                  onClick={() => setUpdateStep(1)}
                  className="rounded-[8px] bg-[#ea580c] text-white hover:bg-[#c2410c] font-bold"
                >
                  Upload Another Update Sheet
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveSubTab("list")}
                  className="rounded-[8px]"
                >
                  View Product List
                </Button>
              </div>
            </div>
          )}
        </Panel>
      )}
    </div>
  )
}
