import Typography from "@material-ui/core/Typography";
import { Page } from "../../app/layout/Page";
import { useSelector } from "../../app/hooks/useSelector";
import { AppState } from "../../app/state";
import { Button } from "@material-ui/core";

const hasAccountsSelector = (state: AppState): boolean =>
  Object.keys(state.persisted.accounts).length > 1;

const NoAccounts = () => (
  <>
    <Typography variant="h2">You don't have any account yet</Typography>
    <Button variant="contained">Create Account</Button>
  </>
);

export const AccountView = () => {
  const hasUsers = useSelector(hasAccountsSelector);
  return (
    <Page>
      {hasUsers ? (
        <Typography variant="h2">Your Account</Typography>
      ) : (
        <NoAccounts />
      )}
    </Page>
  );
};
