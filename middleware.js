// Importing necessary modules and functions from Next.js and the 'jose' library for JWT handling.
import { NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { unsealData } from "iron-session"

// Encoding the JWT secret key to be used in verifying the JWT token.
const jwtSecret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)

// The asynchronous middleware function that intercepts requests.
export async function middleware(request) {
  // Checking if the request URL starts with '/dashboard'. This is to protect these routes.
  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/set-up")
  ) {
    const accessToken = request.cookies.get("accessToken") // Attempting to retrieve the 'accessToken' cookie.

    // If no accessToken is found, redirect to the login page.
    if (!accessToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }

    // Attempting to verify the accessToken. If verification is successful, proceed with the request.
    // Checking if accessToken is not null or undefined before calling jwtVerify and unsealData functions.
    if (accessToken) {
      try {
        const data = await unsealData(accessToken.value, {
          password: process.env.NEXT_PUBLIC_IRON_SECRET,
        })
        await jwtVerify(data.jwt, jwtSecret)
        return NextResponse.next()
      } catch (error) {
        // For any verification errors, redirect to the login page.
        return NextResponse.redirect(new URL("/sign-in", request.url))
      }
    } else {
      // If accessToken is null or undefined, redirect to the login page.
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }
  }

  // Special handling for '/sign-in' path.
  if (request.nextUrl.pathname.startsWith("/sign-in")) {
    const accessToken = request.cookies.get("accessToken")

    const response = NextResponse.next()
    // Preemptively delete any existing accessToken cookie.
    // response.cookies.delete("accessToken")

    // If an accessToken exists, verify it. If verification is successful, redirect to the dashboard.
    if (accessToken) {
      try {
        const data = await unsealData(accessToken?.value, {
          password: process.env.NEXT_PUBLIC_IRON_SECRET,
        })
        await jwtVerify(data?.jwt, jwtSecret)
        return NextResponse.redirect(new URL("/dashboard", request.url))
      } catch (error) {
        // If token verification fails, just return the response to continue with the login page.
        return response
      }
    }

    return response
  }
}

// Configuration for the middleware, specifying which paths it should apply to.
export const config = {
  matcher: [
    "/dashboard/:path*", // Applies to all paths under '/dashboard'
    "/set-up/:path*", // Applies to all paths under '/set-up'
    "/sign-in/:path*", // Applies to all paths under '/sign-in'
  ],
}
