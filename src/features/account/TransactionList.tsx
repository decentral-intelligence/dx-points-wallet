import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { AccountData } from "../../app/types/accountData";
import { TransactionData } from "../../app/types/transactionData";
import Chip from "@material-ui/core/Chip";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface AmountCellProps {
  accountId: string;
  tx: TransactionData;
}

const AmountCell: React.FC<AmountCellProps> = ({ accountId, tx }) => {
  const Icon =
    accountId === tx.sender._id ? (
      <RemoveCircleIcon style={{ color: "red" }} />
    ) : (
      <AddCircleIcon style={{ color: "green" }} />
    );
  return <Chip icon={Icon} label={tx.amount} variant="outlined" />;
};

interface Props {
  account: AccountData;
}

export const TransactionList: React.FC<Props> = ({ account }) => {
  const classes = useStyles();

  const { transactions } = account;

  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        aria-label="transactions table"
        stickyHeader={true}
      >
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Sender</TableCell>
            <TableCell>Receiver</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((t) => (
            <TableRow key={t._id}>
              <TableCell>
                {new Date(parseInt(t.timestamp)).toLocaleString()}
              </TableCell>
              <TableCell>{t.sender.alias || t.sender._id}</TableCell>
              <TableCell>{t.recipient.alias || t.recipient._id}</TableCell>
              <TableCell>
                <AmountCell accountId={account._id} tx={t} />
              </TableCell>
              <TableCell>{t.message}</TableCell>
              <TableCell>{t.tags.join(",")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
