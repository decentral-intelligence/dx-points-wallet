import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Page } from "../../app/@components/layout/Page";
import { NoAccounts } from "./NoAccounts";
import { AccountImport } from "./import";
import { AccountView } from "./view";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { TransferView } from "./transfer";

const hasAccountsSelector = (state: RootState): boolean => !!state.account?._id;

export const Account = () => {
  const { path } = useRouteMatch();
  const hasAccounts = useAppSelector(hasAccountsSelector);
  return (
    <Page>
      <Switch>
        <Route exact path={`${path}`}>
          {hasAccounts ? <AccountView /> : <NoAccounts />}
        </Route>
        <Route exact path={`${path}/import`}>
          <AccountImport />
        </Route>
        <Route exact path={`${path}/transfer`}>
          <TransferView />
        </Route>
      </Switch>
    </Page>
  );
};
