import { AccountData } from "../types/accountData";
import { RootState } from "../../store";

export const accountSelector =
  (accountId: string) =>
  (state: RootState): AccountData | {} | null =>
    state.accounts[accountId] || null;

export const currentAccountIdSelector = (state: RootState): string => {
  const alias = state.app.loggedUser;
  return (
    Object.keys(state.accounts).find(
      (key) => state.accounts[key]?.alias === alias
    ) || ""
  );
};

export const currentAccountSelector = (state: RootState): AccountData | null =>
  state.accounts[currentAccountIdSelector(state)];
