'use server'

import { client, clientWithFile } from "@/axios/client"

export const updateProfile = async (form: FormData, id: string) => {

    try {
        const res = await clientWithFile.put(`/users/profile/${id}`, form)
        return { message: res.data, status: res.status }
    } catch (error) {
        return { message: "Failed to update your profile.", status: 500 }
    }
}
export const updateUsername = async (form: FormData, id: string) => {

    try {
        const res = await client.put(`/users/username/${id}`, form)
        return { message: res.data, status: res.status }
    } catch (error) {
        return { message: "Failed to update your username.", status: 500 }
    }
}

export const searchUserByName = async (name: string) => {
    try {
        const res = await client.get(`/users/search/${name}`)
        return { message: res.data, status: res.status }
    } catch (error) {
        return { message: "No user found with the given Id.", status: 404 }
    }
}