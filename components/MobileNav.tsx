"use client";
import React from "react";
import { NAV } from "@/constants/nav";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const MobileNav = () => {
    const searchParams = useSearchParams();
    const chatId = searchParams.get("chatId");
    const pathname = usePathname();
    return (
        <nav
            className={`fixed bottom-0 bg-sky-600 w-full ${
                chatId ? "hidden" : "md:hidden flex"
            }`}
        >
            <ul className="flex w-full justify-evenly">
                {NAV.map((nav) => {
                    const isActive = pathname === nav.path;
                    return (
                        <li
                            key={nav.id}
                            className={`text-center py-2 px-3 hover:bg-sky-700 ${
                                isActive ? "bg-sky-700" : ""
                            }`}
                        >
                            <Link
                                href={nav.path}
                                className="flex flex-col items-center text-white"
                            >
                                <nav.icon className="h-8 w-8" />
                                <span className="text-sm hidden sm:block">
                                    {nav.name}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default MobileNav;
