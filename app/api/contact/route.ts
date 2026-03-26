import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // In production, send to GHL webhook or email service
    console.log("[contact] New submission:", { name, email, message })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
