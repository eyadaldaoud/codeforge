"use client";
import { Theme } from "./Theme";
import { NavMenu } from "./utils/Lists";
import { usePathname } from "next/navigation";
import User from "./User";
import Mobilenav from "./Mobilenav";
import Link from "next/link";
import { Badge } from "./ui/badge";

export default function Navbar(): any {
  const pathname = usePathname();
  return (
    <nav className="bg-white dark:bg-black backdrop:blur-lg fixed top-0 z-50 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          <Mobilenav />

          <span className="myxs:block hidden">
            CodeForge
            <Badge
              variant="outline"
              className="sm:ml-1 myxs:flex flex-col hidden"
            >
              Alpha
            </Badge>
          </span>
          <span className="myxs:hidden block">CF</span>
        </div>
        <div className="flex md:order-2">
          <User />
          <Theme />
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex font-medium dark:border-gray-700">
            {NavMenu.map((item, index) => (
              <li
                className="m-2 dark:hover:text-white hover:text-black"
                key={index}
              >
                <Link
                  prefetch={true}
                  className={
                    pathname === item.href
                      ? "block px-2 py-0.5 text-black dark:text-white"
                      : "block px-2 py-0.5 text-gray-600 dark:text-gray-500"
                  }
                  href={item.href}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-b border-gray-200 dark:border-gray-900" />
    </nav>
  );
}
