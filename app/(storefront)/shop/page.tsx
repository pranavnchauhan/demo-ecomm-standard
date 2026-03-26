import { getProducts, getCollections } from "@/lib/shopify"
import { ShopPageClient } from "./shop-page-client"

export const metadata = {
  title: "Shop All",
  description: "Browse our complete collection of thoughtfully designed pieces.",
}

export default async function ShopPage() {
  const [products, collections] = await Promise.all([
    getProducts({ first: 50 }),
    getCollections(),
  ])

  return <ShopPageClient products={products} collections={collections} />
}
