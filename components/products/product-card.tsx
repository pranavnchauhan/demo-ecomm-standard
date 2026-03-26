import Link from "next/link"
import Image from "next/image"
import type { ShopifyProduct } from "@/lib/shopify/types"

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const image = product.images.edges[0]?.node
  const price = parseFloat(product.priceRange.minVariantPrice.amount)
  const compareAt = product.compareAtPriceRange?.minVariantPrice
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null
  const isOnSale = compareAt !== null && compareAt > price
  const colorOption = product.options.find((o) => o.name === "Color")
  const currency = product.priceRange.minVariantPrice.currencyCode

  return (
    <Link href={`/shop/${product.handle}`} className="group product-card">
      <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-3">
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            className="object-cover product-card-image"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
        {isOnSale && (
          <span className="absolute top-3 left-3 bg-sale text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            SALE -{Math.round(((compareAt! - price) / compareAt!) * 100)}%
          </span>
        )}
      </div>

      {/* Color swatches */}
      {colorOption && (
        <div className="flex gap-1.5 mb-2">
          {colorOption.values.slice(0, 4).map((color) => (
            <span
              key={color}
              className="w-3.5 h-3.5 rounded-full border border-border"
              style={{ backgroundColor: getSwatchColor(color) }}
              title={color}
            />
          ))}
          {colorOption.values.length > 4 && (
            <span className="text-xs text-muted-foreground ml-0.5">+{colorOption.values.length - 4}</span>
          )}
        </div>
      )}

      <h3 className="text-sm font-medium group-hover:underline">{product.title}</h3>

      <div className="flex items-center gap-2 mt-1">
        <span className={`text-sm font-semibold ${isOnSale ? "text-sale" : ""}`}>
          ${price.toFixed(2)}
        </span>
        {isOnSale && compareAt && (
          <span className="text-sm text-muted-foreground line-through">
            ${compareAt.toFixed(2)}
          </span>
        )}
        <span className="text-xs text-muted-foreground">{currency}</span>
      </div>
    </Link>
  )
}

function getSwatchColor(name: string): string {
  const map: Record<string, string> = {
    white: "#ffffff", black: "#111111", navy: "#1e293b", olive: "#4a5a3a",
    "grey marle": "#9ca3af", cream: "#fdf8f0", tan: "#d2b48c", camel: "#c19a6b",
    charcoal: "#374151", "red floral": "#dc2626", "navy dot": "#1e293b",
    brown: "#8b5a2b", "medium wash": "#5b8db8", "dark wash": "#2d4a7a",
    sage: "#9caf88", "white/grey": "#e5e7eb", "navy/white": "#1e293b",
  }
  return map[name.toLowerCase()] || "#d1d5db"
}
