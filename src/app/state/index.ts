import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoading: 0,
  loggedUser: "", // email
  confetti: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
        ? state.isLoading + 1
        : Math.max(0, state.isLoading - 1);
    },
    setLoggedUser: (state, action: PayloadAction<string>) => {
      state.loggedUser = action.payload;
    },
    showConfetti: (state) => {
      state.confetti = true;
    },
    hideConfetti: (state) => {
      state.confetti = false;
    },
    logout: (state, action: PayloadAction) => {
      state.loggedUser = "";
    },
  },
});

export const actions = appSlice.actions;
export const reducer = appSlice.reducer;
