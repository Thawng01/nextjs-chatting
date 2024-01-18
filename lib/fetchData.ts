'use server'
import { client } from '@/axios/client'

export const fetchData = async (url: string) => {
    try {
        const res = await client.get(url)
        return res.data
    } catch (error) {
        console.log("fetch")
    }
}