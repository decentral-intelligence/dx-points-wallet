import { Page } from "../../app/@components/layout/Page";
import { useHistory } from "react-router-dom";
import { BalanceCard } from "../../app/@components/BalanceCard";
import { useAppSelector } from "../../hooks";
import { accountSelector } from "../../app/selectors/accountSelector";

export const Dashboard = () => {
  const history = useHistory();
  const account = useAppSelector(accountSelector);

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
