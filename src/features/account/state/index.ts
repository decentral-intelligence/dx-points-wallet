import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountData } from "../../../app/types/accountData";
import { TransactionData } from "../../../app/types/transactionData";

const initialState = {} as AccountData;

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<AccountData>) => {
      return action.payload;
    },
    setTransactions: (state, action: PayloadAction<TransactionData[]>) => {
      state.transactions = action.payload;
    },
  },
});

export const actions = accountSlice.actions;
export const reducer = accountSlice.reducer;
