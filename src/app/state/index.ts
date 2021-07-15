import { LocalStorage } from "../storage/LocalStorage";

interface UserData {
  transactions: [];
  balance: [];
  settings: any;
}

interface UserDictionary {
  [key: string]: UserData;
}

interface PersistedAppState {
  theme: "dark" | "light";
  nodeUrl: string;
  accounts: UserDictionary;
}

export interface AppState {
  transient: any;
  persisted: PersistedAppState;
}

const storage = new LocalStorage<PersistedAppState>({
  theme: "dark",
  nodeUrl: "http://localhost:3001",
  accounts: {},
});

export const appState: AppState = {
  transient: {},
  persisted: storage.load(),
};
