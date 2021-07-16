import React from "react";
import { StepAddCryptoKey } from "./StepAddCryptoKey";

interface Props {
  cryptoKey: string;
  onChange: (key: string, valid: boolean) => void;
}

export const StepAddPublicKey: React.FC<Props> = ({ onChange, cryptoKey }) => (
  <StepAddCryptoKey
    cryptoKey={cryptoKey}
    label="Public Key"
    description="Paste your public key here"
    onChange={onChange}
  />
);
