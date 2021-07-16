import { ECDSAParameters } from "./securityParameters";

export const validateCryptoKey = async (
  base64Key: string,
  type: "private" | "public"
): Promise<boolean> => {
  try {
    const usage = type === "private" ? "sign" : "verify";
    const jwk = JSON.parse(Buffer.from(base64Key, "base64").toString("utf-8"));
    await window.crypto.subtle.importKey("jwk", jwk, ECDSAParameters, false, [
      usage,
    ]);
    return true;
  } catch (e) {
    return false;
  }
};
