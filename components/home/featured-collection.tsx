import Link from "next/link"
import Image from "next/image"
import type { ShopifyProduct } from "@/lib/shopify/types"

export function FeaturedCollection({
  title = "New Arrivals",
  subtitle = "The latest additions to our collection",
  products,
  viewAllHref = "/collections/new-arrivals",
}: {
  title?: string
  subtitle?: string
  products: ShopifyProduct[]
  viewAllHref?: string
}) {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">{title}</h2>
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          </div>
          <Link href={viewAllHref} className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground hidden sm:block">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 4).map((product) => {
            const image = product.images.edges[0]?.node
            const price = parseFloat(product.priceRange.minVariantPrice.amount)
            const compareAt = product.compareAtPriceRange?.minVariantPrice
              ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
              : null
            const isOnSale = compareAt && compareAt > price
            const colorOption = product.options.find((o) => o.name === "Color")

            return (
              <Link key={product.id} href={`/shop/${product.handle}`} className="group product-card">
                <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-3">
                  {image && (
                    <Image
                      src={image.url}
                      alt={image.altText || product.title}
                      fill
                      className="object-cover product-card-image"
                    />
                  )}
                  {isOnSale && (
                    <span className="absolute top-3 left-3 bg-sale text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      SALE -{Math.round(((compareAt! - price) / compareAt!) * 100)}%
                    </span>
                  )}
                  {!isOnSale && product.productType === "new" && (
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                </div>
                {/* Color swatches */}
                {colorOption && (
                  <div className="flex gap-1.5 mb-2">
                    {colorOption.values.slice(0, 4).map((color) => (
                      <span
                        key={color}
                        className="w-4 h-4 rounded-full border border-border"
                        style={{ backgroundColor: getSwatchColor(color) }}
                        title={color}
                      />
                    ))}
                    {colorOption.values.length > 4 && (
                      <span className="text-xs text-muted-foreground">+{colorOption.values.length - 4}</span>
                    )}
                  </div>
                )}
                <h3 className="text-sm font-medium">{product.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-sm font-semibold ${isOnSale ? "text-sale" : ""}`}>
                    ${price.toFixed(2)}
                  </span>
                  {isOnSale && compareAt && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${compareAt.toFixed(2)}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
        <div className="text-center mt-8 sm:hidden">
          <Link href={viewAllHref} className="text-sm font-medium underline underline-offset-4">
            View All
          </Link>
        </div>
      </div>
    </section>
  )
}

function getSwatchColor(name: string): string {
  const map: Record<string, string> = {
    white: "#ffffff", black: "#111111", navy: "#1e293b", olive: "#4a5a3a",
    "grey marle": "#9ca3af", cream: "#fdf8f0", tan: "#d2b48c", camel: "#c19a6b",
    charcoal: "#374151", "red floral": "#dc2626", "navy dot": "#1e293b",
    brown: "#8b5a2b", "medium wash": "#5b8db8", "dark wash": "#2d4a7a",
    sage: "#9caf88", "white/grey": "#e5e7eb",
  }
  return map[name.toLowerCase()] || "#d1d5db"
}
