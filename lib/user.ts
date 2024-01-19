'use server'

import { client, clientWithFile } from "@/axios/client"

export const updateProfile = async (form: FormData, id: string) => {

    try {
        return await clientWithFile.put(`/users/profile/${id}`, form)
    } catch (error) {
        console.log(error)
    }
}
export const updateUsername = async (form: FormData, id: string) => {

    try {
        return await client.put(`/users/username/${id}`, form)

    } catch (error) {
        console.log(error)
    }
}

export const searchUserByName = async (name: string) => {
    try {
        const res = await client.get(`/users/search/${name}`)
        return { data: res.data, status: res.status }
    } catch (error) {
        console.log(error)
    }
}