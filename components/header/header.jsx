import Link from "next/link"
import HeaderDropdown from "@/components/header/header-dropdown"
import { UserNav } from "@/components/header/user-nav"
import { ModeToggle } from "@/components/header/theme-btn"

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="my-2 me-2 bg-background rounded-3xl shadow-basic flex flex-wrap sm:justify-start sm:flex-nowrap text-sm py-4">
      <nav className="mx-auto px-6 flex flex-wrap basis-full items-center justify-between">
        <Link
          className="sm:order-1 flex items-center text-xl font-semibold"
          href="#"
        >
          <button
            onClick={() => toggleSidebar()}
            className="hidden sm:block me-4 hover:scale-125 duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transform transition duration-300 ease-in-out ${
                isSidebarOpen ? "" : "rotate-180"
              }`}
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          Brand
        </Link>
        <div className="sm:order-3 flex items-center gap-x-2">
          <div className="sm:hidden flex item-center">
            <HeaderDropdown />
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
        <div className="hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2">
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
            <Link
              className="font-medium text-blue-500"
              href="#"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              className="font-medium text-gray-600 hover:text-gray-400 "
              href="#"
            >
              Settings
            </Link>
            <Link
              className="font-medium text-gray-600 hover:text-gray-400 "
              href="#"
            >
              Quick Access
            </Link>
            <Link
              className="font-medium text-gray-600 hover:text-gray-400 "
              href="#"
            >
              Others
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
