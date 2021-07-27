import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountData } from "../../../app/types/accountData";
import { v3 as hash } from "murmurhash";
import sortBy from "lodash/sortBy";
interface AccountDictionary {
  [key: string]: AccountData | null;
}

const initialState: AccountDictionary = {};

export const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<AccountData>) => {
      const account = action.payload;
      account.transactions = sortBy(
        account.transactions,
        "timestamp"
      ).reverse();
      const key = hash(account._id);
      state[key] = account;
    },
    reset: (state, action: PayloadAction<string>) => {
      const key = hash(action.payload);
      state[key] = null;
    },
  },
});

export const actions = accountSlice.actions;
export const reducer = accountSlice.reducer;
