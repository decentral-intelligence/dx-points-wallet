import React, { useMemo } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { DefaultLayout } from "./app/@components/layout/DefaultLayout";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Settings } from "./features/settings";
import { Account } from "./features/account/Account";
import { Dashboard } from "./features/dashboard";
import { AppInitializer } from "./app/@components/AppInitializer";
import { useAppSelector } from "./hooks";
import { RootState } from "./store";
import { ThemeType } from "./app/types";

const themeSelector = (s: RootState): ThemeType =>
  s.settings[s.account._id]?.theme || "dark";

export const App = () => {
  const userTheme = useAppSelector(themeSelector);

  const apolloClient = useMemo(() => {
    return new ApolloClient({
      uri: process.env.REACT_APP_BACKBONE_API || "http://localhost:3001",
      cache: new InMemoryCache(),
    });
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: userTheme,
        },
      }),
    [userTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <AppInitializer />
        <Router>
          <DefaultLayout>
            <Switch>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/account">
                <Account />
              </Route>
              <Route exact path="/">
                <Dashboard />
              </Route>
            </Switch>
          </DefaultLayout>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
};
