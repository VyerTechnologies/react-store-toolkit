import { useCallback, Dispatch } from 'react'
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from './createAction'
import { AnyAction } from './redux-types'
import { OptionalSpread } from './tsHelpers'

export const createActionDispatch = <P>(
  action: ActionCreatorWithPayload<P> | ActionCreatorWithoutPayload,
  useDispatch: () => Dispatch<AnyAction>
) => () => {
  const dispatch = useDispatch()

  return useCallback(
    (...args: OptionalSpread<P>) => {
      const params = args[0]
      if (typeof params === 'undefined') {
        dispatch((action as ActionCreatorWithoutPayload)())
      } else {
        dispatch((action as ActionCreatorWithPayload<P>)(params))
      }
    },
    [dispatch]
  )
}
