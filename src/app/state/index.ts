import { LocalStorage } from "../storage/LocalStorage";
import { AccountData } from "../types/accountData";

interface AccountsDictionary {
  [key: string]: AccountData;
}

export interface PersistedAppState {
  theme: "dark" | "light";
  peerUrl: string;
  currentAccountId: string;
  accounts: AccountsDictionary;
}

// no type defined yet
export interface TransientAppState {
  isLoading: boolean;
}

// TODO: eventual bring secured app state into game
export interface AppState {
  transient: TransientAppState;
  persist: PersistedAppState;
}

export const getInitialState = (): AppState => ({
  transient: {
    isLoading: false,
  },
  persist: {
    theme: "dark",
    currentAccountId: "",
    peerUrl: process.env.REACT_APP_BACKBONE_API || "http://localhost:3001",
    accounts: {},
  },
});

const storage = new LocalStorage<PersistedAppState>(getInitialState().persist);

export const appState: AppState = {
  ...getInitialState(),
  persist: storage.load(),
};
