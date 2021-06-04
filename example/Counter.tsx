import * as React from 'react';
import {
  useSelector,
  useSetIncrement,
  useSetCounterName,
  useSetDecrement
} from './store';

export default function Counter() {
  const increment = useSetIncrement()
  const decrement = useSetDecrement()
  const setCounterName = useSetCounterName()
  const counterName = useSelector(s => s.counterName)
  const count = useSelector(s => s.count)
  return (
    <div>
      <input
        value={counterName}
        onChange={e => setCounterName({
          newName: e.target.value
        })}
      />
      <h1>{count}</h1>
      <button onClick={() => increment()}>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
    </div>
  );
}
