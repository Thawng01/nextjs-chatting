import { useState } from "react"
import { useRouter } from "next/navigation"
import { client } from "@/axios/client"
import { storeCookie } from "@/lib/cookie"
import { socket } from "@/lib/socket"
import { jwtDecode } from "jwt-decode"

const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()

    const register = async <Param>(formData: Param) => {
        try {
            setLoading(true)
            const res = await client.post('/users/new', formData)
            await storeCookie(res.data.token)
            let user = jwtDecode(res.data.token)
            setLoading(false)
            socket.connect()
            socket.emit('userAdded', user)
            router.replace('/chats')
        } catch (error: any) {
            setLoading(false)
            setError(error?.response.data?.error)
        }
    }

    const login = async <Param>(formData: Param) => {
        try {
            setLoading(true)
            const res = await client.post('/auth', formData)
            await storeCookie(res.data.token)
            const user = jwtDecode(res.data.token)
            console.log(user)
            setLoading(false)
            socket.connect()
            socket.emit('userAdded', user)
            router.replace('/chats')
        } catch (error: any) {
            setLoading(false)
            setError(error?.response?.data?.error)
        }
    }

    return { register, login, error, loading }

}

export default useAuth