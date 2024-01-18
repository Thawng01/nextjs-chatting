"use client";
import React from "react";
import {
    ArrowLeftIcon,
    EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import Avatar from "@/components/user/Avatar";
import { useChattingStore } from "@/store";
import Status from "@/components/user/Status";
import Link from "next/link";

interface Props {
    username: string | undefined;
    profile: string | undefined;
    userId: string | undefined;
}

const MessageHeader = ({ username, profile, userId }: Props) => {
    const activeUsers = useChattingStore((store) => store.onlineUsers);
    const isOnline = activeUsers.find((user) => user._id === userId);
    return (
        <div className="flex items-center justify-between px-3 bg-white shadow-sm h-14 md:h-16 w-full">
            <div className="flex items-center">
                <Link
                    href={"/chats"}
                    className=" sm:hidden h-8 w-8 bg-[#f1f1f1] p-2 rounded-full mr-3"
                >
                    <ArrowLeftIcon />
                </Link>
                <div className="relative">
                    <Avatar
                        username={username}
                        profile={profile}
                        height="h-10 md:h-12"
                        width="w-10 md:w-12"
                        textSize="text-2xl md:text-4xl"
                    />
                    <Status isOnline={isOnline} />
                </div>
                <div className="ml-2">
                    <p className="text-sm font-semibold capitalize leading-3">
                        {username}
                    </p>
                    <span className="text-xs">
                        {isOnline ? "Online" : "Offline"}
                    </span>
                </div>
            </div>

            <div className="w-8 h-8 sm:w-9 sm:h-9 cursor-pointer bg-[#f1f1f1] rounded-full p-1">
                <EllipsisVerticalIcon />
            </div>
        </div>
    );
};

export default MessageHeader;
