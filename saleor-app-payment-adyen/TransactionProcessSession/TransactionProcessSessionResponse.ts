import type { JSONObject } from '../../types';
export type JSON = JSONObject;
export type SyncWebhookAppErrors = SyncWebhookAppError[];
export type TransactionActions = ("CHARGE" | "REFUND" | "CANCEL")[];

// TODO: Replace with zod type
export interface TransactionProcessSessionResponse {
  pspReference?: string;
  data?: {
    paymentDetailsResponse?: JSON;
    errors?: SyncWebhookAppErrors;
    [k: string]: unknown;
  };
  result:
    | "AUTHORIZATION_SUCCESS"
    | "AUTHORIZATION_FAILURE"
    | "AUTHORIZATION_REQUEST"
    | "AUTHORIZATION_ACTION_REQUIRED"
    | "CHARGE_SUCCESS"
    | "CHARGE_FAILURE"
    | "CHARGE_REQUEST"
    | "CHARGE_ACTION_REQUIRED";
  amount: number;
  time?: string;
  externalUrl?: string;
  message?: string;
  actions?: TransactionActions;
}
export interface SyncWebhookAppError {
  code?: string;
  message?: string;
  details?: JSON;
}
