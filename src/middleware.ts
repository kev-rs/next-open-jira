import { NextResponse, NextRequest } from 'next/server';
import { getId } from './services';

export async function middleware(req: NextRequest) {
  const params = await getId(req.nextUrl.pathname);
  const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$').test(params.id);

  if(!checkMongoIDRegExp) return NextResponse.rewrite(new URL(`/api/entries/${params.id}`, req.nextUrl), {
    status: 404,
    statusText: `_404_ < ID -> ${params.id} > not found`
  })

  return NextResponse.next();
}

export const config = {
  matcher: '/api/entries/:id/:path*'
}