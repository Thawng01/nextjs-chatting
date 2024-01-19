"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import SideUserItem from "./SideUserItem";
import { ChatRoomList } from "@/types/index-d";
import { useChattingStore } from "@/store";
import { socket } from "@/lib/socket";

const ChatList = () => {
    const chatrooms = useChattingStore((store) => store.chatUserLists);
    const updateChatLists = useChattingStore((store) => store.updateChatLists);
    const updateChatListMessage = useChattingStore(
        (store) => store.updateChatListMessage
    );
    const user = useChattingStore((store) => store.user);

    const searchParams = useSearchParams();
    const chatId = searchParams.get("chatId");

    useEffect(() => {
        socket.on("chatlist", (data) => {
            const { sender, receiver } = data;
            if (sender._id === user._id || receiver._id === user._id) {
                updateChatLists(data);
            }
        });

        return () => {
            socket.off("chatlist");
        };
    }, [user._id, updateChatLists]);

    useEffect(() => {
        socket.on("chatListMessage", (message) => {
            const msg = {
                readBy: message.readBy,
                _id: message._id,
                text: message.text,
                createdAt: message.createdAt,
            };
            if (user._id === message.receiver) {
                updateChatListMessage(message.chatRoomId, [msg]);
            }
        });

        return () => {
            socket.off("message");
        };
    }, [user._id, updateChatListMessage]);

    return (
        <div className="h-[calc(100vh-137px)] overflow-y-auto">
            <ul className="py-2">
                {chatrooms?.map((chatList: ChatRoomList) => {
                    const active = chatId === chatList._id;
                    const self = chatList.sender._id === user._id;
                    const receiverId = self
                        ? chatList.receiver._id
                        : chatList.sender._id;

                    const username = self
                        ? chatList.receiver.username
                        : chatList.sender.username;

                    const profile = self
                        ? chatList.receiver.profile
                        : chatList.sender.profile;
                    return (
                        <SideUserItem
                            key={chatList._id}
                            chatId={chatList._id}
                            userId={receiverId}
                            username={username}
                            profile={profile}
                            active={active}
                            message={chatList.message[0]?.text || "No message."}
                            isRead={chatList.message[0]?.readBy?.includes(
                                user._id!
                            )}
                            createdAt={chatList.message[0]?.createdAt}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default ChatList;
