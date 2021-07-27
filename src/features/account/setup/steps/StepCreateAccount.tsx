import Typography from "@material-ui/core/Typography";
import { Box, TextField } from "@material-ui/core";
import { MouseEventHandler, useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { KeyPairType } from "../../../../app/security/keyPairType";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { generateKeys } from "../../../../app/security/generateKeys";

interface CopyProps {
  onClick: (e: MouseEventHandler<HTMLButtonElement> | undefined) => void;
}

const CopyAdornment: React.FC<CopyProps> = ({ onClick }) => (
  <InputAdornment position="end">
    {/* @ts-ignore */}
    <IconButton onClick={onClick}>
      <FileCopyIcon />
    </IconButton>
  </InputAdornment>
);

interface Props {
  alias: string;
  onChange: (keypair: KeyPairType, isValid: boolean) => void;
}

export const StepCreateAccount: React.FC<Props> = ({ alias, onChange }) => {
  const theme = useTheme();
  const [keyPair, setKeyPair] = useState<KeyPairType>({
    privateKey: "",
    publicKey: "",
  });
  const [hasCopied, setHasCopied] = useState({
    privateKey: false,
    publicKey: false,
  });

  useEffect(() => {
    async function createAccount() {
      const keypair = await generateKeys();
      setKeyPair(keypair);
    }

    createAccount();
  }, []);

  useEffect(() => {
    onChange(keyPair, hasCopied.privateKey && hasCopied.publicKey);
  }, [hasCopied, keyPair, onChange]);

  const handleClickCopy = (type: "privateKey" | "publicKey") => async () => {
    try {
      const value = keyPair[type];
      await navigator.clipboard.writeText(value);
      setHasCopied({
        ...hasCopied,
        [type]: true,
      });
      // TODO: make an alert/toast
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <form>
      <Typography variant="body2">
        These will be your account keys. Please copy the public and private key
        and store these in a secure location. You'll need them to import your
        accounts on this or other devices.
      </Typography>
      <Typography variant="caption" color="secondary">
        It's important to store the keys in a secure location
      </Typography>
      <Box marginTop={theme.spacing(0.25)} textAlign="center">
        <Typography variant="h4">{`Alias: ${alias}`}</Typography>
      </Box>
      <Box
        marginTop={theme.spacing(0.25)}
        textAlign="center"
        display="flex"
        flexDirection="row"
      >
        <TextField
          multiline
          fullWidth
          label="Public Key"
          variant="filled"
          defaultValue={keyPair.publicKey}
          disabled={true}
          InputProps={{
            endAdornment: (
              <CopyAdornment onClick={handleClickCopy("publicKey")} />
            ),
          }}
        />
      </Box>
      <Box
        marginTop={theme.spacing(0.25)}
        textAlign="center"
        display="flex"
        flexDirection="row"
      >
        <TextField
          multiline
          fullWidth
          label="Private Key"
          variant="filled"
          defaultValue={keyPair.privateKey}
          disabled={true}
          InputProps={{
            endAdornment: (
              <CopyAdornment onClick={handleClickCopy("privateKey")} />
            ),
          }}
        />
      </Box>
      {!(hasCopied.publicKey && hasCopied.privateKey) && (
        <Typography color="error">
          Please, copy and save both keys in a secure place!
        </Typography>
      )}
    </form>
  );
};
