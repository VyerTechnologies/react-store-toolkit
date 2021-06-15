import { useEffect, Dispatch } from 'react'
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from './createAction'
import { AnyAction } from './redux-types'
import { OptionalSpread } from './tsHelpers'

export const createActionEffect = <Payload>(
  action: ActionCreatorWithPayload<Payload> | ActionCreatorWithoutPayload,
  useDispatch: () => Dispatch<AnyAction>
) => (...args: OptionalSpread<Payload>) => {
  const dispatch = useDispatch()
  const params = args[0]

  useEffect(() => {
    if (typeof params === 'undefined') {
      dispatch((action as ActionCreatorWithoutPayload)())
    } else {
      dispatch((action as ActionCreatorWithPayload<Payload>)(params))
    }
  }, [dispatch, params])
}
