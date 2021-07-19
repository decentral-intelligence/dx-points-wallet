import { Page } from "../../app/layout/Page";
import Typography from "@material-ui/core/Typography";
import { Button, useTheme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { SecureStorage } from "../../app/storage/SecureStorage";
import { useState } from "react";
import { usePersistedAppState } from "../../app/hooks/usePersistedAppState";
import { useHistory } from "react-router-dom";
import { PinDialog } from "../../app/dialogs/PinDialog";
import { useTransientAppState } from "../../app/hooks/useTransientAppState";
import { useAppLoadingState } from "../../app/hooks/useAppLoadingState";

export const Settings = () => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [, setIsLoading] = useAppLoadingState();
  const [persistState, setPersistAppState] = usePersistedAppState();
  const [, setTransientState] = useTransientAppState();
  const history = useHistory();

  const resetData = async (pin: string) => {
    try {
      setIsLoading(true);
      if (pin) {
        (
          await SecureStorage.access(pin, persistState.currentAccountId)
        ).clear();
      }
      setPersistAppState(null);
      setTransientState(null);
      history.replace("/");
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetData = async () => {
    if (persistState.currentAccountId) {
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
