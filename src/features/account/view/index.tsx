import { Page } from "../../../app/@components/layout/Page";
import { BalanceCard } from "../../../app/@components/BalanceCard";
import { TransactionList } from "../TransactionList";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import { useAppSelector } from "../../../hooks";
import { accountSelector } from "../../../app/selectors/accountSelector";

export const AccountView = () => {
  const theme = useTheme();
  const account = useAppSelector(accountSelector);
  if (!account) return null;
  return (
    <Page>
      <Box margin={theme.spacing(1)}>
        <BalanceCard account={account} />
      </Box>
      <Box>
        <TransactionList account={account} />
      </Box>
    </Page>
  );
};
