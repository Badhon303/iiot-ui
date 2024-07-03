import urlJoin from "url-join"
import { getSession } from "@/utils/get-session"

const url = process.env.NEXT_PUBLIC_BASE_URL

export async function getRawMaterialData() {
  const session = await getSession()
  const apiUrl = urlJoin(url, "/api/raw-materials?populate=*")
  if (!session) {
    console.error("Session is null or undefined")
    return null
  }
  try {
    const data = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
    })
    if (data.ok) {
      const parsedData = await data.json()
      if (!parsedData) {
        return null
      }
      if (
        Number(parsedData?.meta?.pagination?.total) > 500 &&
        Number(parsedData?.meta?.pagination?.total) < 5001
      ) {
        const apiUrl = urlJoin(
          url,
          `/api/raw-materials?pagination[pageSize]=${parsedData?.meta?.pagination?.total}&pagination[page]=1?populate=*`
        )
        try {
          const data = await fetch(apiUrl, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.jwt}`,
            },
          })
          if (data.ok) {
            const parsedData = await data.json()
            if (!parsedData) {
              return null
            }
            // console.log("total: ", parsedData?.meta?.pagination?.total)
            return parsedData
          } else {
            console.error(
              "GET /api/raw-materials failed with status",
              data.status
            )
          }
        } catch (error) {
          // console.error("GET /api/raw-materials ", error)
          throw new Error("Need to reconsider about page size, its too high.")
        }
      }
      return parsedData
    } else {
      console.error("GET /api/raw-materials failed with status", data.status)
    }
  } catch (error) {
    // console.error("GET /api/raw-materials ", error)
    throw new Error(`GET /api/raw-materials ${error}`)
  }
}
