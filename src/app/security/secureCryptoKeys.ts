import { KeyPairType } from "./keyPairType";

interface EncryptedData {
  iv: string;
  encrypted: string;
}

interface EncryptionContext extends EncryptedData {
  salt: string;
}

async function generateBaseCryptoKey(password: string): Promise<CryptoKey> {
  const encoded = new TextEncoder().encode(password);
  return window.crypto.subtle.importKey("raw", encoded, "PBKDF2", false, [
    "deriveKey",
  ]);
}

async function deriveKey(
  baseKey: CryptoKey,
  salt: ArrayBuffer
): Promise<CryptoKey> {
  const algorithm: Pbkdf2Params = {
    name: "PBKDF2",
    hash: "SHA-512",
    iterations: 50000,
    salt,
  };
  return window.crypto.subtle.deriveKey(
    algorithm,
    baseKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encryptMessage(
  key: CryptoKey,
  message: string
): Promise<EncryptedData> {
  let encoded = new TextEncoder().encode(message);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encoded
  );

  return {
    iv: Buffer.from(iv).toString("base64"),
    encrypted: Buffer.from(encrypted).toString("base64"),
  };
}

async function decryptMessage(
  key: CryptoKey,
  encryptedData: EncryptedData
): Promise<string> {
  const { iv, encrypted } = encryptedData;
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: Buffer.from(iv, "base64"),
    },
    key,
    Buffer.from(encrypted, "base64")
  );

  return new TextDecoder().decode(decrypted);
}

export const encryptCryptoKeys = async (
  passcode: string,
  keys: KeyPairType
): Promise<string> => {
  const keysString = JSON.stringify(keys);

  const baseKeyJwk = await generateBaseCryptoKey(passcode);
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const encryptionKey = await deriveKey(baseKeyJwk, salt);
  const encryptedData = await encryptMessage(encryptionKey, keysString);

  const encryptionContext: EncryptionContext = {
    salt: Buffer.from(salt).toString("base64"),
    ...encryptedData,
  };

  return Buffer.from(JSON.stringify(encryptionContext)).toString("base64");
};

export const decryptCryptoKeys = async (
  passcode: string,
  cipherText: string
): Promise<KeyPairType> => {
  const encryptionContext = JSON.parse(
    Buffer.from(cipherText, "base64").toString()
  ) as EncryptionContext;
  const baseKeyJwk = await generateBaseCryptoKey(passcode);
  const salt = Buffer.from(encryptionContext.salt, "base64");
  const decryptionKey = await deriveKey(baseKeyJwk, salt);
  const decrypted = await decryptMessage(decryptionKey, encryptionContext);
  return JSON.parse(decrypted) as KeyPairType;
};
