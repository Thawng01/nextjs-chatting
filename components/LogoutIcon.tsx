"use client";
import React from "react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Tooltip from "./Tooltip";
import { logout } from "@/lib/cookie";
import { useChattingStore } from "@/store";
import { socket } from "@/lib/socket";

const LogoutIcon = () => {
    const user = useChattingStore((store) => store.user);

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
        <div className=" border-t border-sky-700 w-full flex justify-center items-center">
            <div
                onClick={handleLogout}
                className="relative group hover:bg-sky-700 py-2 px-4 my-2 rounded-md"
            >
                <ArrowRightStartOnRectangleIcon className="w-7 lg:w-8 text-white " />
                <Tooltip label="Logout" position="bottom-full" />
            </div>
        </div>
    );
};

export default LogoutIcon;
