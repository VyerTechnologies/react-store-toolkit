import { createSlice, createStore, PayloadAction } from "../";
const authState = {
  counterName: "Example name",
  count: 0
};

const authSlice = createSlice({
  name: "counter",
  reducers: {
    increment: (state) => {
      return { ...state, count: state.count + 1 }
    },
    decrement: (state) => {
      return { ...state, count: Math.max(state.count - 1, 0) }
    },
    changeName: (state, action: PayloadAction<{
        newName: string
    }>) => {
      return { ...state, counterName: action.payload.newName }
    }
  },
  initialState: authState
});


export const { increment, decrement, changeName } = authSlice.actions;
const authReducer = authSlice.reducer;

export const { StateProvider, useDispatch, useState } = createStore(authState, authReducer, [(_, action, middleWare) => console.log(`${middleWare?.addText} ${action.type}`)], {
    addText: 'hello'
})
