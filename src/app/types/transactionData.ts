interface SenderRecipientData {
  _id: string;
  alias: string;
}

export interface TransactionData {
  _id: string;
  sender: SenderRecipientData;
  recipient: SenderRecipientData;
  amount: number;
  message?: string;
  timestamp: string;
  tags: string[];
  signature: string;
}
