// TODO: Replace with zod type
export interface TransactionRefundRequestedResponse {
  pspReference?: string;
  result?: "REFUND_SUCCESS" | "REFUND_FAILURE";
  amount?: number;
  time?: string;
  externalUrl?: string;
  message?: string;
}
