import React, { useCallback } from "react";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "./createAction";
// import { Slice, SliceCaseReducers } from "./createSlice";
import { AnyAction } from "./redux-types";

export function useActionDispatch<Payload>(action: ActionCreatorWithPayload<Payload>, useDispatch: () => React.Dispatch<AnyAction>, payload?: true) : ((params: Payload) => void);
export function useActionDispatch(action: ActionCreatorWithoutPayload<string>, useDispatch: () => React.Dispatch<AnyAction>, payload?: false) : (() => void);
export function useActionDispatch<Payload = never>(action: ActionCreatorWithPayload<Payload> | ActionCreatorWithoutPayload<string>, useDispatch: () => React.Dispatch<AnyAction>, payload?: boolean) {
    const dispatch = useDispatch()
    if(payload !== false) {
        return useCallback((params: Payload) => dispatch(action(params)),[])
    }
    else return useCallback(() => dispatch(action),[])
}