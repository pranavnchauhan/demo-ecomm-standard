import { getProduct, getProducts } from "@/lib/shopify"
import { notFound } from "next/navigation"
import { ProductDetailClient } from "./product-detail-client"
import type { Metadata } from "next"
import { brand } from "@/config/brand"

type Props = { params: Promise<{ handle: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) return {}
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} | ${brand.name}`,
      description: product.description,
      images: product.images.edges[0]?.node.url ? [product.images.edges[0].node.url] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) notFound()

  return <ProductDetailClient product={product} />
}
