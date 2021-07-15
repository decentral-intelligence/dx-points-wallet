import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Page } from "../../../app/layout/Page";
import Typography from "@material-ui/core/Typography";
import { Box, Step, StepContent, StepLabel } from "@material-ui/core";
import { StepAddPublicKey } from "./steps/StepAddPublicKey";
import { StepAddPrivateKey } from "./steps/StepAddPrivateKey";
import { StepDefinePIN } from "./steps/StepDefinePIN";
import { StepConfirmPIN } from "./steps/StepConfirmPIN";

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

function getStepLabels(): string[] {
  return ["Define a PIN", "Confirm PIN", "Add Public Key", "Add Private Key"];
}

export const AccountImport = () => {
  const styles = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [pin, setPin] = useState("");
  const [cryptoKeys, setCryptoKeys] = useState({
    public: "",
    private: "",
  });
  const [canAdvance, setCanAdvance] = useState(true);
  const steps = getStepLabels();

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, steps.length)
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(0, prevActiveStep - 1));
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handlePinChange = (pin: string) => {
    setPin(pin);
  };

  const handlePinConfirmChange = (confirmedPin: string) => {
    setCanAdvance(confirmedPin === pin);
  };

  const handleCryptoKeyChange =
    (type: "public" | "private") => (key: string, isValid: boolean) => {
      setCryptoKeys({
        ...cryptoKeys,
        [type]: key,
      });
      setCanAdvance(isValid);
    };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <StepDefinePIN onChange={handlePinChange} />;
      case 1:
        return (
          <StepConfirmPIN targetPin={pin} onChange={handlePinConfirmChange} />
        );
      case 2:
        return <StepAddPublicKey onChange={handleCryptoKeyChange("public")} />;
      case 3:
        return (
          <StepAddPrivateKey onChange={handleCryptoKeyChange("private")} />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Page>
      <Typography variant="h2">Import Account</Typography>
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
          {activeStep === steps.length && (
            <Paper square elevation={0} className={styles.resetContainer}>
              <Typography>All steps completed - you're finished</Typography>
              <Button onClick={handleReset} className={styles.button}>
                Reset
              </Button>
            </Paper>
          )}
        </div>
      </Box>
    </Page>
  );
};
