import React, { useRef } from "react";

import useVisible from "@/hooks/useVisible";
import Avatar from "@/components/user/Avatar";

interface Props {
    self: boolean;
    message: string;
    id: string;
    readBy: string[];
    profile: string | undefined;
    username: string | undefined;
    receiverId: string;
    index: number;
    seenLength: number;
    sentLength: number;
    totalLength: number;
}

const MessageItem = ({
    message,
    self,
    id,
    readBy,
    profile,
    username,
    receiverId,
    index,
    seenLength,
    sentLength,
    totalLength,
}: Props) => {
    const messageRef = useRef<HTMLLIElement | null>(null);
    useVisible(messageRef, id, readBy);
    return (
        <li
            ref={messageRef}
            className={`px-3 my-[10px] flex ${self ? "flex-row-reverse" : ""}`}
        >
            <div className="flex max-w-[86%]">
                {!self && (
                    <div className="-mt-1 mr-2">
                        <Avatar
                            profile={profile}
                            username={username}
                            height="h-8"
                            width="w-8"
                            textSize="text-xl"
                        />
                    </div>
                )}
                {self &&
                    index === seenLength - (sentLength || 1) &&
                    readBy.includes(receiverId) && (
                        <span className="text-[gray] text-[11px] mr-1 mt-4">
                            Seen
                        </span>
                    )}
                {self && (
                    <span className="text-[gray] text-[11px] mr-1 mt-4">
                        {index === totalLength - 1 &&
                            !readBy.includes(receiverId) &&
                            "Sent"}
                    </span>
                )}

                <p
                    className={`py-[6px] px-2 ${
                        self
                            ? "bg-sky-600 rounded-l-xl rounded-br-xl text-white"
                            : "bg-[#f1f1f1] rounded-r-xl rounded-bl-xl"
                    }`}
                >
                    {message}
                </p>
            </div>
        </li>
    );
};

export default MessageItem;
