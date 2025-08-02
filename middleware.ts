import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Example middleware: logs requests and blocks unauthenticated access to /app/*
export function middleware(request: NextRequest) {
  // Log incoming requests
  console.log(`[Middleware] ${request.method} ${request.url}`)

  // Example: Block unauthenticated access to /app/*
  if (request.nextUrl.pathname.startsWith('/app')) {
    // You can add your own authentication logic here
    // For demo, allow all requests
    // To block, uncomment below:
    // return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/app/:path*'],
}
