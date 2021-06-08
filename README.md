# React-Store-Toolkit

React Store Toolkit is a library heavily inspired by [Redux Toolkit](https://github.com/reduxjs/redux-toolkit) but for React `Context API` and `useReducer`.

# API

### `createStore(initialState, reducer, middlewares?,)`

```ts
declare function createStore<State>(
  initialState: State,
  reducer: Reducer<State, AnyAction>,
  middlewares?: Middleware<AnyAction, State>[]
): {
  useState: () => State
  useDispatch: () => React.Dispatch<AnyAction>
  StateProvider: React.FunctionComponent<Partial<State>>
}
```

| returned object | description                                                                      |
| --------------- | -------------------------------------------------------------------------------- |
| `StateProvider` | The context provider (React Element) that provides the store to all its children |
| `useState`      | Hook that returns the value of the state stored in the Provider                  |
| `useDispatch()` | Hook that returns a dispatch function                                            |

The Middleware follows the exact same pattern as [Redux based middlewares](https://redux.js.org/understanding/history-and-design/middleware) so therefore Redux middlewares like [`redux-logger`](https://github.com/LogRocket/redux-logger) and [`redux-thunk`](https://github.com/reduxjs/redux-thunk) are directly compatible!

### `createSlice()`

- This is the same createSlice [API in Redux Toolkit](https://redux-toolkit.js.org/api/createslice) except that we are not using `Immer` and your state updates need to return the newly created state.

### `createReducer()`

- This is the same createReducer [API in Redux Toolkit](https://redux-toolkit.js.org/api/createReducer) except that we are not using `Immer` and your state updates need to return the newly created state.

### `createAction()`

- The exact same as [Redux Toolkit](https://redux-toolkit.js.org/api/createaction)

### `useActionDispatch()`

```ts
declare function useActionDispatch(
  action: ActionCreatorWithoutPayload<string>,
  useDispatch: () => React.Dispatch<AnyAction>,
  payload?: false
): () => void
```

This hook returns a Callback that lets you call the action specified within a react component. Here is an example:

```tsx
// store.ts
export const useSetDecrement = () =>
  useActionDispatch(decrement, useDispatch, false)
export const useSetIncrement = () =>
  useActionDispatch(increment, useDispatch, false)

// Counter.ts
const increment = useSetIncrement()
const decrement = useSetDecrement()
return (
  <>
    <button onClick={() => increment()}>Increment</button>
    <button onClick={() => decrement()}>Decrement</button>
  </>
)
```

Take note of the `payload` parameter passed in which is defaulted to `true`. If your action has no payload, you must set it to false explicitly.

## Example

Examples are available in the [Example directory](https://github.com/saranshgrover/react-store-toolkit/tree/master/example)
