// TODO: Replace with zod type
export interface TransactionCancelationRequestedResponse {
  pspReference?: string;
  result?: "CANCEL_SUCCESS" | "CANCEL_FAILURE";
  amount?: number;
  time?: string;
  externalUrl?: string;
  message?: string;
}
