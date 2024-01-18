import React, { Suspense } from "react";

import UserInfo from "../../../../components/user/UserInfo";
import MessageHeader from "./MessageHeader";
import { fetchData } from "@/lib/fetchData";
import { User } from "@/types/index-d";
import Message from "./Message";
import MessageInput from "./MessageInput";
import StoreInitializer from "@/components/StoreInitializer";

interface Props {
    params: { id: string };
    searchParams: { chatId: string };
}

const Chats = async ({ params, searchParams }: Props) => {
    const chatId = searchParams.chatId;
    const user: User | undefined = await fetchData(`/users/${params.id}`);
    const messages = await fetchData(`/messages/${chatId}`);

    return (
        <div
            className={`${
                chatId ? "block w-full sm:w-8/12 md:w-9/12" : "hidden"
            } h-screen flex`}
        >
            <div className="h-screen w-full lg:w-8/12 flex-initial">
                <StoreInitializer data={messages} type="messages" />
                <Suspense fallback={<p>Loading...</p>}>
                    <MessageHeader
                        username={user?.username}
                        profile={user?.profile}
                        userId={user?._id}
                    />
                </Suspense>
                <Message
                    chatId={searchParams.chatId}
                    userId={params.id}
                    username={user?.username}
                    profile={user?.profile}
                />
                <MessageInput userId={params.id} chatId={searchParams.chatId} />
            </div>
            <UserInfo user={user} />
        </div>
    );
};

export default Chats;
