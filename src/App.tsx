import React, { useContext } from "react";
import { HashRouter as Router } from "react-router-dom";
import { DefaultLayout } from "./app/layout/DefaultLayout";
import { Routes } from "./app/navigation/Routes";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { AppContext } from "./app/contexts/AppContext";

export const App = () => {
  const appContext = useContext(AppContext);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: appContext.persisted.theme,
        },
      }),
    [appContext.persisted.theme]
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <DefaultLayout>
          <Routes />
        </DefaultLayout>
      </Router>
    </ThemeProvider>
  );
};
