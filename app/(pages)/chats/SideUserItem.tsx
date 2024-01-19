import React, { useRef } from "react";
import Link from "next/link";

import Avatar from "@/components/user/Avatar";
import { formateDateInTime } from "@/lib/formatDate";
import useScreenResize from "@/hooks/useScreenResize";

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
    const elementRef = useRef<HTMLLIElement | null>(null);
    const elementWidth = useScreenResize(elementRef);

    let updatedMessage: string = message;
    if (elementWidth > 340 && message.length > 24) {
        updatedMessage = message.slice(0, 24) + "...";
    } else if (elementWidth > 310 && message.length > 18) {
        updatedMessage = message.slice(0, 18) + "...";
    } else if (message.length > 16) {
        updatedMessage = message.slice(0, 15) + "...";
    }

    return (
        <li
            ref={elementRef}
            className={`relative p-2 my-1 hover:bg-white ${
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
                            {updatedMessage}
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
