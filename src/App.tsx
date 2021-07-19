import React, { useContext, useMemo } from "react";
import { HashRouter as Router } from "react-router-dom";
import { DefaultLayout } from "./app/layout/DefaultLayout";
import { Routes } from "./app/navigation/Routes";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { AppContext } from "./app/contexts/AppContext";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export const App = () => {
  const appContext = useContext(AppContext);

  const apolloClient = useMemo(() => {
    return new ApolloClient({
      uri: appContext.persist.peerUrl,
      cache: new InMemoryCache(),
    });
  }, [appContext.persist.peerUrl]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: appContext.persist.theme,
        },
      }),
    [appContext.persist.theme]
  );

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Router>
          <DefaultLayout>
            <Routes />
          </DefaultLayout>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
};
