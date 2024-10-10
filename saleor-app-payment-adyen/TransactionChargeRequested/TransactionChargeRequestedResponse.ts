// TODO: Replace with zod type
export type TransactionChargeRequestedResponse =
  | {
      pspReference?: string;
      result?: never;
      amount?: never;
      time?: never;
      externalUrl?: never;
      message?: never;
    }
  | {
      pspReference?: string;
      result: "CHARGE_SUCCESS" | "CHARGE_FAILURE";
      amount: number;
      time?: string;
      externalUrl?: string;
      message: string;
    };
