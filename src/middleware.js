import { NextResponse } from 'next/server';

export function middleware(request) {
  const isAuthenticated = request.cookies.get('authenticated')?.value;
  const path = request.nextUrl.pathname;

  // Jika mencoba akses dashboard dan belum login
  if (path.startsWith('/dashboard') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Jika sudah login tapi mencoba akses halaman signin
  if (path.startsWith('/auth/signin') && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/signin'],
};
