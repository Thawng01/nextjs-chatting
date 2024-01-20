"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { CameraIcon } from "@heroicons/react/24/outline";

import ImagePlaceholder from "@/components/ImagePlaceholder";
import Avatar from "@/components/user/Avatar";
import { updateProfile } from "@/lib/user";
import { useChattingStore } from "@/store";
import { User } from "@/types/index-d";
import UserInfo from "./UserInfo";

const AccountPage = () => {
    const ref = useRef<HTMLInputElement | null>(null);
    const user: User = useChattingStore((store) => store.user);
    const updateUser = useChattingStore((store) => store.updateUser);

    const [profile, setProfile] = useState({ url: user?.profile, file: {} });

    const handleSelectImage = () => ref?.current?.click();

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfile({ url: url, file: file });
            const form = new FormData();
            form.append("profile", file);
            const { message, status } = await updateProfile(form, user._id!);
            if (status === 200) {
                updateUser(message);
            }
        }
    };

    return (
        <div className="w-full md:w-11/12 ">
            <div className="w-full relative">
                <div className="relative h-[calc(100vh-285px)] lg:h-[calc(100vh-350px)] w-full">
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
                 top-[83%]"
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
                </div>
            </div>

            <UserInfo />
        </div>
    );
};

export default AccountPage;
