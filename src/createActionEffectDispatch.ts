import React, { useEffect, useRef } from 'react'
import { ActionCreatorWithPayload } from './createAction'
import { AnyAction } from './redux-types'

export const createActionEffectDispatch = <Payload>(
  action: ActionCreatorWithPayload<Payload>,
  useDispatch: () => React.Dispatch<AnyAction>
) =>
  function useReturn(params: Payload) {
    const dispatch = useDispatch()
    const paramRef = useRef(params)
    React.useEffect(() => {
      paramRef.current = params
    }, [params])

    useEffect(() => {
      dispatch(action(paramRef.current))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramRef])
  }
