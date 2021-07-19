import { AppState } from "../state";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export function useAppStateSelector<TData>(
  selector: (state: AppState) => TData
): TData {
  const appContext = useContext(AppContext);
  return selector(appContext);
}
