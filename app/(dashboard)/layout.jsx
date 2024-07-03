"use client"

import Header from "@/components/header/header"
import Sidebar from "@/components/sidebar/sidebar"
import { useSidebar } from "@/hooks/use-sidebar"

export default function DashboardLayout({ children }) {
  const { isSidebarOpen, toggleSidebar } = useSidebar()

  return (
    <div className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex-1 ms-2">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="h-[calc(100svh-6rem)] me-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400">
          <div className="pe-1">{children}</div>
        </div>
      </div>
    </div>
  )
}
