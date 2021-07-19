import { Page } from "../../app/layout/Page";
import { BalanceCard } from "./BalanceCard";
import { useHistory } from "react-router-dom";
import { useCurrentAccountSelector } from "../../app/hooks/useCurrentAccountSelector";

export const Dashboard = () => {
  const history = useHistory();
  const account = useCurrentAccountSelector();

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
