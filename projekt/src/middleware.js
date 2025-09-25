import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function middleware(request) {

    const cookieStore = await cookies();

    if (request.nextUrl.pathname === '/my-listings') {

        if (!cookieStore.has('swaphub_access_token') || !cookieStore.has('swaphub_user_id')) {

            return NextResponse.redirect(new URL('/', request.url));
        }
    }
}