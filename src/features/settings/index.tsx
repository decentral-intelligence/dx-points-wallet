import Typography from "@material-ui/core/Typography";
import { Button, useTheme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Page } from "../../app/@components/layout/Page";
import { PinDialog } from "../../app/@components/dialogs/PinDialog";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useCurrentAccount } from "../../app/hooks/useCurrentAccount";
import { accountSlice } from "../account/state";
import { settingsSlice } from "./state";
import { currentAccountIdSelector } from "../../app/selectors/accountSelector";

export const Settings = () => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const account = useCurrentAccount();
  const userId = useAppSelector(currentAccountIdSelector);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const resetData = () => {
    if (!userId) return;
    dispatch(settingsSlice.actions.reset(userId));
    dispatch(accountSlice.actions.reset(userId));
    history.replace("/");
  };

  const handleResetData = async () => {
    if (account?._id) {
      setDialogOpen(true);
    } else {
      resetData();
    }
  };

  const handleCorrectPin = async (pin: string) => {
    setDialogOpen(false);
    resetData();
  };

  return (
    <Page>
      <Typography variant="h2">Settings</Typography>
      <Box textAlign="center" marginTop={theme.spacing(1)}>
        <Button variant="contained" color="secondary" onClick={handleResetData}>
          Reset All Data
        </Button>
      </Box>
      <PinDialog
        onClose={() => setDialogOpen(false)}
        onCorrectPin={handleCorrectPin}
        open={dialogOpen}
      />
    </Page>
  );
};
