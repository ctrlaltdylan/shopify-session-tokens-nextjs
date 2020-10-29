This is an example [Next.js](https://nextjs.org/) project consuming Shopify App Bridge Session Tokens for authentication.

## Getting Started

First, set your Shopify App's public & private keys in `.local.env`:

```
SHOPIFY_API_PUBLIC_KEY='your public api key from the Shopify app dashboard here'
SHOPIFY_API_PRIVATE_KEY='your private api key from the Shopify app dashboard here'
```

Second, start up [ngrok](https://ngrok.io) and configure it to use `localhost:3000`.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

## How it works

In the frontend, `pages/index.js` will instantiate an AppBridge instance. Then it uses the `getSessionToken` helper to call Shopify's API for a new JWT session token.

Once the frontend has procured a session token, it sends a `GET /api/verify-token` request with the session token in the `Authorization` header.

The backend route at `pages/api/verify_token.js` recieves this request and verifies the authenticity of this token.

## TODO

* Implement initial OAuth handshake
* Implement a skeleton loading page/component during session token retrieval
* Build a context to capture the `shopOrigin` and `sessionToken` for further requests

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

