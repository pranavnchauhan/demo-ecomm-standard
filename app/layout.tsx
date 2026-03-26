import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { CartProvider } from "@/components/cart/cart-context"
import { brand } from "@/config/brand"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: { default: brand.seo.defaultTitle, template: brand.seo.titleTemplate },
  description: brand.seo.defaultDescription,
  keywords: [...brand.seo.keywords],
  openGraph: {
    type: "website",
    title: brand.seo.defaultTitle,
    description: brand.seo.defaultDescription,
    siteName: brand.name,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
