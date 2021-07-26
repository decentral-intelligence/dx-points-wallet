import { Page } from "../../app/@components/layout/Page";
import { useHistory } from "react-router-dom";
import { BalanceCard } from "../../app/@components/BalanceCard";
import { useCurrentAccount } from "../../app/hooks/useCurrentAccount";

export const Dashboard = () => {
  const history = useHistory();
  const account = useCurrentAccount();

  if (!account) {
    history.push("/account");
    return null;
  }

  return (
    <Page>
      <BalanceCard account={account} />
    </Page>
  );
};
