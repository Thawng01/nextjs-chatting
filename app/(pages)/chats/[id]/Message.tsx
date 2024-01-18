"use client";
import React, { useEffect, useRef } from "react";

import MessageItem from "./MessageItem";
import { useChattingStore } from "@/store";
import useMessage from "@/hooks/useMessage";

interface Props {
    chatId: string;
    userId: string;
    username: string | undefined;
    profile: string | undefined;
}
const Message = ({ chatId, userId, username, profile }: Props) => {
    const user = useChattingStore((store) => store.user);
    const { messages, loadMoreMessages } = useMessage(chatId, userId);

    const divRef = useRef<HTMLDivElement | null>(null);

    const seenMessages = messages.filter((message) =>
        message.readBy.includes(userId)
    );

    const sentMessages = messages.filter(
        (message) => !message.readBy.includes(userId)
    );

    useEffect(() => {
        divRef.current?.scrollTo({
            top: divRef.current.scrollHeight,
            behavior: "instant",
        });
    }, [messages.length]);

    return (
        <div
            ref={divRef}
            onScroll={loadMoreMessages}
            className="h-[calc(100vh-128px)] overflow-y-auto"
        >
            <ul className="mt-1">
                {messages?.map((message, index) => {
                    const self = message.sender === user._id;
                    return (
                        <MessageItem
                            key={message._id}
                            self={self}
                            message={message.text}
                            readBy={message.readBy}
                            id={message._id}
                            profile={profile}
                            username={username}
                            receiverId={userId}
                            index={index}
                            totalLength={messages.length}
                            seenLength={seenMessages.length}
                            sentLength={sentMessages.length}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default Message;
