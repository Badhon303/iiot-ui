"use server"

import axios from "@/utils/axios"
import { getSession } from "@/utils/get-session"

axios.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    if (session.jwt) {
      config.headers.Authorization = `Bearer ${session.jwt}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// class CustomError extends Error {
//   constructor(message, status, headers) {
//     super(message)
//     this.name = "CustomError"
//     this.status = status
//     this.headers = headers
//   }
// }

export const request = async (method, url, values, config = {}) => {
  try {
    const response = await axios.request({
      method,
      url,
      data: values,
      ...config,
    })
    return response.data
  } catch (error) {
    throw error.response
      ? new Error(`${error.response.status} ${error.response.statusText}`)
      : new Error("Network error")
    // new CustomError(
    //     error.response.statusText,
    //     error.response.status,
    //     error.response.headers
    //   )
  }
}
