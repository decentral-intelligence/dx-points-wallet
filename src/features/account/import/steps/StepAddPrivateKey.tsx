import { StepAddCryptoKey } from "./StepAddCryptoKey";

interface Props {
  onChange: (key: string, valid: boolean) => void;
}

export const StepAddPrivateKey: React.FC<Props> = ({ onChange }) => (
  <StepAddCryptoKey
    label="Private Key"
    description="Paste your private key now"
    onChange={onChange}
  />
);
