"use client";
import React from "react";
import Tooltip from "./Tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    nav: {
        icon: any;
        name: string;
        path: string;
        id: number;
    };
}

const NavItem = ({ nav }: Props) => {
    const pathname = usePathname();
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
};

export default NavItem;
