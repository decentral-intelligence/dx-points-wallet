import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { Page } from "./Page";
import { Container, LinearProgress, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { accountSelector } from "../../selectors/accountSelector";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { getAccountByAliasQuery } from "../../graphql/getAccountByAlias.query";
import { appSlice } from "../../state";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
  },
  content: {
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    position: "relative",
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    height: "240px",
    width: "400px",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingbar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
}));

export const LoginLayout = () => {
  const styles = useStyles();
  const theme = useTheme();
  const [error, setError] = useState("");
  const account = useAppSelector(accountSelector);
  const dispatch = useAppDispatch();
  const [getAccount, { data, loading }] = useLazyQuery(getAccountByAliasQuery);
  const history = useHistory();

  useEffect(() => {
    if (account) {
      history.replace("/");
    }
  }, [account]);

  useEffect(() => {
    if (loading) return;

    if (!data?.accountByAlias) {
      history.replace("/account/create");
    }
  }, [loading, data]);

  const handleSuccessLogin = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    // @ts-ignore
    const email = response?.profileObj?.email;
    if (!email) {
      setError("Could not fetch the mandatory email address");
      return;
    }
    getAccount({ variables: { alias: email } });
    dispatch(appSlice.actions.setLoggedUser(email));
  };

  const handleFailureLogin = (error: any) => {
    setError(error.message);
  };

  if (account) return null;

  return (
    <Container classes={{ root: styles.root }}>
      <CssBaseline />
      <Page>
        <div className={styles.content}>
          <Paper className={styles.paper}>
            <LinearProgress
              className={styles.loadingbar}
              color="secondary"
              hidden={!loading}
            />
            <Box marginBottom={theme.spacing(1)}>
              <Typography variant="h4">Welcome to Dx Pointz</Typography>
            </Box>
            {error && (
              <Box marginBottom={theme.spacing(1)}>
                <Typography variant="subtitle2" color="error">
                  {error}
                </Typography>
              </Box>
            )}
            <Box>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
                buttonText="Login"
                onSuccess={handleSuccessLogin}
                onFailure={handleFailureLogin}
                cookiePolicy={"single_host_origin"}
                hostedDomain={process.env.REACT_APP_GOOGLE_HOSTED_DOMAIN}
                isSignedIn={true}
              />
            </Box>
          </Paper>
        </div>
      </Page>
    </Container>
  );
};
