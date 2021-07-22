import { KeyPairType } from "./keyPairType";

// FIXME: This is not a real encryption... need to use AES-GCM with PBKDF2 to use our pin for secured storage
export const decryptCryptoKeys = async (
  passcode: string,
  cipherText: string
): Promise<KeyPairType> => {
  const decoded = Buffer.from(cipherText, "base64").toString();
  return Promise.resolve(JSON.parse(decoded));
};
