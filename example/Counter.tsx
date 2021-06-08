import * as React from 'react'
import {
  useState,
  useSetIncrement,
  useSetCounterName,
  useSetDecrement,
} from './store'

export default function Counter() {
  const increment = useSetIncrement()
  const decrement = useSetDecrement()
  const { count, counterName } = useState()
  const [name, setName] = React.useState(counterName)
  useSetCounterName({
    newName: name,
  })
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <h1>{count}</h1>
      <button onClick={() => increment()}>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
    </div>
  )
}
