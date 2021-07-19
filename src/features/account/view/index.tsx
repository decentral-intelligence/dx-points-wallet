import { Page } from "../../../app/layout/Page";
import Typography from "@material-ui/core/Typography";
import { useCurrentAccountSelector } from "../../../app/hooks/useCurrentAccountSelector";

export const AccountView = () => {
  const account = useCurrentAccountSelector();
  if (!account) return null;
  return (
    <Page>
      <Typography variant="h2">View Account</Typography>
      <Typography variant="h4">{account.id}</Typography>
      <Typography variant="h4">{account.alias}</Typography>
      <Typography variant="h4">{account.balance}</Typography>
    </Page>
  );
};
