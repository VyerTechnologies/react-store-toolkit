import { AnyAction, Reducer } from './redux-types'
import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  FunctionComponent,
} from 'react'

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
  const DispatchContext = createContext<React.Dispatch<AnyAction>>(() => {})
  const useDispatch = () => useContext(DispatchContext)

  type StateProviderProps = Partial<State>

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
    StateProvider,
  }
}
