import { useEffect, useState } from 'react'

import { getMessages } from '@/axios/message'
import { socket } from '@/lib/socket'
import { useChattingStore } from '@/store'
import { Messages } from '@/types/index-d'

const useMessage = (chatId: string, userId: string) => {
    const [messages, setMessages] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)

    const updateChatListMessage = useChattingStore(store => store.updateChatListMessage)

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await getMessages(chatId)
                setMessages(res.data)

            } catch (error: any) {
                setError(error.response?.data?.error)
            }
        }
        fetchMessages()
    }, [chatId, getMessages])

    useEffect(() => {
        socket.on('message', message => {
            const msg = {
                readBy: message.readBy,
                _id: message._id,
                text: message.text,
                createdAt: message.createdAt
            };
            if (chatId === message.chatRoomId.toString()) {
                setMessages((prev: any) => [...prev, message])
                updateChatListMessage(chatId, [msg])
            }
        })

        return () => {
            socket.off('message')
        }
    }, [chatId])

    useEffect(() => {
        socket.on('read', (data: Messages) => {
            const updatedMessages: Messages[] = messages.map((message: Messages) => {
                if (data._id === message._id) {
                    message = data
                }
                return message
            })
            setMessages(updatedMessages)
        })

        return () => {
            socket.off('read')
        }
    }, [userId, messages])

    const loadMoreMessages = async (e: any) => {
        console.log("top : ", e.target.scrollTop)
        console.log("height : ", e.target.scrollHeight)
        console.log("client : ", e.target.clientHeight)
        const { scrollTop, scrollHeight, clientHeight } = e.target;
    }

    return {
        messages,
        loadMoreMessages,
        error
    }
}

export default useMessage