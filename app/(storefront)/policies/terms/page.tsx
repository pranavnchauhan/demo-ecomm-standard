import { brand } from "@/config/brand"

export const metadata = { title: "Terms of Service" }

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-light tracking-tight mb-8">Terms of Service</h1>
      <div className="prose prose-sm text-muted-foreground space-y-4">
        <p>By using the {brand.name} website, you agree to these terms of service.</p>
        <p>All products are subject to availability. Prices are in {brand.shipping.currency} and include GST where applicable.</p>
        <p>We reserve the right to refuse or cancel any order for any reason.</p>
        <p>Product images are for illustration purposes only. Actual colors may vary slightly from those shown on screen.</p>
      </div>
    </div>
  )
}
