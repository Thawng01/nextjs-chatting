import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { socket } from '@/lib/socket'
import { useChattingStore } from '@/store'

interface Props {
    current: HTMLLIElement | null
}

const useVisible = (elementRef: Props, id: string, readBy: string[]) => {
    const user = useChattingStore(store => store.user)
    const isRead = readBy.includes(user._id!)
    // const updateChatListMessage = useChattingStore(store => store.updateChatListMessage)
    const updateReadMark = useChattingStore(store => store.updateReadMark)

    const searchParams = useSearchParams()
    const chatId = searchParams.get('chatId')

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.map(entry => {
                if (entry.isIntersecting && !isRead) {
                    socket.emit('mark-as-read', { messageId: id, reader: user._id })
                    // updateChatListMessage(chatId!, message)
                    updateReadMark(chatId!, user._id!)

                }
            })
        }, {
            threshold: 1
        })

        if (elementRef.current) {
            observer.observe(elementRef.current)
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current)
            }
        }
    }, [])
}

export default useVisible