import { client } from "./client";

export const createChatRoom = async (sender: string, receiver: string) => {
    return await client.post('/chatrooms/new', { sender, receiver })
}