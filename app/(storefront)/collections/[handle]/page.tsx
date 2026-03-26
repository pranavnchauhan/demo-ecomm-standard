import { getCollectionProducts } from "@/lib/shopify"
import { ProductCard } from "@/components/products/product-card"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { brand } from "@/config/brand"

type Props = { params: Promise<{ handle: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const collection = brand.collections.find((c) => c.handle === handle)
  return {
    title: collection?.title || handle.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  }
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params
  const products = await getCollectionProducts(handle, { first: 50 })
  const collection = brand.collections.find((c) => c.handle === handle)
  const title = collection?.title || handle.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div>
      <div className="bg-muted py-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-2">{products.length} product{products.length !== 1 ? "s" : ""}</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No products in this collection yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
