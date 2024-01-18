import axios from 'axios'
export const url = "http://localhost:9000/api"

export const client = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    }
})

export const clientWithFile = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "multipart/form"
    }
})