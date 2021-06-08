import {
  createSlice,
  createStore,
  PayloadAction,
  useActionDispatch,
  Middleware,
  AnyAction,
  createActionEffectDispatch,
} from '../'
const authState = {
  counterName: 'Example name',
  count: 0,
}

const authSlice = createSlice({
  name: 'counter',
  reducers: {
    increment: state => {
      return { ...state, count: state.count + 1 }
    },
    decrement: state => {
      return { ...state, count: Math.max(state.count - 1, 0) }
    },
    changeName: (
      state,
      action: PayloadAction<{
        newName: string
      }>
    ) => {
      return { ...state, counterName: action.payload.newName }
    },
  },
  initialState: authState,
})
export const { increment, decrement, changeName } = authSlice.actions
const authReducer = authSlice.reducer

function logger(
  logFn: (...args: any) => void
): Middleware<AnyAction, typeof authState> {
  return store => next => action => {
    logFn('dispatching', action)
    let result = next(action)
    logFn('next state', store.getState())
    return result
  }
}

export const { StateProvider, useDispatch, useState } = createStore<
  typeof authState
>(authState, authReducer, [logger(console.log)])

export const useSetIncrement = () =>
  useActionDispatch(increment, useDispatch, false)
export const useSetCounterName = createActionEffectDispatch(
  changeName,
  useDispatch
)
export const useSetDecrement = () =>
  useActionDispatch(decrement, useDispatch, false)
