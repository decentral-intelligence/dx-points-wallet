import { Page } from "../../../app/layout/Page";
import Typography from "@material-ui/core/Typography";
import { AppState } from "../../../app/state";
import { useSelector } from "../../../app/hooks/useSelector";

// TODO: eventual needs to be exported
interface TransactionType {
  sender: string;
  recipient: string;
  amount: number;
  message?: string;
  timestamp: string;
  tags: string[];
}

interface AccountType {
  id: string;
  alias?: string;
  balance: number;
  transactions: TransactionType[];
}

const accountSelector = (state: AppState): AccountType => {
  const { accounts, currentAccountId } = state.persisted;

  console.log("accountSelector", currentAccountId, accounts[currentAccountId]);

  return {
    id: currentAccountId,
    ...accounts[currentAccountId],
  };
};

export const AccountView = () => {
  const account = useSelector(accountSelector);
  // const account = { id: 'ID', alias: 'Alias', balance: 100 }

  return (
    <Page>
      <Typography variant="h2">View Account</Typography>
      <Typography variant="h4">{account.id}</Typography>
      <Typography variant="h4">{account.alias}</Typography>
      <Typography variant="h4">{account.balance}</Typography>
    </Page>
  );
};
