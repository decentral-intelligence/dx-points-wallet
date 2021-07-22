import Typography from "@material-ui/core/Typography";
import { Button, useTheme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppLoadingState } from "../../app/hooks/useAppLoadingState";
import { Page } from "../../app/@components/layout/Page";
import { PinDialog } from "../../app/@components/dialogs/PinDialog";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { accountSelector } from "../../app/selectors/accountSelector";
import { appSlice } from "../../app/state";

export const Settings = () => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const account = useAppSelector(accountSelector);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const resetData = async (pin: string) => {
    dispatch(appSlice.actions.reset());
    history.replace("/");
  };

  const handleResetData = async () => {
    if (account?._id) {
      setDialogOpen(true);
    } else {
      await resetData("");
    }
  };

  const handleCorrectPin = async (pin: string) => {
    setDialogOpen(false);
    await resetData(pin);
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
