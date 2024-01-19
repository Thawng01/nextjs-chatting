import React, { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { searchUserByName } from "@/lib/user";
import Avatar from "./user/Avatar";
import { User } from "@/types/index-d";

const SearchBar = () => {
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]);

    const handleUserSearch = async (name: string) => {
        const result = await searchUserByName(name);
        setUsers(result?.data);
    };

    const debouncedFunc = useDebounce(handleUserSearch, 400);

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
                <div className="absolute top-[110%] shadow-md bg-[#f1f1f1] z-30 w-full">
                    {users?.length === 0 ? (
                        <p className="p-2">No user found with the given ID.</p>
                    ) : (
                        users?.map((user: User) => {
                            return (
                                <div className="flex items-center my-1 hover:bg-white py-2 px-4 cursor-pointer">
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
            )}
        </div>
    );
};

export default SearchBar;
