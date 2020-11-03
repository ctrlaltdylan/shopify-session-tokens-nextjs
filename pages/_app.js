import React from 'react';
import '../styles/globals.css'
import { Provider } from "@shopify/app-bridge-react";
import SessionProvider from '../components/SessionProvider';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider } from '@shopify/polaris';
import getShopOrigin from '../helpers/getShopOrigin';



function MyApp({ Component, pageProps }) {

  if (typeof window == "undefined" || !window.location) {
    return (
      <React.Fragment>
        <Component {...pageProps} />
      </React.Fragment>
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
        <SessionProvider>
          { shopOrigin ? <Component {...pageProps} /> : <>Loading...</> }
        </SessionProvider>
      </AppProvider>
    </Provider>
  );
}

export default MyApp
