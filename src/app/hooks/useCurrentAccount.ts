import { useAppSelector } from "../../hooks";
import { AccountData } from "../types/accountData";
import { currentAccountSelector } from "../selectors/accountSelector";

export function useCurrentAccount(): AccountData | null {
  return useAppSelector(currentAccountSelector);
}
