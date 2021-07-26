import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { NoAccounts } from "./NoAccounts";
import { AccountImport } from "./setup/import";
import { AccountCreate } from "./setup/create";
import { AccountView } from "./view";
import { TransferView } from "./transfer";
import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { getAccountByAliasQuery } from "../../app/graphql/getAccountByAlias.query";
import { useLoggedUser } from "../../app/hooks/useLoggedUser";
import { useAppLoadingState } from "../../app/hooks/useAppLoadingState";
import { useCurrentAccount } from "../../app/hooks/useCurrentAccount";

export const Account = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const account = useCurrentAccount();
  const [, setAppLoading] = useAppLoadingState();
  const loggedUser = useLoggedUser();
  const [getAccount, { data, error }] = useLazyQuery(getAccountByAliasQuery);

  useEffect(() => {
    if (!account) {
      setAppLoading(true);
      getAccount({ variables: { alias: loggedUser } });
    }
  }, [account]);

  useEffect(() => {
    if (!data) return;

    setAppLoading(false);
    if (data.accountByAlias !== null) {
      history.replace(`/account/import/${data.accountByAlias._id}`);
    } else {
      history.replace("/account/create");
    }
  }, [data]);

  useEffect(() => {
    error && setAppLoading(true);
  }, [error]);

  return (
    <Switch>
      <Route exact path={`${path}`}>
        {account ? <AccountView /> : <NoAccounts />}
      </Route>
      <Route exact path={`${path}/import/:accountId`}>
        <AccountImport />
      </Route>
      <Route exact path={`${path}/create`}>
        <AccountCreate />
      </Route>
      <Route exact path={`${path}/transfer`}>
        <TransferView />
      </Route>
    </Switch>
  );
};
