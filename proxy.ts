import createMiddleware from 'next-intl/middleware';
import {routing} from './navigation';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /static (static files)
  // - /favicon.ico, /sitemap.xml, /robots.txt (metadata files)
  matcher: ['/((?!api|_next|_vercel|static|.*\\..*).*)']
};
