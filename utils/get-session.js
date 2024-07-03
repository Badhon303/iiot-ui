// "use server"

// import { getIronSession } from "iron-session"
// import { cookies } from "next/headers"
// import { sessionOptions, defaultSession } from "@/lib/iron"

// export const getSession = async () => {
//   try {
//     const session = await getIronSession(cookies(), sessionOptions)
//     if (!session.isLoggedIn) {
//       session.isLoggedIn = defaultSession.isLoggedIn
//     }
//     return session
//   } catch (error) {
//     // Handle the error here
//     console.error("Error occurred during getIronSession:", error)
//     // Return a default session or re-throw the error
//     return defaultSession
//   }
//   // const session = await getIronSession(cookies(), sessionOptions)
//   // const updatedSession = {
//   //   ...session,
//   //   isLoggedIn: session.isLoggedIn || defaultSession.isLoggedIn,
//   // }
//   // return updatedSession
// }

"use server"

import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { sessionOptions, defaultSession } from "@/lib/iron"

export const getSession = async () => {
  const session = await getIronSession(cookies(), sessionOptions)
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn
  }
  return session
}
