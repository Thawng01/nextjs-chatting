import { OnlineUser } from "@/types/index-d";
import React from "react";

interface Props {
    isOnline: OnlineUser | undefined;
}
const Status = ({ isOnline }: Props) => {
    return (
        <div
            className={`absolute h-3 w-3  border-2 border-white rounded-full
             right-0 bottom-0 ${isOnline ? "bg-green-600" : "bg-slate-300"}`}
        />
    );
};

export default Status;
