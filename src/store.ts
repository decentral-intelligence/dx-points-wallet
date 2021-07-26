import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app/state";
import { accountSlice } from "./features/account/state";
import { settingsSlice } from "./features/settings/state";
import { save, load } from "redux-localstorage-simple";

const namespace = "dxp";
const persistableStates = ["accounts", "settings"];

const reducer = combineReducers({
  app: appSlice.reducer,
  accounts: accountSlice.reducer,
  settings: settingsSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      save({ states: persistableStates, namespace })
    ),
  preloadedState: load({ states: persistableStates, namespace }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
