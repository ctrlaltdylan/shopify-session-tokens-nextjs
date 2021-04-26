import React, { useEffect } from "react";
import createApp from '@shopify/app-bridge';
import { Redirect } from '@shopify/app-bridge/actions';

export default function Home() {
  // page context params
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_SHOPIFY_API_PUBLIC_KEY;
    const redirectUri = process.env.NEXT_PUBLIC_SHOPIFY_AUTH_CALLBACK_URL;
    const shopOrigin = new URLSearchParams(window.location.search).get("shop");
    const scopes = process.env.NEXT_PUBLIC_SHOPIFY_AUTH_SCOPES;
    const permissionUrl = `https://${shopOrigin}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}`;

    // If the current window is the 'parent', change the URL by setting location.href
    if (window.top == window.self) {
      window.location.assign(permissionUrl);
    // If the current window is the 'child', change the parent's URL with Shopify App Bridge's Redirect action
    } else {
      const app = createApp({
        apiKey: apiKey,
        shopOrigin: shopOrigin
      });
      Redirect.create(app).dispatch(Redirect.Action.REMOTE, permissionUrl);
    }
  }, []);

  return (<>Loading...</>);
}
