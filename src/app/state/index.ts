import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoading: 0,
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
    reset: () => {
      // triggers a middleware
      return initialState;
    },
  },
});

export const actions = appSlice.actions;
export const reducer = appSlice.reducer;
