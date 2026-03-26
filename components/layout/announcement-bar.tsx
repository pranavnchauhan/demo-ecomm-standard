import { brand } from "@/config/brand"

export function AnnouncementBar() {
  return (
    <div className="bg-primary text-primary-foreground text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="text-[13px] tracking-wide">{brand.announcement.text}</span>
        <div className="hidden sm:flex items-center gap-4">
          {brand.announcement.links.map((link) => (
            <a key={link.label} href={link.href} className="hover:underline text-[13px]">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
