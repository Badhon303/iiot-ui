import { usePathname } from "next/navigation"
import Link from "next/link"
import styles from "./sidebar.module.css"

import LogoutBtn from "./logout-btn"

import { MdExpandMore, MdLogout } from "react-icons/md"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Routes } from "@/lib/sidebar-items"

const Sidebar = ({ isSidebarOpen }) => {
  const pathname = usePathname()
  const Menus = Routes(pathname)
  return (
    <aside
      className={`hidden sm:block px-2 py-6 ${
        isSidebarOpen ? "w-64" : "w-20"
      } h-[calc(100svh-1rem)] bg-background duration-200 my-2 ms-2 rounded-3xl shadow-basic`}
    >
      <div className="flex flex-col h-full w-full overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:hover:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200">
        {Menus.map((menu, index) => (
          <div key={index} className="px-1">
            <div className="px-3 font-medium text-sm text-[#6c757d] opacity-80 dark:text-white">
              {menu.objective}
            </div>
            <ul className="py-3">
              {menu.items.map((menuItem, index) => (
                <Collapsible key={index}>
                  <TooltipProvider delayDuration={100} skipDelayDuration={100}>
                    <Tooltip>
                      <div className="text-start py-1">
                        {isSidebarOpen ? (
                          menuItem.submenu ? (
                            <CollapsibleTrigger className="w-full text-start">
                              <li
                                className={`py-2 ${
                                  menuItem.active &&
                                  "bg-[#f3f6f9] dark:bg-gray-800 font-semibold"
                                } text-sm flex items-center gap-x-4 cursor-pointer hover:bg-[#f3f6f9] dark:hover:bg-gray-800 dark:text-white rounded-md duration-300 hover:ps-2`}
                              >
                                <span className="ps-4 text-2xl float-left">
                                  {menuItem.icon}
                                </span>
                                <span className={`text-base flex-1`}>
                                  {menuItem.title}
                                </span>
                                <MdExpandMore
                                  className={`text-2xl ms-auto me-2 ${styles.iconRotate}`}
                                />
                              </li>
                            </CollapsibleTrigger>
                          ) : (
                            <Link href={menuItem.href}>
                              <li
                                className={`py-2 text-sm ${
                                  menuItem.active &&
                                  "bg-[#f3f6f9] dark:bg-gray-800 font-semibold"
                                } flex items-center gap-x-4 cursor-pointer hover:bg-[#f3f6f9] dark:hover:bg-gray-800 dark:text-white rounded-md duration-300 hover:ps-2 `}
                              >
                                <span className="ps-4 text-2xl float-left">
                                  {menuItem.icon}
                                </span>
                                <span className={`text-base flex-1`}>
                                  {menuItem.title}
                                </span>
                              </li>
                            </Link>
                          )
                        ) : (
                          <TooltipTrigger className="w-full">
                            {menuItem.submenu ? (
                              <li
                                className={`py-2 text-sm ${
                                  menuItem.active &&
                                  "bg-[#f3f6f9] dark:bg-gray-800 font-semibold"
                                } flex items-center gap-x-4 cursor-pointer hover:bg-[#f3f6f9] dark:hover:bg-gray-800 dark:text-white rounded-md hover:ps-2 duration-300`}
                              >
                                <span className="ps-4 text-2xl float-left">
                                  {menuItem.icon}
                                </span>
                              </li>
                            ) : (
                              <Link href={menuItem.href}>
                                <li
                                  className={`py-2 text-sm ${
                                    menuItem.active &&
                                    "bg-[#f3f6f9] dark:bg-gray-800 font-semibold"
                                  } flex items-center gap-x-4 cursor-pointer hover:bg-[#f3f6f9] dark:hover:bg-gray-800 dark:text-white rounded-md hover:ps-2 duration-300 `}
                                >
                                  <span className="ps-4 text-2xl float-left">
                                    {menuItem.icon}
                                  </span>
                                </li>
                              </Link>
                            )}
                          </TooltipTrigger>
                        )}
                      </div>

                      {menuItem.submenu && isSidebarOpen && (
                        <CollapsibleContent
                          className={`${styles.CollapsibleContent} pt-1`}
                        >
                          <ul className="ms-7 border-l-2 border-grey-400 space-y-2">
                            {menuItem.submenuItems.map((subMenuItem, index) => (
                              <div key={index} className="ps-2">
                                <Link href={subMenuItem.href}>
                                  <li
                                    className={`py-1 text-sm ${
                                      subMenuItem.active &&
                                      "bg-[#f3f6f9] dark:bg-gray-800 font-semibold"
                                    } flex items-center cursor-pointer hover:bg-[#f3f6f9] dark:hover:bg-gray-800 dark:text-white rounded-md duration-300 hover:ps-2`}
                                  >
                                    <span
                                      className={`text-base text-start flex-1 ps-8`}
                                    >
                                      {subMenuItem.title}
                                    </span>
                                  </li>
                                </Link>
                              </div>
                            ))}
                          </ul>
                        </CollapsibleContent>
                      )}
                      <TooltipContent
                        className={`${isSidebarOpen ? "hidden" : "block"} ms-1`}
                        side="right"
                      >
                        {!menuItem.submenu ? (
                          <Link href={menuItem.href}>
                            <p className="cursor-pointer">{menuItem.title}</p>
                          </Link>
                        ) : (
                          <ul>
                            {menuItem.submenuItems.map((subMenuItem, index) => (
                              <div key={index}>
                                <Link href={subMenuItem.href}>
                                  <li
                                    className={`py-1 px-3 ${
                                      subMenuItem.active &&
                                      "bg-[#f3f6f9] dark:bg-gray-800 font-semibold"
                                    } flex items-center my-1 cursor-pointer hover:bg-[#f3f6f9] dark:hover:bg-gray-800 dark:text-white rounded-md`}
                                  >
                                    <span>{subMenuItem.title}</span>
                                  </li>
                                </Link>
                              </div>
                            ))}
                          </ul>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Collapsible>
              ))}
            </ul>
          </div>
        ))}
        <div className="px-1 mt-auto">
          <div className="px-1 font-medium text-sm text-[#6c757d] opacity-80 dark:text-white">
            Others
          </div>
          <ul>
            <TooltipProvider delayDuration={100} skipDelayDuration={100}>
              <Tooltip>
                <div className="text-start py-1">
                  {isSidebarOpen ? (
                    <Link href={""}>
                      <li
                        className={`py-2 text-sm flex items-center gap-x-4 cursor-pointer hover:bg-[#f3f6f9] dark:hover:bg-gray-800 dark:text-white rounded-md hover:ps-2 duration-300`}
                      >
                        <span className="ps-4 text-2xl float-left">
                          <MdLogout />
                        </span>
                        <span className={`text-base flex-1`}>
                          <LogoutBtn />
                        </span>
                      </li>
                    </Link>
                  ) : (
                    <TooltipTrigger className="w-full">
                      <Link href={""}>
                        <li
                          className={`py-2 text-sm flex items-center cursor-pointer hover:bg-[#f3f6f9] dark:hover:bg-gray-800 dark:text-white rounded-md hover:ps-2 duration-300`}
                        >
                          <span className="ps-4 text-2xl float-left">
                            <MdLogout />
                          </span>
                        </li>
                      </Link>
                    </TooltipTrigger>
                  )}
                </div>

                <TooltipContent
                  className={`${isSidebarOpen ? "hidden" : "block"} ms-1`}
                  side="right"
                >
                  <Link href={""}>
                    <p className="cursor-pointer">Log Out</p>
                  </Link>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
