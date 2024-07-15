import { NextResponse } from "next/server"
import urlJoin from "url-join"
import { getSession } from "@/utils/get-session"
const url = process.env.NEXT_PUBLIC_BASE_URL

export async function GET(req, { params }) {
  const session = await getSession()
  const { position } = params
  if (!session) {
    console.error("Session is null or undefined")
    return null
  }
  const apiUrl = urlJoin(url, `/api/v1/get-record/${position}`)
  try {
    const data = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
    })
    if (data.ok) {
      const parsedData = await data.json()
      return NextResponse.json({
        success: "Successfully data loaded",
        data: parsedData.data,
      })
    } else {
      console.error("GET /api/sensor-data failed with status", data)
    }
  } catch (error) {
    console.error("GET /api/product-types ", error)
    return NextResponse.json({
      error: error,
    })
  }
}
