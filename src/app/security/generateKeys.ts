import { KeyPairType } from "./keyPairType";

const generateKeyPair = async (): Promise<CryptoKeyPair> => {
  const keys = await window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-521", // P-256, P-384, or P-521
    },
    true,
    ["sign", "verify"]
  );
  return keys;
};

const exportBase64Jwk = async (key: CryptoKey): Promise<string> => {
  const jwk = await window.crypto.subtle.exportKey("jwk", key);
  return Buffer.from(JSON.stringify(jwk)).toString("base64");
};

export const generateKeys = async (): Promise<KeyPairType> => {
  const keypair = await generateKeyPair();

  const publicKey = await exportBase64Jwk(keypair.publicKey);
  const privateKey = await exportBase64Jwk(keypair.privateKey);

  return {
    publicKey,
    privateKey,
  };
};
