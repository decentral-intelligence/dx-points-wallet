import { AppState } from "../state";
import { AccountData } from "../types/accountData";
import { useAppStateSelector } from "./useAppStateSelector";

const getAccount =
  (accountId: string) =>
  (state: AppState): AccountData | null =>
    state.persist.accounts[accountId] || null;

export function useAccountSelector(accountId: string): AccountData | null {
  return useAppStateSelector<AccountData | null>(getAccount(accountId));
}
