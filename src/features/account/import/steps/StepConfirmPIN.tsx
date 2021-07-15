import Typography from "@material-ui/core/Typography";
import { Box, TextField } from "@material-ui/core";
import { FocusEvent, useState } from "react";
import { useTheme } from "@material-ui/core/styles";

interface Props {
  targetPin: string;
  onChange: (pin: string) => void;
}

export const StepConfirmPIN: React.FC<Props> = ({ targetPin, onChange }) => {
  const theme = useTheme();
  const [pin, setPin] = useState<string>("");

  const onPinChange = ({ target }: FocusEvent<HTMLInputElement>) => {
    const pin = target.value;
    setPin(pin);
    onChange(pin);
  };

  const isInvalid = targetPin.length > 0 && pin !== targetPin;

  return (
    <form>
      <Typography variant="body2">
        Now, confirm the previously entered PIN. Mind that the PIN
      </Typography>
      <Box marginTop={theme.spacing(0.25)} textAlign="center">
        <TextField
          id="confirm-pin-input"
          label="PIN"
          type="password"
          variant="filled"
          onChange={onPinChange}
          value={pin}
          helperText={isInvalid ? "PIN does not match" : " "}
          error={isInvalid}
        />
      </Box>
    </form>
  );
};
