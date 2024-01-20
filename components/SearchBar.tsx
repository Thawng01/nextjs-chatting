import React, { useState } from "react";
import { useRouter } from "next/navigation";

import useDebounce from "@/hooks/useDebounce";
import { searchUserByName } from "@/lib/user";
import Avatar from "./user/Avatar";
import { User } from "@/types/index-d";
import { createChatRoom } from "@/axios/chatroom";
import { useChattingStore } from "@/store";
import Overlay from "./Overlay";

const SearchBar = () => {
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]);
    const me = useChattingStore((store) => store.user);

    const router = useRouter();

    const handleUserSearch = async (name: string) => {
        const { message, status } = await searchUserByName(name);
        if (status === 200) {
            setUsers(message);
        }
    };

    const debouncedFunc = useDebounce(handleUserSearch, 400);

    const handleSelectUser = async (userId: string) => {
        try {
            const res = await createChatRoom(me._id!, userId);
            router.push(`/chats/${userId}?chatId=${res.data._id}`);
            setShow(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mx-3 mb-1 mt-3 relative">
            <input
                className="bg-white p-2 rounded-md w-full focus:outline-none"
                placeholder="Type username"
                onChange={(e) => {
                    debouncedFunc(e.target.value);
                    setShow(true);
                }}
            />

            {show && (
                <>
                    <Overlay onClose={setShow} />

                    <div className="absolute top-[110%] shadow-md bg-[#f1f1f1] z-30 w-full">
                        {users?.length === 0 ? (
                            <p className="p-2">
                                No user found with the given ID.
                            </p>
                        ) : (
                            users?.map((user: User) => {
                                return (
                                    <div
                                        key={user._id}
                                        onClick={() =>
                                            handleSelectUser(user._id!)
                                        }
                                        className="flex items-center my-1 hover:bg-white py-2 px-4 cursor-pointer"
                                    >
                                        <Avatar
                                            profile={user.profile}
                                            username={user.username}
                                            height="h-9"
                                            width="w-9"
                                            textSize="text-lg"
                                        />
                                        <p className="capitalize ml-3">
                                            {user.username}
                                        </p>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchBar;
