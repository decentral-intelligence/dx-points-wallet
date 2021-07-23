import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box, Step, StepContent, StepLabel } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Page } from "../../../../app/@components/layout/Page";
import Typography from "@material-ui/core/Typography";
import { StepDefinePIN } from "../steps/StepDefinePIN";
import { StepConfirmPIN } from "../steps/StepConfirmPIN";
import { useAppDispatch } from "../../../../hooks";
import { useAppLoadingState } from "../../../../app/hooks/useAppLoadingState";
import { StepCreateAccount } from "../steps/StepCreateAccount";
import { useLoggedUser } from "../../../../app/hooks/useLoggedUser";

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
  return ["Define a PIN", "Confirm PIN", "Create Account"];
}

const StepIndices = {
  DefinePIN: 0,
  ConfirmPIN: 1,
  CreateAccount: 2,
};

export const AccountCreate = () => {
  const dispatch = useAppDispatch();
  const loggedUser = useLoggedUser();
  const styles = useStyles();
  const history = useHistory();
  const [, setAppLoading] = useAppLoadingState();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    pin: "",
    confirmedPin: "",
  });
  const [canAdvance, setCanAdvance] = useState(false);
  const [hint, setHint] = useState({ text: "", error: false });
  const steps = getStepLabels();

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
    // const accountId = data?.accountByPublicKey?._id;
    //
    // if (!accountId) {
    //   console.warn("No account Id set");
    //   return;
    // }
    // const { publicKey, privateKey, pin } = formData;
    // const { balance, alias, transactions, _id } = data.accountByPublicKey;
    // const securedKeys = await encryptCryptoKeys(pin, { privateKey, publicKey });
    // dispatch(
    //   actions.setAccount({
    //     _id,
    //     securedKeys,
    //     alias,
    //     transactions,
    //     balance,
    //   })
    // );
    // history.replace("/account");
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      pin: "",
      confirmedPin: "",
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
      case StepIndices.DefinePIN:
        return (
          <StepDefinePIN
            pin={formData.pin}
            onChange={handleFormDataChange("pin")}
          />
        );
      case StepIndices.ConfirmPIN:
        return (
          <StepConfirmPIN
            pin={formData.confirmedPin}
            targetPin={formData.pin}
            onChange={handleFormDataChange("confirmedPin")}
          />
        );
      case StepIndices.CreateAccount:
        return (
          <StepCreateAccount
            alias={loggedUser || ""}
            onChange={setCanAdvance}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Page>
      <Typography variant="h2">Create New Account</Typography>
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
