import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { AccountData } from "../types/accountData";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  balance: {
    marginTop: theme.spacing(2),
  },
}));

interface Props {
  account: AccountData;
}

export const BalanceCard: React.FC<Props> = ({ account }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleSeeDetails = () => {
    history.push("/account");
  };

  const handleTransferPoints = () => {
    history.push("/account/transfer");
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography color="textSecondary" variant="h5" gutterBottom>
          {`${account.alias}`}
        </Typography>
        <Typography color="textSecondary" variant="subtitle2">
          {account._id}
        </Typography>
        <Typography
          className={classes.balance}
          color="textSecondary"
          variant="h4"
        >
          {`Balance: ${account.balance}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={handleTransferPoints}
          disabled={account.balance === 0}
        >
          Transfer Points
        </Button>
        <Button size="small" onClick={handleSeeDetails}>
          See Details
        </Button>
      </CardActions>
    </Card>
  );
};