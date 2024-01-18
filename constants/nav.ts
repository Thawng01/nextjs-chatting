import { ChatBubbleOvalLeftEllipsisIcon, BellIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

export const NAV = [
    {
        id: 1,
        name: "Chats",
        icon: ChatBubbleOvalLeftEllipsisIcon,
        path: "/chats"
    },
    {
        id: 2,
        name: "Notification",
        icon: BellIcon,
        path: '/notification'
    },
    {
        id: 3,
        name: "Account",
        icon: UserIcon,
        path: '/account'
    },
    {
        id: 4,
        name: "Settings",
        icon: Cog6ToothIcon,
        path: '/settings'
    },
]