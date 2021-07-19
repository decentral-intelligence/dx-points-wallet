import { useState, useEffect } from "react";
import { KeyPairType } from "../security/keyPairType";
import { SecureStorage } from "../storage/SecureStorage";

export function useCryptoKeysSelector(
  pin: string,
  userId: string
): [boolean, KeyPairType | null] {
  const [loading, setLoading] = useState(false);
  const [keyPair, setKeyPair] = useState<KeyPairType | null>(null);
  useEffect(() => {
    const fetchKeys = async () => {
      try {
        setLoading(true);
        const keypair = await SecureStorage.access<KeyPairType>(
          pin,
          userId
        ).load();
        setKeyPair(keypair);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (pin && userId) {
      fetchKeys();
    }
  }, [pin, userId]);

  return [loading, keyPair];
}
