import { RootState } from "../../store";

export const loggedUserSelector = (state: RootState): string | null =>
  state.app.loggedUser || null;
