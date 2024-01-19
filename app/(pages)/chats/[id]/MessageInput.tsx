"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { useChattingStore } from "@/store";
import type { User } from "@/types/index-d";

interface Props {
    userId: string | undefined;
    chatId: string;
}

const MessageInput = ({ userId, chatId }: Props) => {
    const [text, setText] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const user: User = useChattingStore((store) => store.user);
    const chatlist = useChattingStore((store) => store.getChatList);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        socket.emit("user-typing", userId);
    };
    const handleBlur = () => {
        socket.emit("stop-typing", userId);
    };

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

    useEffect(() => {
        socket.on("typing", (id) => {
            if (user._id === id && !isTyping) {
                setIsTyping(true);
            }
        });
    }, [user._id, isTyping]);

    useEffect(() => {
        socket.on("stopTyping", (id) => {
            if (user._id === id && isTyping) {
                setIsTyping(false);
            }
        });
    }, [user._id, isTyping]);

    return (
        <div className="relative bg-[#f1f1f1] h-16 w-full flex flex-col justify-center px-2">
            {isTyping && (
                <p className="absolute -top-5 text-[gray] text-sm italic">
                    Typing ...
                </p>
            )}
            <form
                onSubmit={handleSubmit}
                className="w-full flex items-center gap-x-2"
            >
                <input
                    className="w-full border border-[lightgray] rounded-md p-2 focus:outline-none
                     focus:ring-2 focus:ring-sky-600"
                    placeholder="Message..."
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <button className="bg-sky-600 text-white py-2 px-3 rounded-md">
                    Send
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
