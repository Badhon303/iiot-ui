"use client"

// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// const data = [
//   {
//     name: "Jan",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Feb",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Mar",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Apr",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "May",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Jun",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Jul",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Aug",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Sep",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Oct",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Nov",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Dec",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
// ]

// export function Overview() {
//   return (
//     <ResponsiveContainer width="100%" height={350}>
//       <BarChart data={data}>
//         <XAxis
//           dataKey="name"
//           // stroke="#888888"
//           // fontSize={12}
//           // tickLine={false}
//           // axisLine={false}
//         />
//         <YAxis
//         // stroke="#888888"
//         // fontSize={12}
//         // tickLine={false}
//         // axisLine={false}
//         // tickFormatter={(value) => `$${value}`}
//         />
//         <Bar
//           dataKey="total"
//           fill="currentColor"
//           radius={[4, 4, 0, 0]}
//           className="fill-primary"
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   )
// }

import dynamic from "next/dynamic"
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

export function Overview() {
  // const option = {
  //   // chart: {
  //   //   height: "auto", // Use 'auto' or omit height for responsiveness
  //   //   width: "100%", // Use 100% width to make the chart responsive
  //   //   toolbar: {
  //   //     show: false, // Optionally hide the toolbar for a cleaner look
  //   //   },
  //   // },
  //   xaxis: {
  //     categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  //   },
  //   // responsive: [
  //   //   {
  //   //     // Define responsiveness options
  //   //     breakpoint: 768, // Example breakpoint at 768px
  //   //     options: {
  //   //       // Options for screens smaller than 768px
  //   //       chart: {
  //   //         height: 600, // Adjust height as needed for smaller screens
  //   //       },
  //   //     },
  //   //   },
  //   // ],
  // }

  // const series = [
  //   {
  //     name: "series-1",
  //     data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
  //   },
  // ]

  const option = {
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%"
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["currentColor"],
      },
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      // labels: {
      //   style: {
      //     colors: ["currentColor"],
      //   },
      // },
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },

      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        // show: false,
        style: {
          colors: ["currentColor"],
        },
        // formatter: function (val) {
        //   return val + "%"
        // },
      },
    },
    colors: ["currentColor"],
  }

  const series = [
    {
      name: "Inflation",
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
    },
  ]

  return (
    <div>
      <ApexChart
        type="bar"
        options={option}
        series={series}
        width={"100%"}
        height={"auto"}
      />
    </div>
  )
}
