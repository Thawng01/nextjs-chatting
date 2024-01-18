import React from "react";

interface Props {
    Icon: any;
    label: string;
}

const UserInfoItem = ({ Icon, label }: Props) => {
    return (
        <div className="flex flex-col items-center">
            <div className="h-10 w-10 p-2 rounded-full bg-[#f1f1f1]">
                <Icon className="text-sky-600" />
            </div>
            <p className="mt-2">{label}</p>
        </div>
    );
};

export default UserInfoItem;
