import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSession } from "@/utils/get-session"

export async function GET() {
  //   const responseApi = await fetch('http://localhost:3003/sign-out');
  //   const resApiJson = responseApi.json();

  //   const response = NextResponse.json(resApiJson);
  // response.cookies.delete('accessToken');
  //   response.cookies.delete("refreshToken")
  //   return response;

  const cookieStore = cookies()
  cookieStore.delete("accessToken")
  const session = await getSession()
  session.jwt = ""
  session.isLoggedIn = false
  await session.save()

  // try {
  //   const session = await getSession()
  //   if (session) {
  //     console.log("session", session)
  //     session.destroy()
  //   }
  return NextResponse.json({
    status: 200,
    message: "Logged Out",
  })
  // } catch (error) {
  //   console.error(
  //     "Error occurred during getSession or session destruction:",
  //     error
  //   )
  //   // handle the error here, e.g. return an error response
  // }
}
