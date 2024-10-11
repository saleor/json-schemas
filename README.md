# Saleor JSON Schemas

This repository includes JSON schemas used in Saleor projects.

- [Saleor sync webhook response payloads](./saleor/sync-webhooks/)
  - Saleor expects responses from sync webhook to be in a specific format
  - Learn more about [Saleor sync webhooks](https://docs.saleor.io/developer/extending/webhooks/synchronous-events/overview)
- [Adyen App `data` parameter payloads](./saleor-app-payment-adyen/)
  - Adyen app uses `data` parameter on some mutations to pass additional data used by Adyen SDK
  - Learn more about [Adyen App storefront integration](https://docs.saleor.io/developer/app-store/apps/adyen/storefront#performing-additional-actions-optional)

Schemas in this repository are written in [2020-12 JSON Schema specification](https://json-schema.org/draft/2020-12/json-schema-core)

## Using JSON Schemas

### TypeScript

#### [`json-schema-to-typescript`](https://www.npmjs.com/package/json-schema-to-typescript)

```bash
pnpm i -g json-schema-to-typescript
json2ts -i 'schemas/**/!(*definitions).json' -o <your_folder_path>
```

Some schemas include specific definitions for `json-schema-to-typescript` so that it generates correct discriminating unions. For example

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
