"use client"

import { useState, useMemo } from "react"
import type { ShopifyProduct, ShopifyCollection } from "@/lib/shopify/types"
import { ProductCard } from "@/components/products/product-card"

export function ShopPageClient({
  products,
  collections,
}: {
  products: ShopifyProduct[]
  collections: ShopifyCollection[]
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedCategory) {
      result = result.filter((p) =>
        p.productType?.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.productType?.toLowerCase().includes(q)
      )
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount))
        break
      case "price-desc":
        result.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount))
        break
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return result
  }, [products, selectedCategory, sortBy, searchQuery])

  const categories = useMemo(() => {
    const types = new Set(products.map((p) => p.productType).filter(Boolean))
    return Array.from(types) as string[]
  }, [products])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-muted py-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight">Shop All</h1>
        <p className="text-muted-foreground mt-2">Discover our complete collection of thoughtfully designed pieces.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="px-4 py-2.5 border border-border rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm bg-white"
            >
              <option value="featured">Featured</option>
              <option value="title">Name A-Z</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-32">
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Category</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`text-sm w-full text-left py-1 ${!selectedCategory ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-sm w-full text-left py-1 ${selectedCategory === cat ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
