export interface TransactionType {
  sender: string;
  recipient: string;
  amount: number;
  message?: string;
  timestamp: string;
  tags: string[];
}
