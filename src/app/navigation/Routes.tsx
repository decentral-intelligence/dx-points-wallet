import { Route, Switch } from "react-router-dom";
import { Dashboard } from "../../features/dashboard";
import { Settings } from "../../features/settings";
import { Account } from "../../features/account/Account";

export const Routes = () => (
  <Switch>
    <Route path="/settings">
      <Settings />
    </Route>
    <Route path="/account">
      <Account />
    </Route>
    <Route exact path="/">
      <Dashboard />
    </Route>
  </Switch>
);
