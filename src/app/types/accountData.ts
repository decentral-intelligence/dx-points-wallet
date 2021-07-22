import { TransactionData } from "./transactionData";

export interface AccountData {
  _id: string;
  securedKeys: string;
  transactions: TransactionData[];
  balance: number;
  alias?: string;
}
