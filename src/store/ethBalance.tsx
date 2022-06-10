import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./";

// Define a type for the slice state
interface BalanceState {
  value: string;
}

// Define the initial state using that type
const initialState: BalanceState = {
  value: "",
};

export const balance = createSlice({
  name: "balance",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateEthBalance: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateEthBalance } = balance.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBalance = (state: RootState) => state.balance.value;

export default balance.reducer;
