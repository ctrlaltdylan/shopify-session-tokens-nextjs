This is an example [Next.js](https://nextjs.org/) project consuming Shopify App Bridge Session Tokens for authentication using utilities from [shopify-nextjs-toolbox](https://github.com/ctrlaltdylan/shopify-nextjs-toolbox)

## Getting Started

First, set your Shopify App's public & private keys in `.env.local`

```
SHOPIFY_API_PUBLIC_KEY='your public api key from the Shopify app dashboard here'
SHOPIFY_API_PRIVATE_KEY='your private api key from the Shopify app dashboard here'
NEXT_PUBLIC_SHOPIFY_API_PUBLIC_KEY='same value as SHOPIFY_API_PUBLIC_KEY, this will expose your public key to the frontend'
SHOPIFY_AUTH_CALLBACK_URL='<your-sub-domain>.ngrok.io/api/auth/callback'
SHOPIFY_AUTH_SCOPES='read_customers,write_customers' # a comma separated list of Shopify Auth scopes your app requires to function
HOME_PATH = '/home' # or wherever you'd like the user to be sent to after successfully authenticating
```

Then make sure your app is configured to use `<your-sub-domain>.ngrok.io` as the entry point.

Second, start up [ngrok](https://ngrok.io) and configure it to use `localhost:3000`.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

## How it works

This example app is using a set of utilities from the [shopify-nextjs-toolbox](https://www.npmjs.com/package/shopify-nextjs-toolbox) to handle Shopify's OAuth handshake and cookie-less session token generation & verification.

### OAuth Handshake

When a customer opens your app, they will be directed to your app's defined homepage in your Shopify App settings.

In `_app.js` use the `ShopifyAppBridgeProvider` component to check for authentication, and automatically pass the `host` and `shop` parameters to AppBridge if available:

```javascript
// pages/_app.js

function MyApp({ Component, pageProps }) {
  // The ShopifyAppBridgeProvider abstracts starting the OAuth process
  //   it will automatically redirect unauthenticated users to your `/api/auth.js` route
  return (
    <ShopifyAppBridgeProvider Component={Component} pageProps={pageProps}>
      <AppProvider i18n={enTranslations}>
        <Component {...pageProps} />
      </AppProvider>
    </ShopifyAppBridgeProvider>
  );
}
```

Next create a `pages/index.js` that will act as the entry point for unauthenticated merchants.

`useOAuth` calls your `pages/api/auth.js` route which generates the URL needed to redirect to start OAuth.

Under the hood `useOAuth` will redirect to this URl as soon as it's available to start the handshake:

```javascript
// pages/index.js

import React from "react";
import { useOAuth } from "shopify-nextjs-toolbox";

export default function Index() {
  useOAuth();

  // replace this with your jazzy loading icon animation
  return <>Loading...</>;
}
```

The OAuth flow begins at `/api/auth.js`. It will generate the URL to the merchant's Shopify dashboard route to give back to the frontend `useOAuth` hook.

```javascript
// pages/api/auth.js

import { handleAuthStart } from "shopify-nextjs-toolbox";

export default handleAuthStart;
```

After the user accepts your app's scopes and terms, they will be redirected from Shopify to `/api/auth/callback.js`.

That route will then verify the signature of the request and retrieve the merchant's Shopify access token.

The `afterAuth` function is called after the access token is successfully retrieved. Create your own `afterAuth` to store the shop's access token which is passed as the third argument `sessionToken`:

```javascript
// pages/api/auth/callback.js
import { handleAuthCallback } from "shopify-nextjs-toolbox";

const afterAuth = async (req, res, accessToken) => {
  // save accessToken with the shop
  db.collection("shop").insertOne({ name: req.query.shop, accessToken });

  // redirect is handled by handleAuthCallback, no need to res.send() or res.redirect() here.
};

export default handleAuthCallback(afterAuth);
```

Now that the merchant's OAuth handshake is complete, the customer is finally redirected to `/pages/home.js`, or whichever path you provide in `process.env.HOME_PATH`. This route is an internal route. Meaning, it can assume that the Shopify AppBridge has a valid `shopDomain` query parameter, and the merchant is authenticated by OAuth.

### Optional: nonce storage & validation

During OAuth you can (and should) store the a unique nonce to verify Shopify's identity during the callback.

We take care of generating this unqiue nonce, but we leave it up to you to store it in your database of choice during `startAuth`:

```javascript
// pages/api/auth.js

import { handleAuthStart } from "shopify-nextjs-toolbox";

const saveNonce = async (req, shopName, nonce) => {
  // shopify-nextjs-toolbox does the work of generating a secure unique nonce
  //   for better security, associate this nonce with the shop
  //
  // Example:
  // await db.connect().collection('nonces').insertOne({ shopName, nonce });
};

export default handleAuthStart({ saveNonce });
```

Then, after the merchant accepts your scopes you can validate the nonce returned by Shopify in the `handleAuthCallback`:

```javascript
// pages/api/auth/callback.js

import { handleAuthCallback } from "shopify-nextjs-toolbox";

const validateNonce = async (nonce, req) => {
  // retrieve the nonce associated with the current shop from OAuth
  // validate the nonce passed into this argument matches that nonce
};

const afterAuth = async (req, res, tokenData) => {
  const shop = req.query.shop;
  const accessToken = tokenData.access_token;

  // save the accessToken with the shop in your database to interact with the Shopify Admin API
};

export default handleAuthCallback(afterAuth, { options: { validateNonce } });
```

### App Bridge Session Token Retrieval

After the handshake is complete, in the `_app.js` the App Bridge is instantiated and the session token is retrieved. The host is transferred to your app by Shopify through the query param `host={host}`.

The `pages/home.js` is not rendered until the session token is available for consumption.

Once the page loads, then an HTTP request with the session token is sent to `/api/verify-token.js` where it's decoded and validated with your app's private key.

## TODO

- Implement a client side redirecting scheme to detect unauthorized use and return the user back to the oauth flow.
  - For example: https://github.com/Shopify/koa-shopify-auth/blob/master/src/auth/redirection-page.ts

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
