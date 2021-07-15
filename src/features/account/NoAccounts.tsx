import { useHistory, useRouteMatch } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    height: "400px",
    maxWidth: "50%",
    margin: "0 auto",
  },
}));

export const NoAccounts = () => {
  const styles = useStyles();
  const theme = useTheme();
  const { path } = useRouteMatch();
  const history = useHistory();

  const gotoRegisterAccount = () => {
    history.push(`${path}/import`);
  };

  return (
    <div className={styles.root}>
      <Typography variant="h3">
        You don't have any account registered yet
      </Typography>
      <Box component="div" marginTop={theme.spacing(2)} textAlign="center">
        <Button variant="contained" onClick={gotoRegisterAccount}>
          Import Account
        </Button>
      </Box>
    </div>
  );
};
