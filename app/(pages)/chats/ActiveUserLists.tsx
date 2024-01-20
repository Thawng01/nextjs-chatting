"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { socket } from "@/lib/socket";
import { useChattingStore } from "@/store";
import ActiveUserItem from "./ActiveUserItem";
import useScreenResize from "@/hooks/useScreenResize";

interface OnlineUser {
    _id: string;
    username: string;
    socketId: string;
    profile: string | undefined;
}

const ActiveUserLists = () => {
    const [scrollWidth, setScrollWidth] = useState(0);
    const divRef = useRef<HTMLDivElement | null>(null);
    const divWidth = useScreenResize(divRef);

    const connected = useRef(socket.connected ? true : false);

    const user = useChattingStore((store) => store.user);
    const activeUsers = useChattingStore((store) => store.onlineUsers);
    const updateOnlineUser = useChattingStore(
        (store) => store.updateOnlineUser
    );

    useEffect(() => {
        const userData = {
            _id: user?._id,
            username: user?.username,
            profile: user.profile,
        };

        if (connected.current) {
            socket.emit("userAdded", userData);
            socket.on("activeUsers", (users) => {
                console.log("active : ", users);
                updateOnlineUser(users);
            });
        } else {
            socket.connect();
            socket.emit("userAdded", userData);
            socket.on("activeUsers", (users) => {
                console.log("active : ", users);
                updateOnlineUser(users);
            });
        }
    }, [user, updateOnlineUser]);

    const handleMove = (type: string) => {
        if (type === "next") {
            if (divRef.current) {
                const next = (divRef.current.scrollLeft += divWidth - 60);
                setScrollWidth(next);
            }
        } else {
            if (divRef.current) {
                const back = (divRef.current.scrollLeft -= divWidth - 60);
                setScrollWidth(back);
            }
        }
    };

    return (
        <div className="w-full h-20 shadow-sm relative">
            <div
                ref={divRef}
                className="flex items-center h-full overflow-scroll no-scrollbar"
            >
                {activeUsers.length === 1 ? (
                    <p className="text-center w-full text-[gray]">
                        No currently active user.
                    </p>
                ) : (
                    activeUsers.map((activeUser: OnlineUser) => {
                        const self = activeUser._id === user._id;
                        return (
                            <ActiveUserItem
                                key={user._id}
                                username={activeUser.username}
                                profile={activeUser.profile}
                                self={self}
                                userId={activeUser._id}
                            />
                        );
                    })
                )}
            </div>
            {scrollWidth > 10 && (
                <button
                    onClick={() => handleMove("prev")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full shadow-md bg-white p-1 h-7 
                w-7 flex items-center justify-center"
                >
                    <ChevronLeftIcon />
                </button>
            )}
            {scrollWidth + divWidth <= divRef.current?.scrollWidth! &&
                activeUsers.length > 4 && (
                    <button
                        onClick={() => handleMove("next")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full shadow-md bg-white p-1 h-7 
                w-7 flex items-center justify-center"
                    >
                        <ChevronRightIcon />
                    </button>
                )}
        </div>
    );
};

export default ActiveUserLists;
