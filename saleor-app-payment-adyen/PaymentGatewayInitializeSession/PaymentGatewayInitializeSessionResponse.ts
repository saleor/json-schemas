import type { JSONObject } from '../../types';
export type JSON = JSONObject;
export type SyncWebhookAppErrors = SyncWebhookAppError[];

// TODO: Replace with zod type
export interface PaymentGatewayInitializeSessionResponse {
  data:
    | {
        paymentMethodsResponse: JSON;
        clientKey: string;
        environment: "LIVE" | "TEST";
        errors?: SyncWebhookAppErrors;
        [k: string]: unknown;
      }
    | {
        applePayMerchantSession: JSON;
        errors?: SyncWebhookAppErrors;
      }
    | {
        giftCardBalanceResponse: JSON;
        errors?: SyncWebhookAppErrors;
      }
    | {
        orderCreateResponse: JSON;
        errors?: SyncWebhookAppErrors;
      }
    | {
        orderCancelResponse: JSON;
        errors?: SyncWebhookAppErrors;
      };
}
export interface SyncWebhookAppError {
  code?: string;
  message?: string;
  details?: JSON;
}
