import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import React from "react";
import LogoText from "./LogoText";

const AuthLogo = () => {
    return (
        <div className="p-4 flex flex-col items-center">
            <div className="w-32 sm:w-36 -mb-4 md:mb-4">
                <ChatBubbleOvalLeftEllipsisIcon className="text-sky-600" />
            </div>
            <div className="hidden md:block">
                <LogoText />
            </div>
        </div>
    );
};

export default AuthLogo;
