import nextIntlMiddleware from 'next-intl/middleware';

export default nextIntlMiddleware({
  locales: ['en', 'es', 'pt'],
  defaultLocale: 'es'
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)']
};