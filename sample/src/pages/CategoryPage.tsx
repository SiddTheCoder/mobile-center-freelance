import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SlidersHorizontal, ChevronDown, Grid3X3, List, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { categoryProducts } from "@/data/products";

const BRANDS = ["Apple", "Samsung", "Sony", "Dell", "Xiaomi", "OnePlus", "JBL", "Logitech", "ASUS", "Realme", "Google", "Canon"];
const PRICE_RANGES = [
  { label: "Under Rs. 20,000", min: 0, max: 20000 },
  { label: "Rs. 20,000 – 50,000", min: 20000, max: 50000 },
  { label: "Rs. 50,000 – 1,00,000", min: 50000, max: 100000 },
  { label: "Rs. 1,00,000 – 2,00,000", min: 100000, max: 200000 },
  { label: "Above Rs. 2,00,000", min: 200000, max: Infinity },
];
const RATINGS = [4, 3, 2];
const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export default function CategoryPage() {
  const { slug } = useParams();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(300000);

  const categoryName = slug
    ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
    : "All Products";

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  let filtered = [...categoryProducts];

  if (selectedBrands.length > 0) {
    filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
  }
  if (selectedPriceRange !== null) {
    const range = PRICE_RANGES[selectedPriceRange];
    filtered = filtered.filter((p) => p.price >= range.min && p.price <= range.max);
  }
  if (selectedRating !== null) {
    filtered = filtered.filter((p) => p.rating >= selectedRating);
  }
  if (inStockOnly) {
    filtered = filtered.filter((p) => !p.soldOut);
  }

  filtered = filtered.filter((p) => p.price >= priceMin && p.price <= priceMax);

  if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

  const activeFilters = [
    ...selectedBrands,
    selectedPriceRange !== null ? PRICE_RANGES[selectedPriceRange].label : null,
    selectedRating !== null ? `${selectedRating}★ & above` : null,
    inStockOnly ? "In Stock Only" : null,
  ].filter(Boolean) as string[];

  const clearFilter = (filter: string) => {
    if (selectedBrands.includes(filter)) {
      setSelectedBrands((prev) => prev.filter((b) => b !== filter));
    } else if (filter === `${selectedRating}★ & above`) {
      setSelectedRating(null);
    } else if (filter === "In Stock Only") {
      setInStockOnly(false);
    } else {
      setSelectedPriceRange(null);
    }
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Availability */}
      <div>
        <h3 className="font-outfit font-bold text-gray-800 text-sm mb-3">Availability</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 accent-[#4c1d95]"
          />
          <span className="text-sm font-figtree text-gray-600">In Stock Only</span>
        </label>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Brand */}
      <div>
        <h3 className="font-outfit font-bold text-gray-800 text-sm mb-3">Brand</h3>
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-4 h-4 accent-[#4c1d95]"
              />
              <span className="text-sm font-figtree text-gray-600">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Price Range */}
      <div>
        <h3 className="font-outfit font-bold text-gray-800 text-sm mb-3">Price Range</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                checked={selectedPriceRange === i}
                onChange={() => setSelectedPriceRange(i)}
                className="w-4 h-4 accent-[#4c1d95]"
              />
              <span className="text-sm font-figtree text-gray-600">{range.label}</span>
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="priceRange"
              checked={selectedPriceRange === null}
              onChange={() => setSelectedPriceRange(null)}
              className="w-4 h-4 accent-[#4c1d95]"
            />
            <span className="text-sm font-figtree text-gray-500">All Prices</span>
          </label>
        </div>

        {/* Slider */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs font-figtree text-gray-500">
            <span>Rs. {priceMin.toLocaleString()}</span>
            <span>Rs. {priceMax.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={0}
            max={300000}
            step={5000}
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full accent-[#4c1d95]"
          />
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Rating */}
      <div>
        <h3 className="font-outfit font-bold text-gray-800 text-sm mb-3">Customer Rating</h3>
        <div className="space-y-2">
          {RATINGS.map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === r}
                onChange={() => setSelectedRating(r)}
                className="w-4 h-4 accent-[#4c1d95]"
              />
              <div className="flex items-center gap-1">
                <span className="text-sm font-figtree text-gray-600">{r}★</span>
                <span className="text-xs text-gray-400 font-figtree">& above</span>
              </div>
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={selectedRating === null}
              onChange={() => setSelectedRating(null)}
              className="w-4 h-4 accent-[#4c1d95]"
            />
            <span className="text-sm font-figtree text-gray-500">All Ratings</span>
          </label>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedBrands([]);
            setSelectedPriceRange(null);
            setSelectedRating(null);
            setInStockOnly(false);
          }}
          className="w-full border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-figtree"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F9FAFB] border-b border-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-1.5 text-sm font-figtree text-gray-500">
            <Link to="/" className="hover:text-[#4c1d95]">Home</Link>
            <span>/</span>
            <span className="text-gray-800 font-semibold">{categoryName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Filter Sidebar - Desktop */}
          <aside className="w-56 flex-shrink-0 hidden md:block">
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-[#4c1d95]" />
                <h2 className="font-outfit font-bold text-gray-800">Filters</h2>
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h1 className="font-outfit font-black text-xl text-gray-900">{categoryName}</h1>
                <p className="text-sm text-gray-500 font-figtree mt-0.5">
                  {filtered.length} products found
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="md:hidden flex items-center gap-2 rounded-xl border-[#4c1d95] text-[#4c1d95] font-figtree"
                  onClick={() => setMobileFilterOpen(true)}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {activeFilters.length > 0 && (
                    <Badge className="bg-[#4c1d95] text-white text-xs ml-1 h-4 min-w-[16px] rounded-full p-0 flex items-center justify-center border-0">
                      {activeFilters.length}
                    </Badge>
                  )}
                </Button>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-figtree text-gray-700 pr-8 cursor-pointer focus:outline-none focus:border-[#4c1d95]"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="hidden sm:flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-[#4c1d95] text-white" : "text-gray-400 hover:bg-gray-50"} transition-colors`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-[#4c1d95] text-white" : "text-gray-400 hover:bg-gray-50"} transition-colors`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeFilters.map((f) => (
                  <Badge
                    key={f}
                    className="bg-purple-50 text-[#4c1d95] border border-purple-200 rounded-full px-3 py-1 font-figtree text-xs flex items-center gap-1.5 cursor-pointer"
                    onClick={() => clearFilter(f)}
                  >
                    {f}
                    <X className="w-3 h-3" />
                  </Badge>
                ))}
              </div>
            )}

            {/* Product Grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <SlidersHorizontal className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="font-outfit font-bold text-gray-700 text-lg">No products found</h3>
                <p className="text-gray-400 font-figtree text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className={viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
                : "flex flex-col gap-3"
              }>
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white z-50 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-4 border-b bg-[#4c1d95] text-white">
              <h2 className="font-outfit font-bold">Filters</h2>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar />
            </div>
            <div className="p-4 border-t sticky bottom-0 bg-white">
              <Button
                className="w-full bg-[#4c1d95] hover:bg-[#3b0764] text-white rounded-xl font-outfit font-bold"
                onClick={() => setMobileFilterOpen(false)}
              >
                Show {filtered.length} Results
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}