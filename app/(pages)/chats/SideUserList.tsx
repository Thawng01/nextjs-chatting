"use client";
import React from "react";
import ActiveUserLists from "./ActiveUserLists";
import ChatList from "./ChatList";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";

const SideUserList = () => {
    const searchParams = useSearchParams();
    const chatId = searchParams.get("chatId");
    return (
        <aside
            className={`${
                chatId
                    ? "hidden md:block md:w-5/12 lg:w-4/12"
                    : "block w-full md:w-5/12 lg:w-4/12 md:h-screen"
            }  flex-none bg-[#f1f1f1]`}
        >
            <ActiveUserLists />
            <SearchBar />
            <ChatList />
        </aside>
    );
};

export default SideUserList;
