import {
  MdOutlineDashboard,
  MdOutlinePrecisionManufacturing,
  MdOutlineInventory,
  MdGroups,
  MdMoney,
  MdOutlinePersonOutline,
  MdOutlineMiscellaneousServices,
} from "react-icons/md"

export const Routes = (pathname) => {
  return [
    {
      objective: "Main",
      items: [
        {
          title: "Dashboard",
          icon: <MdOutlineDashboard />,
          submenu: false,
          href: "/dashboard",
          active: pathname === "/dashboard",
        },
      ],
    },
    {
      objective: "Apps",
      items: [
        {
          title: "SetUp",
          icon: <MdOutlineMiscellaneousServices />,
          submenu: true,
          active: pathname.split("/")[1] === "set-up",
          submenuItems: [
            // {
            //   title: "Sensor",
            //   href: "/set-up/sensor",
            //   active: pathname === "/set-up/sensor",
            // },
            {
              title: "Sensor Type",
              href: "/set-up/sensor-type",
              active: pathname === "/set-up/sensor-type",
            },
          ],
        },
        {
          title: "Management",
          icon: <MdOutlineInventory />,
          submenu: true,
          active: pathname.split("/")[1] === "management",
          submenuItems: [
            {
              title: "Sensor Data",
              href: "/management/sensor-data",
              active: pathname === "/management/sensor-data",
            },
            // {
            //   title: "Submenu 2",
            //   active: false,
            //   href: "/productioczzn",
            //   active: pathname === "/productzcxion",
            // },
            // {
            //   title: "Submenu 3",
            //   active: false,
            //   href: "/sdad",
            //   active: pathname === "/produsdasdction",
            // },
          ],
        },
        // {
        //   title: "Production",
        //   icon: <MdOutlinePrecisionManufacturing />,
        //   submenu: true,
        //   active: pathname.split("/")[1] === "production",
        //   submenuItems: [
        //     {
        //       title: "Submenu 1",
        //       href: "/production/sub-production",
        //       active: pathname === "/production/sub-production",
        //     },
        //     {
        //       title: "Submenu 2",
        //       active: false,
        //       href: "/production2",
        //       active: pathname === "/production2",
        //     },
        //     {
        //       title: "Submenu 3",
        //       active: false,
        //       href: "/production3",
        //       active: pathname === "/production3",
        //     },
        //   ],
        // },
        // {
        //   title: "Dealer",
        //   icon: <MdGroups />,
        //   submenu: true,
        //   active: pathname.split("/")[1] === "dealer",
        //   submenuItems: [
        //     {
        //       title: "Submenu 1",
        //       active: false,
        //       href: "/producsdasdastion",
        //       active: pathname === "/produdsadaction",
        //     },
        //     {
        //       title: "Submenu 2",
        //       active: false,
        //       href: "/prosdsaduction",
        //       active: pathname === "/productidsadon",
        //     },
        //     {
        //       title: "Submenu 3",
        //       active: false,
        //       href: "/prodasduction",
        //       active: pathname === "/productisdason",
        //     },
        //   ],
        // },
        // {
        //   title: "Sales",
        //   icon: <MdMoney />,
        //   submenu: true,
        //   active: pathname.split("/")[1] === "sales",
        //   submenuItems: [
        //     {
        //       title: "Submenu 1",
        //       active: false,
        //       href: "/prdsadaoduction",
        //       active: pathname === "/produdsadaction",
        //     },
        //     {
        //       title: "Submenu 2",
        //       active: false,
        //       href: "/prsdasoduction",
        //       active: pathname === "/proddasdasuction",
        //     },
        //     {
        //       title: "Submenu 3",
        //       active: false,
        //       href: "/produsdadction",
        //       active: pathname === "/produdasasction",
        //     },
        //   ],
        // },
        // {
        //   title: "Employee",
        //   icon: <MdOutlinePersonOutline />,
        //   submenu: false,
        //   active: false,
        //   href: "/employee",
        //   active: pathname === "/employee",
        // },
        // { title: "Logout", icon: <MdLogout /> },
      ],
    },
  ]
}
