import io from 'socket.io-client'
const url = "https://chatting-api-ks84.onrender.com"
// const url = "http://localhost:9000"

export const socket = io(url,
    {
        path: "/socket.io",
        autoConnect: false
    }
)