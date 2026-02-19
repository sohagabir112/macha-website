import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Do not run Supabase code on static files
    if (
        request.nextUrl.pathname.startsWith('/_next') ||
        request.nextUrl.pathname.startsWith('/static') ||
        request.nextUrl.pathname.startsWith('/favicon.ico')
    ) {
        return supabaseResponse
    }

    // Check auth status
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (
        !user &&
        !request.nextUrl.pathname.startsWith('/login') &&
        !request.nextUrl.pathname.startsWith('/auth') &&
        !request.nextUrl.pathname.startsWith('/') && // Allow Landing
        !request.nextUrl.pathname.startsWith('/shop') && // Allow Shop
        !request.nextUrl.pathname.startsWith('/about') && // Allow About
        !request.nextUrl.pathname.startsWith('/journal') // Allow Journal
    ) {
        // Redirect to login if accessing protected route
        // For now, no protected routes are defined except maybe /account
        // Any other route -> login
        // return NextResponse.redirect(new URL('/login', request.url))
    }

    return supabaseResponse
}
