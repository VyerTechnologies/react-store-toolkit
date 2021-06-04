import { AnyAction, Reducer } from './redux-types'
import React, {
  createContext as createReactContext,
  useContext as useReactContext,
  useReducer,
  useCallback,
  FunctionComponent,
} from 'react'

import {useContext, createContext, useContextSelector} from 'use-context-selector'

/**
 *
 * @param initialState
 * @param reducer
 * @param middlewareFn
 * @param middlewareProps
 *
 * @public
 */
export function createStore<State, MiddlewareProps = undefined>(
  // name: string,
  initialState: State,
  reducer: Reducer<State, AnyAction>,
  middlewareFn?: ((
    state: State,
    action: AnyAction,
    middlewareProps?: MiddlewareProps
  ) => void)[],
  middlewareProps?: MiddlewareProps
) {
  const StateContext = createContext<State>(initialState)
  const useState = () => useContext(StateContext)
  const DispatchContext = createReactContext<React.Dispatch<AnyAction>>(() => {})
  const useDispatch = () => useReactContext(DispatchContext)

  type StateProviderProps = Partial<State>

   function useSelector<Selected>(selector: (value: State) => Selected) {
     const value = useContextSelector<State, Selected>(StateContext, selector);
     return value
   }

  const StateProvider: FunctionComponent<StateProviderProps> = ({
    children,
    ...props
  }: React.PropsWithChildren<StateProviderProps>) => {
    const reducerWithMiddleware = useCallback(
      (state: State, action: AnyAction) => {
        const newState = reducer(state, action)
        if (middlewareFn) {
          middlewareFn.forEach((fn) => fn(state, action, middlewareProps))
        }
        return newState
      },
      []
    )

    const [state, dispatch] = useReducer(reducerWithMiddleware, {
      ...initialState,
      ...props,
    })

    return (
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </DispatchContext.Provider>
    )
  }

  return {
    useState,
    useDispatch,
    useSelector,
    StateProvider,
  }
}
