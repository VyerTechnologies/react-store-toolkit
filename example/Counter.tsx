import * as React from 'react';
import {
  useState,
  useSetIncrement,
  useSetCounterName,
  useSetDecrement,
} from './store';

export default function Counter() {
  const increment = useSetIncrement();
  const decrement = useSetDecrement();
  const setCounterName = useSetCounterName();
  const { count, counterName } = useState();
  return (
    <div>
      <input
        value={counterName}
        onChange={e =>
          setCounterName({
            newName: e.target.value,
          })
        }
      />
      <h1>{count}</h1>
      <button onClick={() => increment()}>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
    </div>
  );
}
