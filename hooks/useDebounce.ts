import { useEffect, useRef } from 'react'

type Timer = ReturnType<typeof setTimeout>
type FuncType = (...arg: any) => void

const useDebounce = <Func extends FuncType>(func: Func, delay: number) => {
    const timer = useRef<Timer>()

    useEffect(() => {

        return () => {
            if (timer.current) {
                clearTimeout(timer.current)
            }
        }
    }, [])

    const debouncedFunc = <Arg>(arg: Arg) => {
        const newTimer = setTimeout(() => {
            func(arg)
        }, delay)

        clearTimeout(timer.current)
        timer.current = newTimer
    }

    return debouncedFunc
}

export default useDebounce