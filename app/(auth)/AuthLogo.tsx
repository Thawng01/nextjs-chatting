import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import React from "react";

const AuthLogo = () => {
    return (
        <div className="p-4 flex flex-col items-center">
            <div className="w-36 mb-4">
                <ChatBubbleOvalLeftEllipsisIcon className="text-sky-600" />
            </div>
            <h1>
                Stay connected with <br />
                <span className="text-sky-600">
                    family, friends and people
                </span>{" "}
                you love aroung the world.
            </h1>
        </div>
    );
};

export default AuthLogo;
