import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.5),
    },
  },
}));

export const Page: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <div>{children}</div>
    </Container>
  );
};
