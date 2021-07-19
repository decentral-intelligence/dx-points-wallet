import { AppState, getInitialState, TransientAppState } from "../state";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import merge from "lodash/merge";

type TransientAppStateSetter = (
  newState: Partial<TransientAppState> | null
) => void;

function setTransientAppState(appState: AppState) {
  return function (newState: Partial<TransientAppState> | null) {
    appState.transient = newState
      ? merge(appState.transient, newState)
      : getInitialState().transient;
  };
}

export function useTransientAppState(): [
  TransientAppState,
  TransientAppStateSetter
] {
  const context = useContext(AppContext);
  return [context.transient, setTransientAppState(context)];
}
