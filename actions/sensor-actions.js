import urlJoin from "url-join"
import { getSession } from "@/utils/get-session"

const url = process.env.NEXT_PUBLIC_BASE_URL

export async function getSensorTypeData() {
  const session = await getSession()
  const apiUrl = urlJoin(url, "/api/sensor-types?sort=updatedAt:desc")
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
          `/api/sensor-types?pagination[pageSize]=${parsedData?.meta?.pagination?.total}&pagination[page]=1?sort=updatedAt:desc`
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
              "GET /api/sensor-types failed with status",
              data.status
            )
          }
        } catch (error) {
          throw new Error("Need to reconsider about page size, its too high.")
        }
      }
      return parsedData
    } else {
      console.error("GET /api/sensor-types failed with status", data.status)
    }
  } catch (error) {
    // console.error("GET /api/product-types ", error)
    throw new Error(`GET /api/sensor-types ${error}`)
  }
}

export async function getSensorData() {
  const session = await getSession()
  const apiUrl = urlJoin(url, "/api/sensors?populate=*&sort=updatedAt:desc")
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
          `/api/sensors?pagination[pageSize]=${parsedData?.meta?.pagination?.total}&pagination[page]=1?populate=*&sort=updatedAt:desc`
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
            console.error("GET /api/sensors failed with status", data.status)
          }
        } catch (error) {
          throw new Error("Need to reconsider about page size, its too high.")
        }
      }
      return parsedData
    } else {
      console.error("GET /api/sensors failed with status", data.status)
    }
  } catch (error) {
    // console.error("GET /api/product-types ", error)
    throw new Error(`GET /api/sensor-types ${error}`)
  }
}
