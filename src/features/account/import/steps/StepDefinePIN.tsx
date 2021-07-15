import Typography from "@material-ui/core/Typography";
import { Box, TextField } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { useTheme } from "@material-ui/core/styles";

interface Props {
  onChange: (pin: string) => void;
}

export const StepDefinePIN: React.FC<Props> = ({ onChange }) => {
  const theme = useTheme();
  const [pin, setPin] = useState<string>("");

  const onPinChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const pin = target.value;
    setPin(pin);
    onChange(pin);
  };

  return (
    <form>
      <Typography variant="body2">
        Please define an alphanumeric PIN, which will be used to protect your
        keys. Each time you do a transaction you will be asked to enter the PIN.
        If you lost your PIN you can re-import your accounts
      </Typography>
      <Box marginTop={theme.spacing(0.25)} textAlign="center">
        <TextField
          id="pin-input"
          label="PIN"
          type="password"
          variant="filled"
          onChange={onPinChange}
          value={pin}
          helperText="Keep your PIN secret"
        />
      </Box>
    </form>
  );
};
