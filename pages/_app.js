import React from 'react';
import '../styles/globals.css'
import { Provider } from "@shopify/app-bridge-react";
import Cookies from 'js-cookie';
import SessionProvider from '../components/SessionProvider';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider } from '@shopify/polaris';



function MyApp({ Component, pageProps }) {

  if (typeof window == "undefined" || !window.location) {
    return (
      <React.Fragment>
        <Component {...pageProps} />
      </React.Fragment>
    );
  }

  let shopOrigin = '';
  const queryOrigin = new URLSearchParams(window.location.search).get('shop');
  if(queryOrigin){
    shopOrigin = queryOrigin;
    localStorage.setItem('shopOrigin', queryOrigin);
  } else {
    shopOrigin = localStorage.getItem('shopOrigin');
  }

  const config = {
    apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_PUBLIC_KEY,
    forceRedirect: true,
    shopOrigin
  };

  return (
    <Provider config={config}>
      <AppProvider i18n={enTranslations}>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </AppProvider>
    </Provider>
  );
}

export default MyApp
