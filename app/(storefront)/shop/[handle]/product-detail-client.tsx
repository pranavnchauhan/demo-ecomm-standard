"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Minus, Plus, Share2, Truck, RotateCcw, Shield } from "lucide-react"
import type { ShopifyProduct, ProductVariant } from "@/lib/shopify/types"
import { useCart } from "@/components/cart/cart-context"
import { brand } from "@/config/brand"

export function ProductDetailClient({ product }: { product: ShopifyProduct }) {
  const { addItem, operationInProgress } = useCart()

  const colorOption = product.options.find((o) => o.name === "Color")
  const sizeOption = product.options.find((o) => o.name === "Size")

  const [selectedColor, setSelectedColor] = useState(colorOption?.values[0] ?? "")
  const [selectedSize, setSelectedSize] = useState(sizeOption?.values[0] ?? "")
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const selectedVariant = product.variants.find((v) =>
    v.selectedOptions.every((opt) => {
      if (opt.name === "Color") return opt.value === selectedColor
      if (opt.name === "Size") return opt.value === selectedSize
      return true
    })
  ) ?? product.variants[0]

  const price = selectedVariant
    ? parseFloat(selectedVariant.price.amount)
    : parseFloat(product.priceRange.minVariantPrice.amount)

  const compareAt = product.compareAtPriceRange?.minVariantPrice
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null
  const isOnSale = compareAt !== null && compareAt > price

  const images = product.images.edges.map((e) => e.node)
  const currentImage = images[selectedImageIndex] || images[0]

  async function handleAddToCart() {
    if (!selectedVariant) return
    await addItem(selectedVariant, product)
  }

  async function handleBuyNow() {
    if (!selectedVariant) return
    await addItem(selectedVariant, product)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/shop" className="hover:text-foreground">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Image */}
        <div>
          <div className="relative aspect-square bg-muted rounded-xl overflow-hidden">
            {currentImage && (
              <Image
                src={currentImage.url}
                alt={currentImage.altText || product.title}
                fill
                className="object-cover"
                priority
              />
            )}
            {isOnSale && (
              <span className="absolute top-4 left-4 bg-sale text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                SALE
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {images.slice(0, 5).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    i === selectedImageIndex ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image src={img.url} alt={img.altText || ""} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {product.productType && (
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {product.productType}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight mt-1">{product.title}</h1>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <span className={`text-2xl font-semibold ${isOnSale ? "text-sale" : ""}`}>
              ${price.toFixed(2)}
            </span>
            {isOnSale && compareAt && (
              <span className="text-lg text-muted-foreground line-through">${compareAt.toFixed(2)}</span>
            )}
          </div>

          <p className="text-muted-foreground mt-4 leading-relaxed">{product.description}</p>

          {product.availableForSale && (
            <span className="inline-block text-xs font-medium text-green-600 mt-3">In Stock</span>
          )}

          {/* Color */}
          {colorOption && (
            <div className="mt-6">
              <p className="text-sm font-medium mb-3">
                COLOR: <span className="font-normal text-muted-foreground">{selectedColor.toUpperCase()}</span>
              </p>
              <div className="flex gap-2">
                {colorOption.values.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      selectedColor === color ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-foreground/30"
                    }`}
                    style={{ backgroundColor: getSwatchColor(color) }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          {sizeOption && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium">SIZE</p>
                <button className="text-xs text-muted-foreground underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizeOption.values.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 text-sm border rounded-lg transition-all ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-3">QUANTITY</p>
            <div className="inline-flex items-center border border-border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2.5 hover:bg-muted"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2.5 text-sm font-medium min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2.5 hover:bg-muted"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleAddToCart}
              disabled={operationInProgress || !product.availableForSale}
              className="flex-1 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={operationInProgress || !product.availableForSale}
              className="flex-1 py-3.5 border border-foreground text-foreground font-semibold rounded-full hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>

          {/* Share */}
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-4">
            <Share2 className="w-4 h-4" />
            Share
          </button>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RotateCcw className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Free Returns</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getSwatchColor(name: string): string {
  const map: Record<string, string> = {
    white: "#ffffff", black: "#111111", navy: "#1e293b", olive: "#4a5a3a",
    "grey marle": "#9ca3af", cream: "#fdf8f0", tan: "#d2b48c", camel: "#c19a6b",
    charcoal: "#374151", "red floral": "#dc2626", "navy dot": "#1e293b",
    brown: "#8b5a2b", "medium wash": "#5b8db8", "dark wash": "#2d4a7a",
    sage: "#9caf88", "white/grey": "#e5e7eb", "navy/white": "#1e293b",
  }
  return map[name.toLowerCase()] || "#d1d5db"
}
