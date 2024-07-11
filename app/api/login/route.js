import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { getSession } from "@/utils/get-session"

const url = process.env.NEXT_PUBLIC_BASE_URL

export async function POST(req) {
  const body = await req.json()
  try {
    const response = await fetch(`${url}/api/v1/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.identifier,
        password: body.password,
      }),
    })
    const resJson = await response.json()
    if (resJson.token) {
      cookies().set("accessToken", resJson.token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60,
      })

      const session = await getSession()
      updateSession(session, resJson.token, true)
      await session.save()

      function updateSession(session, token, isLoggedIn) {
        session.jwt = token
        // session.user = user
        session.isLoggedIn = isLoggedIn
      }
    } else {
      return NextResponse.json({ error: "User Unauthorized" }, { status: 401 })
    }
    return NextResponse.json({
      success: "Successfully logged in",
    })
  } catch (error) {
    return NextResponse.json({
      error: error,
    })
  }
}
