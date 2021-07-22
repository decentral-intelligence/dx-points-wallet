export interface UserSettingsData {
  theme: "dark" | "light";

  // add more here
}

export interface SettingsData {
  [key: string]: UserSettingsData;
}
