import { KeyPairType } from "./keyPairType";

// FIXME: This is not an encryption... need to use AES-GCM with PBKDF2 to use our pin for secured storage
export const encryptCryptoKeys = async (
  passcode: string,
  keys: KeyPairType
): Promise<string> => {
  const keyString = JSON.stringify(keys);
  return Promise.resolve(Buffer.from(keyString).toString("base64"));
};
