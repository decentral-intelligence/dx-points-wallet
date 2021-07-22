import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
}));

export const Page: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.root}>{children}</div>
    </Container>
  );
};
