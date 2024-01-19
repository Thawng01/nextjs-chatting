import io from 'socket.io-client'
const url = "https://chatting-api-ks84.onrender.com"

export const socket = io("http://localhost:9000",
    {
        path: "/socket.io",
        autoConnect: false
    }
)