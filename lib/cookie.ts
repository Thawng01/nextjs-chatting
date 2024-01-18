'use server'

import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { redirect } from 'next/navigation';

interface User {
    _id: string;
    email: string
}

export const storeCookie = async (token: string) => {
    cookies().set("chatting_token", token, { expires: Date.now() + 24 * 60 * 60 * 1000 })
}

export const getCookie = async () => {
    const cookie = cookies().get('chatting_token')?.value
    let user: User | undefined = undefined
    if (cookie) {
        user = jwtDecode(cookie)
    }

    return { cookie, user }
}

export const logout = async () => {
    cookies().delete('chatting_token')
    redirect('/login')
}