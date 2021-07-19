import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { TransientAppState } from "../state";

type LoadingStateSetter = (isLoading: boolean) => void;

let pendingCount = 0;

function setLoadingState(transientState: TransientAppState) {
  return function (isLoading: boolean) {
    pendingCount += isLoading ? 1 : -1;
    transientState.isLoading = pendingCount > 0;
  };
}

export function useAppLoadingState(): [boolean, LoadingStateSetter] {
  const { transient } = useContext(AppContext);
  return [transient.isLoading, setLoadingState(transient)];
}
