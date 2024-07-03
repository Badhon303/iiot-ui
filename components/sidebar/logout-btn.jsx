"use client"

import { useRouter } from "next/navigation"

const LogoutBtn = () => {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/logout")
    router.push("/sign-in")
  }

  return <button onClick={() => handleLogout()}>Log&nbsp;Out</button>
}

export default LogoutBtn
