import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';
import { getIdByUrl } from './services/utils';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { id } = await getIdByUrl(req.nextUrl.pathname);
  const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');

  if (!checkMongoIDRegExp.test(id))
    return NextResponse.rewrite(new URL('/api/hello', req.nextUrl), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
      statusText: `< ID > ${id} __Error 404 not found__`,
    });

  return NextResponse.next();
}

export const config = {
  matcher: '/api/entries/:id/:path*'
};
