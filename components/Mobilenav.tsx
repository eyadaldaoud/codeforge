"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavMenu } from "./utils/Lists";
import Link from "next/link";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { usePathname } from "next/navigation";

export default function Mobilenav() {
  const pathname = usePathname();
  return (
    <div className="mt-auto mb-auto mr-2 md:hidden block">
      <Sheet>
        <SheetTrigger asChild>
          <MdKeyboardDoubleArrowDown className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side={"top"} className="md:hidden block">
          <SheetHeader>
            <SheetTitle>CodeForge</SheetTitle>
            <SheetDescription>Home of scripting</SheetDescription>
          </SheetHeader>
          <div className="items-center justify-center flex w-auto order-1">
            <ul className="flex font-medium dark:border-gray-700">
              {NavMenu.map((item, index) => (
                <li
                  className="m-2 dark:hover:text-white hover:text-black"
                  key={index}
                >
                  <Link
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
