import io from 'socket.io-client'
// const url = "https://chatting-api-ks84.onrender.com"

export const socket = io("https://chatting-api-ks84.onrender.com",
    {
        path: "/socket.io",
        autoConnect: false
    }
)