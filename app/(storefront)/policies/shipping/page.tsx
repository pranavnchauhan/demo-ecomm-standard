import { brand } from "@/config/brand"

export const metadata = { title: "Shipping Policy" }

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-light tracking-tight mb-8">Shipping Policy</h1>
      <div className="prose prose-sm text-muted-foreground space-y-4">
        <p>We offer free standard shipping on all orders over ${brand.shipping.freeThreshold} {brand.shipping.currency}.</p>
        <p>Standard shipping typically takes 3-7 business days. Express shipping options are available at checkout.</p>
        <p>All orders are dispatched from our warehouse within 1-2 business days.</p>
        <p>International shipping is available to select countries. Rates and delivery times vary by destination.</p>
      </div>
    </div>
  )
}
