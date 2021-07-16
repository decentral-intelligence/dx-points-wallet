import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavItem, navigationItems } from "../navigation/navigationItems";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

interface LinkProps {
  key: string;
  item: NavItem;
}

const ListItemLink: React.FC<LinkProps> = (props) => {
  const {
    item: { icon, label, route },
  } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        // @ts-ignore
        <Link ref={ref} to={route} {...linkProps} />
      )),
    [route]
  );

  return (
    <li>
      <ListItem button component={CustomLink}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={label} />
      </ListItem>
    </li>
  );
};

export const DrawerMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {navigationItems.map((item, index) => (
          <ListItemLink key={item.label} item={item} />
        ))}
      </List>
    </div>
  );
};
