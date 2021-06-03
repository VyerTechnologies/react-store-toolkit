import * as React from 'react';
import {
  changeName,
  increment,
  decrement,
  useDispatch,
  useState,
} from './store';

export default function Counter() {
  const dispatch = useDispatch();
  const state = useState();
  return (
    <div>
      <input
        value={state.counterName}
        onChange={e => dispatch(changeName({ newName: e.target.value }))}
      />
      <h1>{state.count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
