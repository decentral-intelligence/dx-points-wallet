import Typography from "@material-ui/core/Typography";
import { Box, TextField } from "@material-ui/core";
import { FocusEvent } from "react";
import { useTheme } from "@material-ui/core/styles";

interface Props {
  pin: string;
  targetPin: string;
  onChange: (pin: string, isValid: boolean) => void;
}

export const StepConfirmPIN: React.FC<Props> = ({
  pin,
  targetPin,
  onChange,
}) => {
  const theme = useTheme();

  const onPinChange = ({ target }: FocusEvent<HTMLInputElement>) => {
    onChange(target.value, target.value === targetPin);
  };

  const isInvalid = targetPin.length > 0 && pin !== targetPin;

  return (
    <form>
      <Typography variant="body2">
        Now, confirm the previously entered PIN. Mind that the PIN is needed to
        confirm your transactions
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
