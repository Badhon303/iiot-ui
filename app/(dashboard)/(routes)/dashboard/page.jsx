// import React from "react"

// const Dashboard = () => {
//   return (
//     <div>
//       <div className="p-6 bg-background rounded-3xl mb-2 shadow-basic">
//         <p className="h-[60vh] mb-2">Dashboard Content</p>
//       </div>
//       <div className="p-6 bg-background rounded-3xl mb-2 shadow-basic">
//         <p className="h-[60vh] mb-2">Dashboard Content</p>
//       </div>
//       <div className="p-6 bg-background rounded-3xl mb-2 shadow-basic">
//         <p className="h-[60vh] mb-2">Dashboard Content</p>
//       </div>
//     </div>
//   )
// }

// export default Dashboard

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "./components/date-range-picker"
import { Overview } from "./components/overview"
import { RecentSales } from "./components/recent-sales"

import { cn } from "@/lib/utils"

export const metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

export default function DashboardPage() {
  return (
    <div className="p-6 bg-background rounded-3xl mb-2 shadow-basic space-y-2">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 space-x-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex flex-col md:flex-row items-center space-x-2">
          <CalendarDateRangePicker />
          <Button className="mt-2 md:mt-0">Download</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger className={cn("px-1 md:px-4")} value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger
            className={cn("px-1 md:px-4")}
            value="analytics"
            disabled
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger className={cn("px-1 md:px-4")} value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger
            className={cn("px-1 md:px-4")}
            value="notifications"
            disabled
          >
            Notification
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Number of Sensors
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">400</div>
                <p className="text-xs text-muted-foreground">
                  +20% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Sensors
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">300</div>
                <p className="text-xs text-muted-foreground">
                  +180% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Machines</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">700</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Inactive machines
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">20</div>
                <p className="text-xs text-muted-foreground">
                  +12 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
