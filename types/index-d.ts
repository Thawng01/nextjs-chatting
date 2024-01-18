export interface User {
    _id?: string;
    username?: string;
    email?: string;
    profile?: string;
    backgroundColor?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ChatRoom {
    chatRoomId: string;
    sender: string;
    receiver: string;
    message: string
}

export interface ChatRoomList {
    _id: string;
    sender: {
        _id: string;
        username: string;
        profile?: string;
    },
    receiver: {
        _id: string;
        username: string;
        profile?: string
    },

    message: any[];
    createdAt: string;
    updatedAt: string;
}

export interface OnlineUser {
    _id: string;
    username: string;
    socketId: string;
    profile?: string;
}

export interface Messages {
    _id: string;
    text: string,
    chatId: string
    sender: string
    readBy: string[],
    __v?: string;
    createdAt?: string;
    updatedAt?: string;
}