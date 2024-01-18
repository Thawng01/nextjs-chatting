import React from "react";
import {
    PhoneIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { User } from "@/types/index-d";
import UserInfoItem from "./UserInfoItem";

interface Props {
    user: User | undefined;
}

const UserInfo = ({ user }: Props) => {
    return (
        <aside className="hidden lg:block h-full w-4/12 p-4">
            <ImagePlaceholder name={user?.username} />

            <p className="text-center capitalize mt-1 font-semibold">
                {user?.username}
            </p>

            <div className="flex items-center justify-between my-8 mx-4">
                <UserInfoItem Icon={PhoneIcon} label="Phone" />
                <UserInfoItem
                    Icon={ChatBubbleOvalLeftEllipsisIcon}
                    label="Message"
                />
                <UserInfoItem Icon={UserIcon} label="Profile" />
            </div>
        </aside>
    );
};

export default UserInfo;
