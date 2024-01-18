"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import Tooltip from "./Tooltip";
import { NAV } from "@/constants/nav";
import LogoutIcon from "./LogoutIcon";

import { useChattingStore } from "@/store";
import Avatar from "./user/Avatar";

const Nav = () => {
    const pathname = usePathname();

    const user = useChattingStore((store) => store.user);

    return (
        <nav className="hidden md:flex h-screen md:w-1/12 bg-sky-600 flex-col items-center">
            <div className="border-b border-sky-700 w-full h-20 pt-3 flex justify-center">
                <Avatar username={user?.username} profile={user?.profile} />
            </div>
            <ul className="my-3 flex flex-col flex-1">
                {NAV.map((nav) => {
                    const isActive = pathname === nav.path;
                    return (
                        <li
                            key={nav.id}
                            className={`relative group flex flex-col items-center py-2 md:px-3 lg:px-4 md:my-2 lg:my-3
                             hover:bg-sky-700 rounded-md text-white ${
                                 isActive ? "bg-sky-700" : ""
                             }`}
                        >
                            <Tooltip label={nav.name} />
                            <Link href={nav.path}>
                                <nav.icon className="h-7 w-7 lg:h-8 lg:w-8" />
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <LogoutIcon />
        </nav>
    );
};

export default Nav;
