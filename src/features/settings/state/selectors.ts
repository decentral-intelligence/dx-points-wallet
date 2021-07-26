import { RootState } from "../../../store";
import { ThemeType } from "../../../app/types";
import { currentAccountIdSelector } from "../../../app/selectors/accountSelector";

export const themeSelector = (s: RootState): ThemeType => {
  const id = currentAccountIdSelector(s);
  return s.settings[id]?.theme || "dark";
};
