import { AccountData } from "../types/accountData";
import { useAppStateSelector } from "./useAppStateSelector";
import { useAccountSelector } from "./useAccountSelector";

export function useCurrentAccountSelector(): AccountData | null {
  const currentAccountId = useAppStateSelector(
    (s) => s.persist.currentAccountId
  );
  return useAccountSelector(currentAccountId);
}
