import { LocalStorage } from "../storage/LocalStorage";

interface UserData {
  transactions: [];
  balance: number;
  alias?: string;
  settings: any;
}

interface UserDictionary {
  [key: string]: UserData;
}

interface PersistedAppState {
  theme: "dark" | "light";
  peerUrl: string;
  currentAccountId: string;
  accounts: UserDictionary;
}

export interface AppState {
  transient: any;
  persisted: PersistedAppState;
}

const storage = new LocalStorage<PersistedAppState>({
  theme: "dark",
  currentAccountId: "",
  peerUrl: process.env.REACT_APP_BACKBONE_API || "http://localhost:3001",
  accounts: {},
});

export const appState: AppState = {
  transient: {},
  persisted: storage.load(),
};

// TODO: see best way to store data (at best implicitely)
