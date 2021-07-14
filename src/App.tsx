import "./App.css";
import { HashRouter as Router } from "react-router-dom";
import { DefaultLayout } from "./app/layout/DefaultLayout";
import { Routes } from "./app/navigation/Routes";

export const App = () => (
  <Router>
    <DefaultLayout>
      <Routes />
    </DefaultLayout>
  </Router>
);
