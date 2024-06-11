import { NextResponse } from "next/server"
import * as jose from 'jose';
import cookies from 'js-cookie';

export async function middleware(req, res) {
    const token = req.cookies.get('token')?.value;
    console.log('middleware invoked by: ', req.url);
    if (!token) {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url);
    }

    const jwtConfig = {
        secret: new TextEncoder().encode(process.env.JWT_SECRET),
    }

    try {
        const decoded = await jose.jwtVerify(token, jwtConfig.secret);
        // req.userId = decoded.payload?.userId;
        cookies.set('userId', decoded.payload?.userId, { expires: 1 });
        return NextResponse.next();
    }
    catch (error) {
        // cookies.remove('token')            // NEED TO ADD THE FUNCTIONALITY TO CLEAR THE FAKE/CORRUPTED COOKIE
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
    ],

}