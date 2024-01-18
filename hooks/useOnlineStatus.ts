import { useCallback, useEffect, useState } from 'react'

const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(typeof window !== 'undefined' ? window.navigator.onLine : true)


    const handleStatusChange = useCallback(() => {
        setIsOnline(navigator.onLine)
    }, [])

    useEffect(() => {
        window.addEventListener('online', handleStatusChange)
        window.addEventListener('offline', handleStatusChange)

        return () => {
            window.removeEventListener('online', handleStatusChange)
            window.removeEventListener('offline', handleStatusChange)
        }
    }, [])

    return isOnline
}

export default useOnlineStatus