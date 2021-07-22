import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { ChangeEvent, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useAppSelector } from "../../../hooks";
import { accountSelector } from "../../selectors/accountSelector";
import { decryptCryptoKeys } from "../../security/decryptCryptoKeys";

interface Props {
  onClose: () => void;
  onCorrectPin: (pin: string, privateKey: string) => void;
  open: boolean;
}

export const PinDialog: React.FC<Props> = ({ open, onClose, onCorrectPin }) => {
  const [pin, setPin] = useState("");
  const [invalidPin, setInvalidPin] = useState(false);
  const account = useAppSelector(accountSelector);

  if (!account) return null;

  const handleConfirm = async () => {
    try {
      const { privateKey } = await decryptCryptoKeys(pin, account.securedKeys);
      onCorrectPin(pin, privateKey);
    } catch (e) {
      setInvalidPin(true);
    }
  };

  const handlePinChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInvalidPin(false);
    setPin(target.value);
  };

  return (
    <Dialog
      maxWidth="sm"
      aria-labelledby="confirmation-dialog-title"
      open={open}
    >
      <DialogTitle id="confirmation-dialog-title">Confirm Action</DialogTitle>
      <DialogContent dividers>
        <Typography>Use your PIN to confirm the reset</Typography>
        <TextField
          type="password"
          onChange={handlePinChange}
          label="Enter your Pin"
          value={pin}
        />
        {invalidPin && <Typography color="error">Incorrect PIN</Typography>}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
