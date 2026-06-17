import { Heart, ShoppingCart, Star, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  img_url: string;
  badge?: string;
  badgeColor?: string;
  soldOut?: boolean;
  discount?: number;
  isGenuine?: boolean;
  specs?: string[];
}

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addItem } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.soldOut) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.img_url,
      });
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div
        className={`group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-purple-200 transition-all duration-200 cursor-pointer relative ${
          product.soldOut ? "opacity-60 grayscale" : ""
        }`}
      >
        {/* Image Container */}
        <div className={`relative bg-[#F9FAFB] overflow-hidden ${compact ? "h-36" : "h-44 sm:h-52"}`}>
          <img
            src={product.img_url}
            alt={product.name}
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.soldOut ? (
              <Badge className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded-md font-figtree border-0">
                Sold Out
              </Badge>
            ) : (
              <>
                {discount && discount > 0 && (
                  <Badge className="bg-[#f97316] text-white text-xs px-2 py-0.5 rounded-md font-figtree border-0">
                    -{discount}%
                  </Badge>
                )}
                {product.badge && (
                  <Badge
                    className={`text-white text-xs px-2 py-0.5 rounded-md font-figtree border-0 ${
                      product.badgeColor || "bg-[#4c1d95]"
                    }`}
                  >
                    {product.badge}
                  </Badge>
                )}
              </>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500 text-gray-400"
          >
            <Heart className="w-3.5 h-3.5" />
          </button>

          {/* Genuine Badge */}
          {product.isGenuine && !compact && (
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-green-50 border border-green-200 rounded-md px-1.5 py-0.5">
              <Shield className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-700 font-figtree font-medium">Genuine</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <p className="text-xs text-[#4c1d95] font-figtree font-semibold uppercase tracking-wide mb-0.5">
            {product.brand}
          </p>
          <h3 className={`font-figtree font-semibold text-gray-800 line-clamp-2 leading-snug mb-1.5 ${compact ? "text-xs" : "text-sm"}`}>
            {product.name}
          </h3>

          {/* Specs (non-compact) */}
          {!compact && product.specs && product.specs.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {product.specs.slice(0, 2).map((spec, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-figtree">
                  {spec}
                </span>
              ))}
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? "fill-[#f97316] text-[#f97316]" : "text-gray-200 fill-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-figtree">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between">
            <div>
              <div className="font-outfit font-bold text-gray-900 text-base">
                Rs. {product.price.toLocaleString("en-NP")}
              </div>
              {product.originalPrice && (
                <div className="text-xs text-gray-400 line-through font-figtree">
                  Rs. {product.originalPrice.toLocaleString("en-NP")}
                </div>
              )}
            </div>

            {/* Add to Cart */}
            {!product.soldOut && (
              <button
                onClick={handleAddToCart}
                className="w-8 h-8 rounded-xl bg-[#4c1d95] hover:bg-[#3b0764] text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}