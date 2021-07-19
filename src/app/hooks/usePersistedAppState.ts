import { AppState, getInitialState, PersistedAppState } from "../state";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { LocalStorage } from "../storage/LocalStorage";
import merge from "lodash/merge";

type PersistedAppStateSetter = (
  newState: Partial<PersistedAppState> | null
) => void;

function setPersistAppState(appState: AppState) {
  return function (newState: Partial<PersistedAppState> | null) {
    appState.persist = newState
      ? merge(appState.persist, newState)
      : getInitialState().persist;
    new LocalStorage({}).save(appState.persist);
  };
}

export function usePersistedAppState(): [
  PersistedAppState,
  PersistedAppStateSetter
] {
  const appState = useContext(AppContext);
  return [appState.persist, setPersistAppState(appState)];
}
