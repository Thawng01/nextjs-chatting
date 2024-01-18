import { client } from "@/axios/client"

export const getMe = async (userId: string) => {
    try {
        const res = await client.get(`/users/${userId}`)
        return res.data
    } catch (error) {
        console.log("error", "failter")
    }
}

