import { Page } from "../../../app/@components/layout/Page";
import { BalanceCard } from "../../../app/@components/BalanceCard";
import { TransactionList } from "../TransactionList";
import Box from "@material-ui/core/Box";
import { useCurrentAccount } from "../../../app/hooks/useCurrentAccount";

export const AccountView = () => {
  const account = useCurrentAccount();
  if (!account) return null;
  return (
    <Page>
      <Box>
        <BalanceCard account={account} />
      </Box>
      <Box>
        <TransactionList account={account} />
      </Box>
    </Page>
  );
};
