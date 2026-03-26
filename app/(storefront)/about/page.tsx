import Image from "next/image"
import { brand } from "@/config/brand"

export const metadata = {
  title: "Our Story",
  description: brand.about.heroSubtitle,
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[300px]">
        <Image
          src={brand.about.heroImage}
          alt={brand.about.heroTitle}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl px-4">
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-4">{brand.about.heroTitle}</h1>
            <p className="text-lg text-white/80">{brand.about.heroSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          {brand.about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
