import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Example: You can add specific middleware logic here
  // if you need authentication checks or redirects.
  // For now, we just allow everything to continue.

  return NextResponse.next();
}

export const config = {
  // Keep your matcher pattern
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
