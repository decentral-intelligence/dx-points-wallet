import { ChangeEvent, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { PinDialog } from "../../../app/@components/dialogs/PinDialog";
import { AccountData } from "../../../app/types/accountData";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActions } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import { useLazyQuery, useMutation } from "@apollo/client";
import { getAccountByAliasQuery } from "../../../app/graphql/getAccountByAlias.query";
import { getAccountByIdQuery } from "../../../app/graphql/getAccountById.query";
import { useAppLoadingState } from "../../../app/hooks/useAppLoadingState";
import { transferPointsMutation } from "../../../app/graphql/transferPoints.mutation";
import { signTransaction } from "../../../app/security/signTransaction";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: theme.spacing(4),
  },
  row: {
    marginBottom: theme.spacing(2),
  },
}));

interface Props {
  account: AccountData;
}

interface FormDataType {
  amount: string;
  message?: string;
  receiver: string;
}

export const TransferForm: React.FC<Props> = ({ account }) => {
  const styles = useStyles();
  const history = useHistory();
  const [
    dispatchAccountByAliasFetch,
    { data: accountAliasData, loading: loadingAlias },
  ] = useLazyQuery(getAccountByAliasQuery);
  const [
    dispatchAccountByIdFetch,
    { data: accountIdData, loading: loadingId },
  ] = useLazyQuery(getAccountByIdQuery);
  const [transferPoints, { loading, error }] = useMutation(
    transferPointsMutation
  );
  const [, setLoadingState] = useAppLoadingState();
  const [isAccountValid, setIsAccountValid] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    amount: "",
    message: "",
    receiver: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setLoadingState(loadingId);
    setLoadingState(loadingAlias);
    setLoadingState(loading);
  }, [loadingAlias, loadingId, loading, setLoadingState]);

  useEffect(() => {
    setIsAccountValid(
      accountIdData?.account || accountAliasData?.accountByAlias
    );
  }, [accountIdData, accountAliasData, setIsAccountValid]);

  function handleReceiverBlur() {
    const receiver = formData.receiver;
    dispatchAccountByIdFetch({ variables: { id: receiver } });
    dispatchAccountByAliasFetch({ variables: { alias: receiver } });
  }

  const handleFormChange =
    (id: string) =>
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      // @ts-ignore
      formData[id] = target.value;
      setFormData({ ...formData });
    };

  const handleCancel = () => {
    history.goBack();
  };

  const confirmTransfer = async (pin: string, privatekey: string) => {
    try {
      const recipient =
        accountIdData?.account || accountAliasData?.accountByAlias;
      const payload = {
        sender: account._id,
        recipient: recipient._id,
        amount: parseFloat(formData.amount),
        message: formData.message,
      };

      const signedTransaction = await signTransaction(privatekey, payload);
      await transferPoints({ variables: { input: signedTransaction } });
      setFormData({
        amount: "",
        message: "",
        receiver: "",
      });
    } catch (e) {
      console.error(e);
    } finally {
      setDialogOpen(false);
    }
  };

  const cancelTransfer = () => {
    setDialogOpen(false);
  };

  const handleTransfer = () => {
    setDialogOpen(true);
  };

  const getReceiverFieldHelperText = (): string => {
    if (!isAccountValid) {
      return !formData.receiver.length ? "" : "❌ Unknown/Invalid Account";
    }
    const accountName =
      accountAliasData?.accountByAlias?._id || accountIdData?.account?.alias;
    return accountName ? `✅ ${accountName}` : "";
  };

  return (
    <>
      <Card className={styles.root}>
        <CardContent>
          <div className={styles.form}>
            <TextField
              className={styles.row}
              id="receiver"
              variant="filled"
              required
              onChange={handleFormChange("receiver")}
              onBlur={handleReceiverBlur}
              value={formData.receiver}
              label="Receiver"
              helperText={getReceiverFieldHelperText()}
              error={!isAccountValid}
            />
            <TextField
              className={styles.row}
              id="amount"
              variant="filled"
              autoComplete="off"
              onChange={handleFormChange("amount")}
              value={formData.amount}
              required
              label="Points"
            />
            <TextField
              className={styles.row}
              id="message"
              variant="filled"
              autoComplete="off"
              multiline
              onChange={handleFormChange("message")}
              value={formData.message}
              label="Message (optional)"
            />

            {error && (
              <Box>
                <Typography color="error">{error.message}</Typography>
              </Box>
            )}
          </div>
        </CardContent>
        <CardActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleTransfer}
            disabled={!(formData.receiver && formData.amount)}
          >
            Transfer
          </Button>
        </CardActions>
      </Card>
      <PinDialog
        onClose={cancelTransfer}
        onCorrectPin={confirmTransfer}
        open={dialogOpen}
      />
    </>
  );
};
