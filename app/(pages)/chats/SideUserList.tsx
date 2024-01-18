"use client";
import React from "react";
import ActiveUserLists from "./ActiveUserLists";
import ChatList from "./ChatList";
import { useSearchParams } from "next/navigation";

const SideUserList = () => {
    const searchParams = useSearchParams();
    const chatId = searchParams.get("chatId");
    return (
        <aside
            className={`${
                chatId
                    ? "hidden sm:block sm:w-4/12 lg:w-3/12"
                    : "block w-full sm:w-4/12 lg:w-3/12 md:h-screen"
            }  flex-none bg-[#f1f1f1]`}
        >
            <ActiveUserLists />
            <ChatList />
        </aside>
    );
};

export default SideUserList;
