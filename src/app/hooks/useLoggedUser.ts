import { useAppSelector } from "../../hooks";
import { loggedUserSelector } from "../selectors/loggedUserSelector";

export function useLoggedUser(): string | null {
  return useAppSelector(loggedUserSelector);
}
