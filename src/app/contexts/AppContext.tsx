import React from "react";
import { AppState, appState } from "../state";

export const AppContext = React.createContext<AppState>(appState);
