import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getIdByUrl } from './services/utils';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
    
  if (req.nextUrl.pathname.endsWith('/')) {
    const jwt = req.cookies.get('tokenAuth');
    if (!jwt) return NextResponse.redirect(new URL('/login', req.url));

    try {
      await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if(req.nextUrl.pathname.startsWith('/login')) {
    const tokenAuth = req.cookies.get('tokenAuth')
    if(!tokenAuth) return;
    try {
      await jwtVerify(tokenAuth, new TextEncoder().encode(process.env.JWT_SECRET_KEY))
      return NextResponse.redirect(new URL('/', req.url));
    } catch (err) {
      console.log(err);
    }
  }

  if (!req.nextUrl.pathname.endsWith(`/`) && !req.nextUrl.pathname.startsWith('/login')) {
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
}

export const config = {
  matcher: ['/api/entries/:id/:path*', '/', '/login']
};
