import '../styles/globals.css'
import { Provider } from "@shopify/app-bridge-react";
import Cookies from 'js-cookie';
import SessionProvider from '../components/SessionProvider';


function MyApp({ Component, pageProps }) {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_PUBLIC_KEY,
    shopOrigin: Cookies.get("shopOrigin"),
  };

  return (
    <Provider config={config}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp
