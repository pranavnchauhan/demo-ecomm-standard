"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { brand } from "@/config/brand"

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi])

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => emblaApi.scrollNext(), 6000)
    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <section className="relative bg-muted">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {brand.hero.slides.map((slide, index) => (
            <div key={index} className="flex-none w-full min-h-[70vh] lg:min-h-[80vh]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full py-16 lg:py-0">
                  {/* Text */}
                  <div className="order-2 lg:order-1">
                    <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">
                      {slide.season}
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-6 whitespace-pre-line">
                      {slide.headline}
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-md">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={slide.ctaPrimary.href}
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-medium rounded-full hover:opacity-90 transition-opacity"
                      >
                        {slide.ctaPrimary.label}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href={slide.ctaSecondary.href}
                        className="inline-flex items-center gap-2 px-8 py-3.5 border border-foreground text-foreground font-medium rounded-full hover:bg-foreground hover:text-background transition-colors"
                      >
                        {slide.ctaSecondary.label}
                      </Link>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="order-1 lg:order-2 relative aspect-[4/3] lg:aspect-[3/4] rounded-2xl overflow-hidden bg-border">
                    <Image
                      src={slide.image}
                      alt={slide.headline.replace("\n", " ")}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  )
}
