import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import { Box, Step, StepContent, StepLabel } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Page } from "../../../../app/@components/layout/Page";
import Typography from "@material-ui/core/Typography";
import { StepAddPublicKey } from "../steps/StepAddPublicKey";
import { StepAddPrivateKey } from "../steps/StepAddPrivateKey";
import { StepDefinePIN } from "../steps/StepDefinePIN";
import { StepConfirmPIN } from "../steps/StepConfirmPIN";
import { getAccountByPublicKeyQuery } from "../../../../app/graphql/getAccountByPublicKey.query";
import { useAppDispatch } from "../../../../hooks";
import { actions } from "../../state";
import { encryptCryptoKeys } from "../../../../app/security/secureCryptoKeys";
import { useLoggedUser } from "../../../../app/hooks/useLoggedUser";
import { appSlice } from "../../../../app/state";
import { useSnackbar } from "notistack";
import upperFirst from "lodash/upperFirst";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  })
);

type FormDataField = "pin" | "confirmedPin" | "publicKey" | "privateKey";

function getStepLabels(): string[] {
  return ["Define a PIN", "Confirm PIN", "Add Public Key", "Add Private Key"];
}

const StepIndices = {
  DefinePIN: 0,
  ConfirmPIN: 1,
  AddPublicKey: 2,
  AddPrivateKey: 3,
};

export const AccountImport: React.FC = () => {
  const dispatch = useAppDispatch();
  const styles = useStyles();

  const snackBar = useSnackbar();
  const history = useHistory();
  const theme = useTheme();
  const loggedUser = useLoggedUser();
  const [getAccount, { data }] = useLazyQuery(getAccountByPublicKeyQuery);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    pin: "",
    confirmedPin: "",
    publicKey: "",
    privateKey: "",
  });

  const [canAdvance, setCanAdvance] = useState(false);
  const [hint, setHint] = useState({ text: "", error: false });
  const steps = getStepLabels();

  const firstName = useMemo(() => {
    return upperFirst(loggedUser ? loggedUser.replace(/([.@].*)/gi, "") : "");
  }, [loggedUser]);

  useEffect(() => {
    if (!data) {
      return;
    }
    if (!data.accountByPublicKey) {
      setHint({
        text: "No account exists for given public key!",
        error: true,
      });
      return;
    }

    const { _id, alias } = data.accountByPublicKey;

    if (loggedUser !== alias) {
      setHint({
        text: "Wrong user account!",
        error: true,
      });
      return;
    }

    const aliasTxt = alias ? `(alias: ${alias})` : "";
    setHint({
      text: `Your Account: ${_id} ${aliasTxt}`,
      error: false,
    });
  }, [data, loggedUser]);

  useEffect(() => {
    if (!formData.publicKey) {
      return;
    }
    getAccount({ variables: { publicKey: formData.publicKey } });
  }, [formData, getAccount]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, steps.length)
    );
    setCanAdvance(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(0, prevActiveStep - 1));
  };

  const handleAccept = async () => {
    const accountId = data?.accountByPublicKey?._id;

    if (!accountId) {
      console.warn("No account Id set");
      return;
    }
    const { publicKey, privateKey, pin } = formData;
    const { balance, alias, transactions, _id } = data.accountByPublicKey;
    const securedKeys = await encryptCryptoKeys(pin, { privateKey, publicKey });
    dispatch(
      actions.setAccount({
        _id,
        securedKeys,
        alias,
        transactions,
        balance,
      })
    );
    snackBar.enqueueSnackbar("Yay! Welcome back to Dx Pointz", {
      variant: "success",
    });
    dispatch(appSlice.actions.showConfetti());

    history.replace("/account");
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      pin: "",
      confirmedPin: "",
      publicKey: "",
      privateKey: "",
    });
  };

  const handleFormDataChange =
    (field: FormDataField) =>
    (key: string, isValid: boolean = true) => {
      setFormData({
        ...formData,
        [field]: key,
      });
      setCanAdvance(isValid);
    };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <StepDefinePIN
            pin={formData.pin}
            onChange={handleFormDataChange("pin")}
          />
        );
      case 1:
        return (
          <StepConfirmPIN
            pin={formData.confirmedPin}
            targetPin={formData.pin}
            onChange={handleFormDataChange("confirmedPin")}
          />
        );
      case 2:
        return (
          <StepAddPublicKey
            cryptoKey={formData.publicKey}
            onChange={handleFormDataChange("publicKey")}
          />
        );
      case 3:
        return (
          <StepAddPrivateKey
            cryptoKey={formData.privateKey}
            onChange={handleFormDataChange("privateKey")}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Page>
      <Typography variant="h2">Import Account</Typography>
      <Box marginY={theme.spacing(0.25)}>
        <Typography variant="h4">{`Welcome back, ${firstName}`}</Typography>
        <Typography variant="body1">
          Your data is not stored locally on this browser.
        </Typography>
        <Typography variant="body1">
          Get your cryptographic keys you have received when you created your
          account and follow the instructions
        </Typography>
      </Box>
      <Box component="div" width="100%">
        <div className={styles.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <>{getStepContent(index)}</>
                  <div className={styles.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={styles.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={styles.button}
                        disabled={!canAdvance}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          <Paper square elevation={0} className={styles.resetContainer}>
            <Typography
              color={hint.error ? "error" : "textPrimary"}
              align="center"
            >
              {hint.text}
            </Typography>
            {activeStep === steps.length && (
              <>
                <Typography>All steps completed - you're finished</Typography>
                <Button onClick={handleReset} className={styles.button}>
                  Reset
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAccept}
                  className={styles.button}
                  disabled={hint.error}
                >
                  Accept
                </Button>
              </>
            )}
          </Paper>
        </div>
      </Box>
    </Page>
  );
};
