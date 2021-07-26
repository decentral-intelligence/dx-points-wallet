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
import { useMutation } from "@apollo/client";
import { transferPointsMutation } from "../../../../app/graphql/transferPoints.mutation";
import { createAccountMutation } from "../../../../app/graphql/createAccount.mutation";
import { encryptCryptoKeys } from "../../../../app/security/secureCryptoKeys";
import { accountSlice } from "../../state";

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

type FormDataField = "pin" | "confirmedPin" | "keys";

function getStepLabels(): string[] {
  return ["Define a PIN", "Confirm PIN", "Create Account"];
}

const StepIndices = {
  DefinePIN: 0,
  ConfirmPIN: 1,
  CreateAccount: 2,
};

export const AccountCreate = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const loggedUser = useLoggedUser();
  const [createAccount, { error, data }] = useMutation(createAccountMutation);
  const [, setAppLoading] = useAppLoadingState();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    pin: "",
    confirmedPin: "",
    keys: { publicKey: "", privateKey: "" },
  });
  const [canAdvance, setCanAdvance] = useState(false);
  // TODO: use setHint
  const [hint, setHint] = useState({ text: "", error: false });
  const steps = getStepLabels();

  useEffect(() => {
    const accountId = data?.createAccount?._id;

    if (!accountId) {
      console.warn("No account Id set");
      setAppLoading(false);
      return;
    }

    async function updateAccount() {
      const { balance, alias, transactions, _id } = data.createAccount;
      const securedKeys = await encryptCryptoKeys(formData.pin, formData.keys);
      dispatch(
        accountSlice.actions.setAccount({
          _id,
          securedKeys,
          alias,
          transactions,
          balance,
        })
      );
      history.replace("/");
    }

    updateAccount();
    setAppLoading(false);
  }, [data]);

  useEffect(() => {
    error && setAppLoading(false);
  }, [error]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, steps.length)
    );
    setCanAdvance(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(0, prevActiveStep - 1));
  };

  const handleCreate = async () => {
    setAppLoading(true);
    const args = {
      publicKey: formData.keys.publicKey,
      alias: loggedUser,
      // TODO: see if we want allow Admin users also :shrug
      role: "Common",
    };
    createAccount({ variables: { args } });
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      pin: "",
      confirmedPin: "",
      keys: { publicKey: "", privateKey: "" },
    });
  };

  const handleFormDataChange =
    (field: FormDataField) =>
    (value: any, isValid: boolean = true) => {
      setFormData({
        ...formData,
        [field]: value,
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
            onChange={handleFormDataChange("keys")}
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
                  onClick={handleCreate}
                  className={styles.button}
                  disabled={hint.error}
                >
                  Create
                </Button>
              </>
            )}
          </Paper>
        </div>
      </Box>
    </Page>
  );
};
