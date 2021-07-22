import { ECDSAParameters, SigningAlgorithm } from "./securityParameters";
const stableStringify = require("json-stable-stringify");

interface TransactionPayload {
  sender: string;
  recipient: string;
  amount: number;
  message?: string;
  tags?: string[];
}

interface SignedTransaction extends TransactionPayload {
  signature: string;
}

export const signTransaction = async (
  privateKey: string,
  payload: TransactionPayload
): Promise<SignedTransaction> => {
  const signingJwk = JSON.parse(
    Buffer.from(privateKey, "base64").toString("utf-8")
  );
  const signingKey = await crypto.subtle.importKey(
    "jwk",
    signingJwk,
    ECDSAParameters,
    false,
    ["sign"]
  );
  const data = Buffer.from(stableStringify(payload));
  const signatureBuffer = await crypto.subtle.sign(
    SigningAlgorithm,
    signingKey,
    data
  );
  const signature = Buffer.from(signatureBuffer).toString("base64");

  return {
    ...payload,
    signature,
  };
};
