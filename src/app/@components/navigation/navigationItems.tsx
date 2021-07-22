import React from "react";
import AppsIcon from "@material-ui/icons/Apps";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import AccountBox from "@material-ui/icons/AccountBox";

export interface NavItem {
  label: string;
  route: string;
  icon?: React.ReactElement;
}

export const navigationItems: NavItem[] = [
  {
    route: "/",
    label: "Home",
    icon: <AppsIcon />,
  },
  {
    route: "/account",
    label: "Account",
    icon: <AccountBox />,
  },
  {
    route: "/settings",
    label: "Settings",
    icon: <SettingsApplicationsIcon />,
  },
];
