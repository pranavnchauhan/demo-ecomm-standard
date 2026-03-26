import { getProducts } from "@/lib/shopify"
import { HeroCarousel } from "@/components/home/hero-carousel"
import { FeaturedCollection } from "@/components/home/featured-collection"
import { CategoryGrid } from "@/components/home/category-grid"
import { NewsletterSection } from "@/components/home/newsletter-section"

export default async function HomePage() {
  const products = await getProducts({ first: 8, sortKey: "BEST_SELLING" })

  return (
    <>
      <HeroCarousel />
      <FeaturedCollection
        title="New Arrivals"
        subtitle="The latest additions to our collection"
        products={products}
        viewAllHref="/collections/new-arrivals"
      />
      <CategoryGrid />
      <FeaturedCollection
        title="Best Sellers"
        subtitle="Our most-loved pieces"
        products={products.slice(0, 4)}
        viewAllHref="/shop"
      />
      <NewsletterSection />
    </>
  )
}
