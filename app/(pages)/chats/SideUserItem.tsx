import React from "react";
import Link from "next/link";

import Avatar from "@/components/user/Avatar";
import { formateDateInTime } from "@/lib/formatDate";

interface Props {
    username: string;
    profile: string | undefined;
    message: string;
    chatId: string;
    userId: string;
    active: boolean;
    isRead: boolean;
    createdAt: string;
}

const SideUserItem = ({
    username,
    profile,
    message,
    chatId,
    userId,
    active,
    isRead,
    createdAt,
}: Props) => {
    return (
        <li
            className={`relative p-2 my-2 hover:bg-white ${
                active ? "bg-white" : ""
            }`}
        >
            <Link
                href={`/chats/${userId}?chatId=${chatId}`}
                className="flex items-center"
            >
                <div className="border-2 border-white rounded-full">
                    <Avatar
                        username={username}
                        profile={profile}
                        height="h-12"
                        width="w-12"
                    />
                </div>

                <div className="ml-2 ">
                    <h3 className="font-semibold capitalize">{username}</h3>
                    <div className="flex items-center">
                        <span
                            className={`text-sm  ${
                                isRead
                                    ? "text-[gray]"
                                    : "text-black font-semibold"
                            }`}
                        >
                            {message?.length > 22
                                ? message?.slice(0, 22) + "..."
                                : message}
                        </span>
                        <div className="flex items-center ml-3">
                            <div className="h-[2.5px] w-[2.5px] mr-1 rounded-full bg-[gray]" />
                            <span className="text-sm text-[gray]">
                                {formateDateInTime(
                                    new Date(createdAt).getTime()
                                )}
                            </span>
                        </div>
                    </div>
                    {!isRead && (
                        <div className="absolute right-3 top-1/2 h-2 w-2 bg-sky-700 rounded-full" />
                    )}
                </div>
            </Link>
        </li>
    );
};

export default SideUserItem;
