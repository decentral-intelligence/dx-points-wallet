import { Middleware } from "@reduxjs/toolkit";

export const resetMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === "app/reset") {
    return null;
  }
  return next(action);
};
