// TODO: Replace with zod type
export type PaymentGatewayInitializeSessionRequestData =
  | {
      action: "APPLEPAY_onvalidatemerchant";
      validationURL: string;
      domain: string;
      merchantIdentifier: string;
      merchantName: string;
    }
  | {
      action: "checkBalance";
      paymentMethod: {
        [k: string]: string;
      };
    }
  | {
      action: "createOrder";
    }
  | {
      action: "cancelOrder";
      orderData: string;
      pspReference: string;
    };
