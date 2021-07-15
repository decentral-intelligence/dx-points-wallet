import { Route, Switch } from "react-router-dom";
import { Dashboard } from "../../features/dashboard";
import { Settings } from "../../features/settings";
import { AccountView } from "../../features/account";

export const Routes = () => (
  <Switch>
    <Route path="/settings">
      <Settings />
    </Route>
    <Route path="/account">
      <AccountView />
    </Route>
    <Route exact path="/">
      <Dashboard />
    </Route>
  </Switch>
);
