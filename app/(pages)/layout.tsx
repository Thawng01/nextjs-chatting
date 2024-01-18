import React from "react";
import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import { getCookie } from "@/lib/cookie";
import { getMe } from "@/lib/getMe";
import StoreInitializer from "@/components/StoreInitializer";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const { user, cookie } = await getCookie();
    if (!cookie) redirect("/login");
    const me = await getMe(user?._id!);

    return (
        <>
            <StoreInitializer data={me} type="user" />
            <div className="flex w-full">
                <Nav />
                {children}
            </div>
            <MobileNav />
        </>
    );
};

export default Layout;
