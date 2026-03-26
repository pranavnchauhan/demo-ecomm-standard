import { brand } from "@/config/brand"

export const metadata = { title: "Privacy Policy" }

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-light tracking-tight mb-8">Privacy Policy</h1>
      <div className="prose prose-sm text-muted-foreground space-y-4">
        <p>{brand.name} is committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.</p>
        <p>We collect information you provide directly, such as your name, email, shipping address, and payment details when you place an order.</p>
        <p>We use this information solely to process orders, communicate with you, and improve our services.</p>
        <p>We do not sell or share your personal information with third parties except as necessary to fulfill orders (e.g., shipping carriers).</p>
      </div>
    </div>
  )
}
