import io from 'socket.io-client'

export const socket = io('https://chatting-api-ks84.onrender.com', { autoConnect: false })