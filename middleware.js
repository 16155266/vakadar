import { NextResponse } from 'next/server';
import { GATE_COOKIE, gateTokenFor } from './lib/gate';

export async function middleware(req) {
  const expected = await gateTokenFor(process.env.SITE_PASSWORD);
  const cookie = req.cookies.get(GATE_COOKIE)?.value;

  if (cookie === expected) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = '/gate';
  url.searchParams.set('from', req.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!gate|api/gate|_next/static|_next/image|favicon.ico).*)'],
};
