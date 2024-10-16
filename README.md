# Saleor JSON Schemas

> [!TIP]
> Questions or issues? Check our [discord](https://discord.gg/H52JTZAtSH) channel for help.

## Overview

This repository contains JSON schemas used in various Saleor projects. These schemas are written in the [2020-12 JSON Schema specification](https://json-schema.org/draft/2020-12/json-schema-core).

## Contents

- [Saleor sync webhook response payloads](./saleor/sync-webhooks/)
  - Defines the expected format for responses from synchronous webhooks in Saleor.
  - Further Reading: [Saleor Sync Webhooks Documentation](https://docs.saleor.io/developer/extending/webhooks/synchronous-events/overview)
- [Adyen App `data` parameter payloads](./saleor-app-payment-adyen/)
  - Specifies the structure of the `data` parameter used in certain mutations for the Adyen SDK.
  - Further Reading: [Adyen App Storefront Integration Guide](https://docs.saleor.io/developer/app-store/apps/adyen/storefront#performing-additional-actions-optional)

Schemas in this repository are written in [2020-12 JSON Schema specification](https://json-schema.org/draft/2020-12/json-schema-core)

## Using JSON Schemas

You can access these schemas in two ways:

- Clone the repository locally:

```bash
git clone https://github.com/saleor/json-schemas.git
```

- Use the deployed schemas on GitHub pages:

```
https://saleor.github.io/json-schemas/schemas/saleor/sync-webhooks/transactions/TransactionRefundRequestedResponse.json
```

[JSON Schema docs](https://json-schema.org/tools?query=&sortBy=name&sortOrder=ascending&groupBy=toolingTypes&licenses=&languages=&drafts=&toolingTypes=&environments=) have a list of available tools you can use schemas for.

Here are some examples that can be used when developing Saleor apps or storefront for Saleor:

### TypeScript codegen: [`json-schema-to-typescript`](https://www.npmjs.com/package/json-schema-to-typescript)

Using `json-schema-to-typescript` you can generate TypeScript types based on Saleor JSON Schemas to use in your project:

```bash
pnpm i -g json-schema-to-typescript
json2ts -i 'schemas/**/!(*definitions).json' -o ./types
```

> [!TIP]
> This codegen supports [discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) for more strict type checking (see example)

<details>
  <summary><b>👉 Example output</b></summary>

```ts
export type TransactionCancelationRequestedResponse =
  | {
      pspReference: string;
    }
  | {
      actions?: TransactionActions;
      amount: number;
      externalUrl?: string;
      message?: string;
      pspReference: string;
      result: "CANCEL_SUCCESS";
      time?: string;
    }
  | {
      actions?: TransactionActions;
      amount?: number;
      externalUrl?: string;
      message?: string;
      pspReference: string;
      result: "CANCEL_FAILURE";
      time?: string;
    };
export type TransactionActions = ("CHARGE" | "REFUND" | "CANCEL")[];
```

</details>

### Multi-language codegen: [`quicktype`](https://github.com/glideapps/quicktype)

Quicktype generates strongly-typed models and serializes from JSON Schemas in many programming languages (e.g. Ruby, Flow, Rust, Kotlin, Python, Swift, etc.).

```bash
pnpm i -g quicktype
# Generate all Saleor schemas
mkdir types
quicktype -s schema schemas/saleor/**/*.json -o types/saleor.ts --lang typescript
```

<details>
  <summary><b>👉 Example output</b></summary>

```ts
export interface TransactionCancelationRequestedResponse {
  pspReference: string;
  actions?: Definition[];
  amount?: number;
  externalUrl?: string;
  message?: string;
  result?: TransactionCancelationRequestedResponseResult;
  time?: Date;
}
```

</details>

For TypeScript Quicktype can also generate `zod` and `effect` schemas for parsing data to match JSON Schema specification:

```bash
# Zod
quicktype -s schema schemas/saleor/**/*.json -o types/saleor.ts --lang typescript-zod
# Effect
quicktype -s schema schemas/saleor/**/*.json -o types/saleor.ts --lang typescript-effect-schema
```

> [!NOTE]
> This codegen doesn't support [discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) in TypeScript

<details>
  <summary><b>👉 Example output</b></summary>

```ts
export const TransactionCancelationRequestedResponseSchema = z.object({
  pspReference: z.string(),
  actions: z.array(DefinitionSchema).optional(),
  amount: z.number().optional(),
  externalUrl: z.string().optional(),
  message: z.string().optional(),
  result: TransactionCancelationRequestedResponseResultSchema.optional(),
  time: z.coerce.date().optional(),
});
export type TransactionCancelationRequestedResponse = z.infer<
  typeof TransactionCancelationRequestedResponseSchema
>;
```

</details>

## Development

Before starting, install dependencies using `pnpm`:

```bash
pnpm i
```

Make sure **not** to use `$id` parameter in the schema, as it's known to cause issues with codegens.

When using `$ref` parameter, remember to use path from the root of the repository, wihtout a forward slash, for example:

```json
"time": {
  "$ref": "saleor/definitions.json#/$defs/DateTime"
}
```

> [!TIP]
> When referencing to a specific `$defs` either from another file or in the same file that is not a schema in itself (i.e. it doesn't contain `type` field in the root JSON object), you need to use a [JSON Pointer](https://json-schema.org/understanding-json-schema/structuring#json-pointer): `#/#defs/<your_definitioon_name>` to reference the specific definition.
