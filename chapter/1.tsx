import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

function useIntervalFn(fn: Function, time: number) { 
    const ref = useRef(fn)

    useLayoutEffect(() => { 
        ref.current = fn
    })

    const cleanUpRef = useRef<Function>();
    const clean = useCallback(() => { 
        cleanUpRef.current?.()
    }, [])

    useEffect(() => { 
        const timer = setInterval(() => ref.current(), time)

        cleanUpRef.current = () => { 
            clearInterval(timer)
        }

        return clean
    })
}

function App() { 
    const [count, setCount] = useState(0)

    const updateCount = () => { 
        setCount(count + 1)
    }

    const ref = useRef(updateCount)

    useLayoutEffect(() => { 
        ref.current = updateCount
    })

    useEffect(() => { 
        const timer = setInterval(() => ref.current(), 1000)
        return () => { 
            clearInterval(timer)
        }
    }, [])


    return <div>{count}</div>
}


export default App