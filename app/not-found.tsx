import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
      >
        Back to Home
      </Link>
    </div>
  )
}
