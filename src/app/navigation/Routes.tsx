import { Route, Switch } from "react-router-dom";
import { Dashboard } from "../../features/dashboard";
import { Settings } from "../../features/settings";

export const Routes = () => (
  <Switch>
    <Route path="/settings">
      <Settings />
    </Route>
    <Route exact path="/">
      <Dashboard />
    </Route>
  </Switch>
);
