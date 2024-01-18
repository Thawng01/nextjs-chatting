import React from "react";

const page = async ({ searchParams }: { searchParams: { chatId: string } }) => {
    const chatId = searchParams.chatId;
    return (
        <div
            className={`${
                chatId
                    ? "hidden"
                    : "hidden sm:flex items-center justify-center w-full sm:w-8/12 md:w-9/12"
            } h-screen flex`}
        >
            <h1 className="text-[gray]">No user selected.</h1>
        </div>
    );
};

export default page;
