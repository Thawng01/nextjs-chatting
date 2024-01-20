import { logout } from "@/lib/cookie";
import { socket } from "@/lib/socket";
import { updateUsername } from "@/lib/user";
import { useChattingStore } from "@/store";
import { User } from "@/types/index-d";
import { PencilIcon } from "@heroicons/react/24/outline";
import React, { FormEvent, useState } from "react";

const UserInfo = () => {
    const [edit, setEdit] = useState(false);
    const user: User = useChattingStore((store) => store.user);
    const updateUser = useChattingStore((store) => store.updateUser);
    const [username, setUsername] = useState(user?.username || "");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData();
        form.append("username", username);
        const { message, status } = await updateUsername(form, user._id!);
        if (status == 200) {
            updateUser(message);
            setEdit(false);
        }
    };

    const handleLogout = async () => {
        const userData = {
            _id: user._id,
            username: user.username,
        };
        socket.emit("logout", userData);
        socket.disconnect();
        await logout();
    };

    return (
        <div className="mt-14 mx-auto text-center w-full">
            {edit ? (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row items-center justify-center"
                >
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="py-[.45rem] px-2 border border-black rounded-md ml-5"
                    />

                    <div className="flex items-center mt-2 sm:mt-0">
                        <button
                            disabled={username ? false : true}
                            type="submit"
                            className={`ml-5 text-green-700 disabled:text-[lightgray]`}
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={() => setEdit(!edit)}
                            className={`ml-5`}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="flex items-center justify-center">
                    <h2 className="font-semibold text-2xl sm:text-3xl capitalize ml-5">
                        {user?.username}
                    </h2>

                    <div
                        onClick={() => setEdit(!edit)}
                        className="bg-[#f1f1f1] opacity-50 rounded-full h-10 w-10 p-2 ml-5 cursor-pointer"
                    >
                        <PencilIcon />
                    </div>
                </div>
            )}

            <button
                onClick={handleLogout}
                className="w-[12rem] py-2 bg-[#f1f1f1] mt-5 rounded-lg font-semibold text-lg md:text-xl"
            >
                Logout
            </button>
        </div>
    );
};

export default UserInfo;
