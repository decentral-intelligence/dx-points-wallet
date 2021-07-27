import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { AccountData } from "../types/accountData";
import { useAppSelector } from "../../hooks";
import { inOutPointsSelector } from "../../features/dashboard/selectors";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import { useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    textAlign: "center",
    padding: theme.spacing(1),
  },
  balance: {
    marginTop: theme.spacing(2),
  },
}));

const CenteredCardActions = withStyles({
  root: {
    justifyContent: "center",
  },
})(CardActions);

interface Props {
  account: AccountData;
}

export const BalanceCard: React.FC<Props> = ({ account }) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const inOutPoints = useAppSelector(inOutPointsSelector);

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
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Chip
            icon={<AddCircleIcon style={{ color: "green" }} />}
            label={`Received: ${inOutPoints.in}`}
            variant="outlined"
          />
          <Box marginRight={theme.spacing(0.5)} />
          <Chip
            icon={<RemoveCircleIcon style={{ color: "red" }} />}
            label={`Sent: ${inOutPoints.out}`}
            variant="outlined"
          />
        </Box>
      </CardContent>
      <CenteredCardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={handleTransferPoints}
          disabled={account.balance === 0}
        >
          Transfer Points
        </Button>
        <Button size="small" onClick={handleSeeDetails}>
          See Details
        </Button>
      </CenteredCardActions>
    </Card>
  );
};
