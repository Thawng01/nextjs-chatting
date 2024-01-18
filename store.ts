import { create } from 'zustand'
import { ChatRoom, ChatRoomList, Messages, OnlineUser, User } from '@/types/index-d'
import { fetchData } from './lib/fetchData'
import { socket } from './lib/socket'

interface State {
    user: User,
    chatRoom: ChatRoom[],
    onlineUsers: OnlineUser[]
    chatUserLists: ChatRoomList[],
    messages: Messages[]
}

interface Msg {
    _id: string;
    text: string;
    readBy: string[]
}

interface Actions {
    updateOnlineUser: (user: OnlineUser[]) => void
    getOnlineUser: (userId: string) => any
    updateChatListMessage: (id: string | null, msg: Msg[]) => any
    updateReadMark: (id: string, reader: string) => any
    getChatList: (chatId: string) => Promise<any>
    updateChatLists: (data: any) => any
    updateUser: (data: User) => void
}

export const useChattingStore = create<State & Actions>((set) => ({
    user: {},
    chatRoom: [],
    onlineUsers: [],
    messages: [],
    chatUserLists: [],

    updateUser: (data: User) => set((store) => ({ ...store, user: data })),
    updateOnlineUser: (users) => set(() => ({ onlineUsers: users })),
    getOnlineUser: (userId: string) => {
        const user: any = useChattingStore.getState().onlineUsers.find((u: OnlineUser) => u._id === userId)
        return user
    },

    // check if user chat list in the side bar is already or not
    // if not fetch data from database and update chat user lists
    getChatList: async (chatId: string) => {
        const chatlist: any = useChattingStore.getState().chatUserLists.find((chat: ChatRoomList) => chat._id === chatId)
        if (!chatlist) {
            const result = await fetchData(`/chatrooms/one/${chatId}`)
            set((state) => ({
                ...state,
                chatUserLists: [
                    ...state.chatUserLists, result
                ]
            }))
            socket.emit('newChatList', result)
        }
    },

    updateChatLists: (data) => {
        const chat = useChattingStore.getState().chatUserLists.find((chat: ChatRoomList) => chat._id === data._id)
        if (chat) {
            const chatUserLists: ChatRoomList[] = useChattingStore.getState().chatUserLists
            return chatUserLists
        } else {
            set(state => ({
                ...state,
                chatUserLists: [
                    ...state.chatUserLists,
                    data
                ]
            }))
        }
    },

    updateChatListMessage: (id: string | null, msg: Msg[]) => set((state) => ({

        ...state,
        chatUserLists: state.chatUserLists.map((list) => {
            console.log("store", msg)
            if (list._id === id) {
                list.message = msg
            }
            return list
        })
    })),

    updateReadMark: (id: string, reader: string) => set(state => ({
        ...state,
        chatUserLists: state.chatUserLists.map(list => {
            if (list._id === id) {
                list.message[0].readBy.push(reader)
            }
            return list
        })
    }))
}))