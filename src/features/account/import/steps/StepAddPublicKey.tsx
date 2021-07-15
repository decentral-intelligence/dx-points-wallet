import { StepAddCryptoKey } from "./StepAddCryptoKey";

interface Props {
  onChange: (key: string, valid: boolean) => void;
}

export const StepAddPublicKey: React.FC<Props> = ({ onChange }) => (
  <StepAddCryptoKey
    label="Public Key"
    description="Paste your public key here"
    onChange={onChange}
  />
);
