import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { Page } from "../../app/@components/layout/Page";
import { BalanceCard } from "../../app/@components/BalanceCard";
import { useCurrentAccount } from "../../app/hooks/useCurrentAccount";
import { useTheme } from "@material-ui/core";

export const Dashboard = () => {
  const theme = useTheme();
  const history = useHistory();
  const account = useCurrentAccount();

  if (!account) {
    history.push("/account");
    return null;
  }

  return (
    <Page>
      <Box marginBottom={theme.spacing(1)}>
        <BalanceCard account={account} />
      </Box>
    </Page>
  );
};
