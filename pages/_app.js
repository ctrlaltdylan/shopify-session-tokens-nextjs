import React from 'react';
import '../styles/globals.css'
import { Provider } from "@shopify/app-bridge-react";
import { getShopOrigin } from 'shopify-nextjs-toolbox';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider } from '@shopify/polaris';


function MyApp({ Component, pageProps }) {

  if (typeof window == "undefined" || !window.location) {
    return (
      <></>
    );
  }

  const shopOrigin = getShopOrigin();

  const config = {
    apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_PUBLIC_KEY,
    forceRedirect: true,
    shopOrigin
  };

  return (
    <Provider config={config}>
      <AppProvider i18n={enTranslations}>
        <Component {...pageProps} /> 
      </AppProvider>
    </Provider>
  );
}

export default MyApp
