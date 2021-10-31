import React from "react";
import "../styles/globals.css";
import { ShopifyAppBridgeProvider } from "shopify-nextjs-toolbox";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";

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

export default MyApp;
