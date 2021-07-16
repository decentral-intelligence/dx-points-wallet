import Typography from "@material-ui/core/Typography";
import { Box, TextField } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { FocusEvent, useState } from "react";

interface Props {
  cryptoKey: string;
  label: string;
  description: string;
  onChange: (key: string, valid: boolean) => void;
}

export const StepAddCryptoKey: React.FC<Props> = ({
  cryptoKey,
  onChange,
  description,
  label,
}) => {
  const theme = useTheme();
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const onKeyChange = ({ target }: FocusEvent<HTMLInputElement>) => {
    const key = target.value;
    // TODO: validation of the key
    onChange(key, true);
  };

  return (
    <form>
      <Typography variant="body2">{description}</Typography>
      <Box marginTop={theme.spacing(0.25)} textAlign="center">
        <TextField
          label={label}
          variant="filled"
          multiline
          onChange={onKeyChange}
          value={cryptoKey}
          helperText={isInvalid ? "Not a valid key" : " "}
          error={isInvalid}
          fullWidth
        />
      </Box>
    </form>
  );
};
