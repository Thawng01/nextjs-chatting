"use client";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { CameraIcon, PencilIcon } from "@heroicons/react/24/outline";

import ImagePlaceholder from "@/components/ImagePlaceholder";
import Avatar from "@/components/user/Avatar";
import { updateProfile, updateUsername } from "@/lib/user";
import { useChattingStore } from "@/store";
import { User } from "@/types/index-d";
import { socket } from "@/lib/socket";
import { logout } from "@/lib/cookie";

const AccountPage = () => {
    const [edit, setEdit] = useState(false);
    const ref = useRef<HTMLInputElement | null>(null);
    const user: User = useChattingStore((store) => store.user);
    const updateUser = useChattingStore((store) => store.updateUser);
    const [username, setUsername] = useState(user?.username || "");

    const [profile, setProfile] = useState({ url: user?.profile, file: {} });

    const handleSelectImage = () => ref?.current?.click();

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfile({ url: url, file: file });
            const form = new FormData();
            form.append("profile", file);
            const res = await updateProfile(form, user._id!);
            if (res?.status === 200) {
                updateUser(res?.data);
            }
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData();
        form.append("username", username);
        const res = await updateUsername(form, user._id!);
        if (res?.status == 200) {
            updateUser(res.data);
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
        <div className="w-full md:w-11/12 ">
            <div className="w-full relative">
                <div className="relative h-[calc(100vh-350px)] w-full">
                    <Image
                        src="/background.jpg"
                        alt="background"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
                <div
                    className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center
                 -bottom-48 sm:-bottom-40"
                >
                    <div className="relative border-4 h-20 w-20 border-white rounded-full">
                        {profile.url ? (
                            <Avatar
                                profile={profile.url}
                                height="h-full"
                                width="w-full"
                                username={user?.username}
                            />
                        ) : (
                            <ImagePlaceholder
                                name={user?.username}
                                height="h-full"
                                width="w-full"
                            />
                        )}
                        <input
                            className="hidden"
                            ref={ref}
                            type="file"
                            name="profile"
                            onChange={handleChange}
                        />

                        <div
                            onClick={handleSelectImage}
                            className="absolute -bottom-2 -right-2 h-9 w-9 p-2
                                 bg-[#f1f1f1] opacity-80 rounded-full cursor-pointer"
                        >
                            <CameraIcon className="text-sky-800" />
                        </div>
                    </div>
                    <div className="mt-5 text-center w-[350px]">
                        {edit ? (
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col sm:flex-row items-center"
                            >
                                <input
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
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
                            className="w-[12rem] py-2 bg-[#f1f1f1] mt-5 rounded-lg font-semibold text-xl"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
