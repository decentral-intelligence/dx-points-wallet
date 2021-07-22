import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingsData, UserSettingsData } from "./settingsData";

const initialState = {} as SettingsData;

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettingsForUser: (
      state,
      action: PayloadAction<{ userid: string; settings: UserSettingsData }>
    ) => {
      const { userid, settings } = action.payload;
      state[userid] = settings;
    },
  },
});

export const actions = settingsSlice.actions;
export const reducer = settingsSlice.reducer;
