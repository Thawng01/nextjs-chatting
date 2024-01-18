"use client";
import React, { FormEvent, useState } from "react";
import { socket } from "@/lib/socket";
import { useChattingStore } from "@/store";
import { User } from "@/types/index-d";
import useMessage from "@/hooks/useMessage";

interface Props {
    userId: string | undefined;
    chatId: string;
}

const MessageInput = ({ userId, chatId }: Props) => {
    const [text, setText] = useState<string>("");

    const user: User = useChattingStore((store) => store.user);
    const chatlist = useChattingStore((store) => store.getChatList);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            sender: user._id,
            receiverId: userId,
            chatId,
            text,
            profile: user.profile,
            username: user.username,
        };
        socket.emit("newMessage", data);
        chatlist(chatId);
        setText("");
    };

    return (
        <div className="bg-[#f1f1f1] h-16 w-full flex flex-col justify-center px-2">
            <form
                onSubmit={handleSubmit}
                className="w-full flex items-center gap-x-2"
            >
                <input
                    className="w-full border border-[lightgray] rounded-md p-2 focus:outline-none
                     focus:ring-2 focus:ring-sky-600"
                    placeholder="Message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="bg-sky-600 text-white py-2 px-3 rounded-md">
                    Send
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
