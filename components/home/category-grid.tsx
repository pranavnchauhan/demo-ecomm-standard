import Link from "next/link"
import Image from "next/image"
import { brand } from "@/config/brand"

export function CategoryGrid() {
  return (
    <section className="py-16 lg:py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-center mb-10">Shop by Category</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {brand.collections.map((collection) => (
            <Link
              key={collection.handle}
              href={`/collections/${collection.handle}`}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-border"
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-xl font-medium">{collection.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
