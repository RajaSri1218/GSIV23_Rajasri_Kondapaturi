// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {  
  countVal:1
}

const reducerFunctions = createSlice({
  name: 'Store',
  initialState:initialState,
  reducers: {
    setCountVal: (state, { payload }) => {state.countVal = payload}
  },
});


export const {  setCountVal } = reducerFunctions.actions;
export const selectorFunction = state => state.storeFunctions;

export default reducerFunctions.reducer;
