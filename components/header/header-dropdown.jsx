"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { MdExpandMore } from "react-icons/md"
import styles from "@/components/sidebar/sidebar.module.css"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Routes } from "@/lib/sidebar-items"

const HeaderDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()
  const Menus = Routes(pathname)
  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger>
        <svg
          className={`${
            isDropdownOpen ? "hidden" : "block"
          } flex-shrink-0 size-4 transition duration-300 ease-in-out`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" x2="21" y1="6" y2="6" />
          <line x1="3" x2="21" y1="12" y2="12" />
          <line x1="3" x2="21" y1="18" y2="18" />
        </svg>
        <svg
          className={`${
            isDropdownOpen ? "block" : "hidden"
          } flex-shrink-0 size-4 transition duration-300 ease-in-out`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[100vw] mt-4 p-4 rounded-lg max-h-[90vh] overflow-y-auto">
        {Menus.map((menu, index) => (
          <div key={index}>
            <DropdownMenuLabel className="px-4">
              {menu.objective}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {menu.items.map((menuItem, index) => (
              <Collapsible className="w-full" key={index}>
                {menuItem.submenu ? (
                  <CollapsibleTrigger className="w-full text-start">
                    <li
                      className={`py-2 text-sm   
                    flex items-center gap-x-4 cursor-pointer`}
                    >
                      <span className="ps-5 text-2xl float-left">
                        {menuItem.icon}
                      </span>
                      <span
                        onClick={() =>
                          !menuItem.submenu && setIsDropdownOpen(false)
                        }
                        className={`text-base flex-1`}
                      >
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
                      className={`py-2 text-sm   
                    flex items-center gap-x-4 cursor-pointer`}
                    >
                      <span className="ps-5 text-2xl float-left">
                        {menuItem.icon}
                      </span>
                      <span
                        onClick={() =>
                          !menuItem.submenu && setIsDropdownOpen(false)
                        }
                        className={`text-base flex-1`}
                      >
                        {menuItem.title}
                      </span>
                    </li>
                  </Link>
                )}
                {menuItem.submenu && (
                  <CollapsibleContent
                    className={`${styles.CollapsibleContent} pt-1 ps-1`}
                  >
                    <ul className="ms-7 border-l-2 border-grey-400">
                      {menuItem.submenuItems.map((subMenuItem, index) => (
                        <div key={index} className="ps-1">
                          <Link href={subMenuItem.href}>
                            <li
                              onClick={() => setIsDropdownOpen(false)}
                              className={`py-2 text-sm flex items-center gap-x-4 cursor-pointer`}
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
              </Collapsible>
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default HeaderDropdown
