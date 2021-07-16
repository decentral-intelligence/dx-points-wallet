import Typography from "@material-ui/core/Typography";
import { Box, TextField } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { FocusEvent, useState } from "react";
import { validateCryptoKey } from "../../../../app/security/validateCryptoKey";

interface Props {
  cryptoKey: string;
  type: "private" | "public";
  label: string;
  description: string;
  onChange: (key: string, valid: boolean) => void;
}

export const StepAddCryptoKey: React.FC<Props> = ({
  cryptoKey,
  type,
  onChange,
  description,
  label,
}) => {
  const theme = useTheme();
  const [isValid, setIsValid] = useState<boolean>(true);

  const onKeyChange = async ({ target }: FocusEvent<HTMLInputElement>) => {
    const key = target.value;
    const isValid = await validateCryptoKey(key, type);
    setIsValid(isValid);
    onChange(key, isValid);
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
          helperText={isValid ? " " : "Not a valid key"}
          error={!isValid}
          fullWidth
        />
      </Box>
    </form>
  );
};
