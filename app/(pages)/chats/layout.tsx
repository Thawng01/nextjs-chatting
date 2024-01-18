import React from "react";
import SideUserList from "./SideUserList";
import { getMe } from "@/lib/getMe";
import { getCookie } from "@/lib/cookie";
import StoreInitializer from "@/components/StoreInitializer";
import { ChatRoomList } from "@/types/index-d";
import { fetchData } from "@/lib/fetchData";

const ChatLayout = async ({ children }: { children: React.ReactNode }) => {
    const { user } = await getCookie();
    const chatrooms: ChatRoomList[] | undefined = await fetchData(
        `/chatrooms/${user?._id}`
    );

    return (
        <div className="flex w-full md:w-11/12 ">
            <SideUserList />
            <StoreInitializer data={chatrooms} type="chatUserLists" />
            {children}
        </div>
    );
};

export default ChatLayout;
