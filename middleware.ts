import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const locale = request.nextUrl.pathname.startsWith('/en') ? 'en' : 'cs';
  requestHeaders.set('x-site-locale', locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|sitemap.xml|robots.txt|rss).*)'],
};
