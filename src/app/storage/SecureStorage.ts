import { CryptoStorage } from "@webcrypto/storage";
import { Storage } from "./Storage";

export class SecureStorage<TData> implements Storage<TData> {
  private readonly vault: CryptoStorage;

  protected constructor(passcode: string, private storeId: string) {
    this.vault = new CryptoStorage(passcode);
  }

  static create<TData>(passcode: string, storeId: string) {
    return new SecureStorage<TData>(passcode, storeId);
  }

  async clear(): Promise<void> {
    await this.vault.deleteDB();
  }

  async load(): Promise<TData> {
    const stringified = await this.vault.get(this.storeId);
    return stringified ? JSON.parse(stringified) : null;
  }

  async save(data: TData): Promise<void> {
    const oldData = this.load();
    const updatedData = {
      ...oldData,
      ...data,
    };
    return this.vault.set(this.storeId, JSON.stringify(updatedData));
  }
}
