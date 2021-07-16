import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useSelector } from "../../app/hooks/useSelector";
import { AppState } from "../../app/state";
import { Page } from "../../app/layout/Page";
import { NoAccounts } from "./NoAccounts";
import { AccountImport } from "./import";
import { AccountView } from "./view";

const hasAccountsSelector = (state: AppState): boolean =>
  Object.keys(state.persisted.accounts).length > 0;

export const Account = () => {
  const { path } = useRouteMatch();
  const hasAccounts = useSelector(hasAccountsSelector);
  return (
    <Page>
      <Switch>
        <Route exact path={`${path}`}>
          {hasAccounts ? <AccountView /> : <NoAccounts />}
        </Route>
        <Route exact path={`${path}/import`}>
          <AccountImport />
        </Route>
      </Switch>
    </Page>
  );
};
