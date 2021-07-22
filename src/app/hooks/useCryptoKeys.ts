import { useState, useEffect } from "react";
import { KeyPairType } from "../security/keyPairType";
import { useAppSelector } from "../../hooks";
import { accountSelector } from "../selectors/accountSelector";
import { decryptCryptoKeys } from "../security/decryptCryptoKeys";

export function useCryptoKeys(pin: string): [boolean, KeyPairType | null] {
  const account = useAppSelector(accountSelector);
  const [loading, setLoading] = useState(false);
  const [keyPair, setKeyPair] = useState<KeyPairType | null>(null);
  useEffect(() => {
    const fetchKeys = async () => {
      try {
        setLoading(true);
        const keypair = await decryptCryptoKeys(
          pin,
          account?.securedKeys || ""
        );
        setKeyPair(keypair);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (pin) {
      fetchKeys();
    }
  }, [pin]);

  return [loading, keyPair];
}
