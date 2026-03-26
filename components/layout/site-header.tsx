"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingBag, Menu, X } from "lucide-react"
import { brand } from "@/config/brand"
import { useCart } from "@/components/cart/cart-context"
import { AnnouncementBar } from "./announcement-bar"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openCart, itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-1">
              <span className="text-xl tracking-[0.2em] font-light">{brand.name.split(" ")[0].toUpperCase()}</span>
              <span className="text-xl tracking-[0.2em] font-bold">{brand.name.split(" ").slice(1).join(" ").toUpperCase()}</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {brand.navigation.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                    "highlight" in item && item.highlight ? "text-sale" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-muted rounded-full transition-colors" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={openCart}
                className="p-2 hover:bg-muted rounded-full transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <nav className="px-4 py-4 space-y-3">
              {brand.navigation.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-base font-medium py-2 ${
                    "highlight" in item && item.highlight ? "text-sale" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
