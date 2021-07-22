import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app/state";
import { accountSlice } from "./features/account/state";
import { settingsSlice } from "./features/settings/state";
import { save, load } from "redux-localstorage-simple";

const namespace = "dxp";
const persistableStates = ["account", "settings"];

const reducer = combineReducers({
  app: appSlice.reducer,
  account: accountSlice.reducer,
  settings: settingsSlice.reducer,
});

// @ts-ignore
const rootReducer = (state, action) => {
  if (action.type === "app/reset") {
    state = undefined;
  }
  return reducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
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
