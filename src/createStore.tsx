import { AnyAction, Reducer } from './redux-types'
import React, { createContext, useContext, FunctionComponent } from 'react'
import createMiddlewareReducer, { Middleware } from './createMiddlewareReducer'

/**
 *
 * @param initialState
 * @param reducer
 * @param middlewares
 *
 * @public
 */
export function createStore<State>(
  // name: string,
  initialState: State,
  reducer: Reducer<State, AnyAction>,
  middlewares?: Middleware<AnyAction, State>[]
) {
  const StateContext = createContext<State>(initialState)
  const useState = () => useContext(StateContext)
  const DispatchContext = createContext<React.Dispatch<AnyAction>>(() => {})
  const useDispatch = () => useContext(DispatchContext)

  type StateProviderProps = Partial<State>

  const StateProvider: FunctionComponent<StateProviderProps> = ({
    children,
    ...props
  }: React.PropsWithChildren<StateProviderProps>) => {
    const [state, dispatch] = createMiddlewareReducer<AnyAction, State>(
      ...(middlewares ?? [])
    )(reducer, { ...initialState, ...props })

    return (
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </DispatchContext.Provider>
    )
  }

  return {
    useState,
    useDispatch,
    StateProvider,
  }
}

export { Middleware }
