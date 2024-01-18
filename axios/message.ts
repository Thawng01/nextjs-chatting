import { client } from "./client";

export const getMessages = async (chatId: string) => {
    return await client.get(`/messages/${chatId}`)
}