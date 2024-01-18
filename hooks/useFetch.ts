import { useEffect, useState } from 'react'
import axios from 'axios'
import { client } from '@/axios/client'

const useFetch = (url: string) => {
    const [data, setData] = useState()
    useEffect(() => {
        const fetchUser = async () => {
            const res = await client.get(url)
            setData(res.data)
        }

        fetchUser()

        return () => {
            const source = axios.CancelToken.source()
            source.cancel()
        }
    }, [url])

    return data
}

export default useFetch