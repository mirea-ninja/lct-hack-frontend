import { NextResponse, NextRequest } from "next/server"

export async function middleware(req, ev) {
  const url = req.nextUrl.clone()
  url.pathname = "/login"
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/"],
}
