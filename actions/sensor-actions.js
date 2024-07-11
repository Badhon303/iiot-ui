import urlJoin from "url-join"
import { getSession } from "@/utils/get-session"

const url = process.env.NEXT_PUBLIC_BASE_URL

export async function getSensorTypeData() {
  const session = await getSession()
  const apiUrl = urlJoin(url, "/api/v1/get-sensor-tables")
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
      return parsedData.data
    } else {
      console.error("GET /api/sensor-types failed with status", data.status)
    }
  } catch (error) {
    // console.error("GET /api/product-types ", error)
    throw new Error(`GET /api/sensor-types ${error}`)
  }
}

export async function getSensorDropDownData() {
  const session = await getSession()
  const apiUrl = urlJoin(url, "/api/v1/sensor/type/all")
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
      return parsedData.data
    } else {
      console.error(
        "GET /api/sensor-dropdown-data failed with status",
        data.status
      )
    }
  } catch (error) {
    // console.error("GET /api/product-types ", error)
    throw new Error(`GET /api/sensor-dropdown-data ${error}`)
  }
}

// export async function getSensorDataById(id) {
//   const session = await getSession()
//   const apiUrl = urlJoin(url, `/api/v1/get-record/${id}`)
//   if (!session) {
//     console.error("Session is null or undefined")
//     return null
//   }
//   try {
//     const data = await fetch(apiUrl
//       , {
//       headers: {
//         "Content-Type": "application/json",
//         // "Access-Control-Allow-Origin": "*",
//         Authorization: `Bearer ${session.jwt}`,
//       },
//     }
//   )
//     if (data.ok) {
//       const parsedData = await data.json()
//       return parsedData.data
//     } else {
//       console.error("GET /api/sensor-data failed with status", data.status)
//     }
//   } catch (error) {
//     // console.error("GET /api/product-types ", error)
//     throw new Error(`GET /api/sensor-data ${error}`)
//   }
// }
