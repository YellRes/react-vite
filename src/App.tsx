import { useState, Reducer, useReducer, useRef, useEffect, createContext, useContext } from 'react'
import { produce } from 'immer'
import { reducer } from './reducer'
import type { Data, Action } from './reducer'
import Chapter01 from '../chapter/1'

import './App.css'

const countContext = createContext(111)

function Aaa() { 
  return <div>
    <countContext.Provider value={333}>
      <Bbb></Bbb>
    </countContext.Provider>
  </div>
}


function Bbb() { 
  return <div>

    <Ccc/>
  </div>
}

function Ccc() { 
  const count = useContext(countContext)
  return <h3>context的值为：{ count}</h3>
}

function App() {
  const [count, setCount] = useState({
    a: {
        c: {
            e: 0,
            f: 0
        },
        d: 0
    },
    b: 0
  })
  const [res, dispatch] = useReducer<Reducer<Data, Action>, string>(reducer, {
    result: 0
  })

  // useRef
  const inputRef = useRef<HTMLInputElement>(null)
  

  useEffect(() => { 
    inputRef.current?.focus()
  })

  return (
    <>
      {JSON.stringify(count)}
      <div onClick={() => {
        setCount(produce(count, (count) => { 
          count.a.c.e++
        }))
      }}>
        添加
      </div>

      <h2>useRef</h2>
      <input ref={inputRef} />

      <h2>forwardRef + useImperativeHandle</h2>


      <h2>useContext</h2>
      <Aaa></Aaa>

      <h2>Chapter01</h2>
      <Chapter01/>
    </>
  )
}

export default App
