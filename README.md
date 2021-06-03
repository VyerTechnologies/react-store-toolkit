# React-Store-Toolkit

React Store Toolkit is a library heavily inspired by [Redux Toolkit](https://github.com/reduxjs/redux-toolkit) but for React `Context API` and `useReducer`.

# API

### `createStore(initialState, reducer, middlewareFn?, middlewareProps?)`:

```ts
export declare function createStore<State, MiddlewareProps = undefined>(initialState: State, reducer: Reducer<State, AnyAction>, middlewareFn?: ((state: State, action: AnyAction, middlewareProps?: MiddlewareProps) => void)[], middlewareProps?: MiddlewareProps): {
    useState: () => State;
    useDispatch: () => React.Dispatch<AnyAction>;
    StateProvider: React.FunctionComponent<Partial<State>>;
};

```

| returned object              | description                                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| `StateProvider`              | The context provider (React Element) that provides the store to all its children                      |
| `useState`      | Hook that returns the value of the state stored in the Provider        |
| `useDispatch()`              | Hook that returns a dispatch function                              |


### `createSlice()`

- This is the same createSlice [API in Redux Toolkit](https://redux-toolkit.js.org/api/createslice) except that we are not using `Immer` and your state updates need to return the newly created state.

### `createReducer()`

- This is the same createReducer [API in Redux Toolkit](https://redux-toolkit.js.org/api/createReducer) except that we are not using `Immer` and your state updates need to return the newly created state.


### `createAction()`

- The exact same as [Redux Toolkit](https://redux-toolkit.js.org/api/createaction)

## Example

Examples are available in the [Example directory](https://github.com/saranshgrover/react-store-toolkit/tree/master/example)