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
import { SecureStorage } from "../storage/SecureStorage";
import { AppState } from "../state";
import { useAppStateSelector } from "../hooks/useAppStateSelector";
import { KeyPairType } from "../security/keyPairType";

interface Props {
  onClose: () => void;
  onCorrectPin: (pin: string, privateKey: string) => void;
  open: boolean;
}

const selectCurrentAccount = (state: AppState): string =>
  state.persist.currentAccountId;

export const PinDialog: React.FC<Props> = ({ open, onClose, onCorrectPin }) => {
  const [pin, setPin] = useState("");
  const [invalidPin, setInvalidPin] = useState(false);

  const accountId = useAppStateSelector(selectCurrentAccount);

  const handleConfirm = async () => {
    try {
      const secureStorage = SecureStorage.access<KeyPairType>(pin, accountId);
      const { privateKey } = await secureStorage.load();
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
