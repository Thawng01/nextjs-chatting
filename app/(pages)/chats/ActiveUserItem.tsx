"use client";
import { createChatRoom } from "@/axios/chatroom";
import Avatar from "@/components/user/Avatar";
import { useChattingStore } from "@/store";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
    username: string;
    self: boolean;
    userId: string;
    profile: string | undefined;
}

const ActiveUserItem = ({ username, self, userId, profile }: Props) => {
    const router = useRouter();
    const me = useChattingStore((store) => store.user);

    const handleUserSelect = async () => {
        try {
            const res = await createChatRoom(me._id!, userId);
            router.push(`/chats/${userId}?chatId=${res.data._id}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            onClick={handleUserSelect}
            className={`relative flex-none items-center justify-center
         bg-blue-900 rounded-full mx-2 border-2 border-white cursor-pointer ${
             self ? "hidden" : "flex"
         }`}
        >
            <Avatar
                username={username}
                profile={profile}
                height="h-12"
                width="w-12"
            />

            <div className="absolute h-3 w-3 bg-green-600 border-2 border-white rounded-full right-0 bottom-0" />
        </div>
    );
};

export default ActiveUserItem;
