import { useCallback, useEffect, useState } from 'react'


interface Props {
    current: HTMLDivElement | HTMLLIElement | null
}
const useScreenResize = (elementRef: Props) => {
    const [elemenWidth, setElementWidth] = useState(0)

    const getWidth = useCallback(() => {
        setElementWidth(elementRef.current?.offsetWidth!);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", getWidth);
        getWidth();
        return () => {
            window.removeEventListener("resize", getWidth);
        };
    }, [getWidth]);

    return elemenWidth
}

export default useScreenResize