import { AccountData } from "../types/accountData";
import { RootState } from "../../store";

export const accountSelector = (state: RootState): AccountData | null =>
  state.account._id ? state.account : null;
