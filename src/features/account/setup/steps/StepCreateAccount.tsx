import Typography from "@material-ui/core/Typography";
import { Box, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { KeyPairType } from "../../../../app/security/keyPairType";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { generateKeys } from "../../../../app/security/generateKeys";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";

interface Props {
  alias: string;
  onChange: (keypair: KeyPairType, isValid: boolean) => void;
}

const createKeyPairCopyText = (
  userName: string,
  keyPair: KeyPairType
): string =>
  `
DxPointz cryptographic keys for [${userName}]

Keep these stored in a secure place, i.e. 1Password, Keepass, etc  
-------------------------- PUBLIC KEY --------------------------
${keyPair.publicKey}
-------------------------- PRIVATE KEY --------------------------
${keyPair.privateKey}
----------------------------------------------------------------
`;

export const StepCreateAccount: React.FC<Props> = ({ alias, onChange }) => {
  const theme = useTheme();
  const snackBar = useSnackbar();
  const [keyPair, setKeyPair] = useState<KeyPairType>({
    privateKey: "",
    publicKey: "",
  });
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    async function generateKeyPair() {
      const keypair = await generateKeys();
      setKeyPair(keypair);
    }

    generateKeyPair();
  }, []);

  const handleClickCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        createKeyPairCopyText(alias, keyPair)
      );
      setHasCopied(true);
      onChange(keyPair, true);
      snackBar.enqueueSnackbar("Keys copied to clipboard", {
        variant: "success",
      });
      snackBar.enqueueSnackbar("Please store the keys in a secure place", {
        variant: "warning",
      });
    } catch (e) {
      snackBar.enqueueSnackbar("Oh snap. Could not copy the keys", {
        variant: "error",
      });
      console.error("Copy failed", e);
    }
  };

  return (
    <form>
      <Typography variant="body2">
        These are be your account keys. Please copy the public and private key
        and store these in a secure location. You'll need them to import your
        accounts on this or other devices.
      </Typography>
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
        />
      </Box>

      {!hasCopied && (
        <Box margin={theme.spacing(0.5)} textAlign="center">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FileCopyIcon />}
            onClick={handleClickCopy}
            size="large"
          >
            Copy Keys
          </Button>
          <Typography color="secondary">
            Please, copy and save both keys in a secure place!
          </Typography>
        </Box>
      )}
    </form>
  );
};
