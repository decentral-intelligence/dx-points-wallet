import { StepAddCryptoKey } from "./StepAddCryptoKey";

interface Props {
  cryptoKey: string;
  onChange: (key: string, valid: boolean) => void;
}

export const StepAddPrivateKey: React.FC<Props> = ({ onChange, cryptoKey }) => (
  <StepAddCryptoKey
    cryptoKey={cryptoKey}
    type="private"
    label="Private Key"
    description="Paste your private key now"
    onChange={onChange}
  />
);
