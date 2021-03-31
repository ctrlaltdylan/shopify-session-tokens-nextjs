import React, { useEffect, useState } from "react";
import { useApi, useShopOrigin } from 'shopify-nextjs-toolbox';


export default function Home() {
  const shopName = useShopOrigin();
  const api = useApi();
  const [response, setResponse] = useState(false);

  // the session token is now available for use to make authenticated requests to the our server
  useEffect(() => {
    api.get("/api/verify-token")
    .then((res) => {
      setResponse(res.data);
    })
    .catch((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>Current Decoded Session Token</h2>
        <p>
          This is the decoded session token that was sent to the server after the OAuth handshake finished.
        </p>
        <p>
          You can use the backend middleware <code>withSessionToken</code> to verify the API request came from the currently logged in shop 
        </p>
        <p>
          Wrap your API route with <code>withSessionToken</code> to access the shop's origin (a.k.a the shop's name in <code>shop-name.myshopify.com</code> format) in the backend.
        </p>
        <pre>
          {JSON.stringify(response, null, 4)}
        </pre>
      </div>
      <div className="card">
        <h2>Currently logged in as</h2>
        <code>{shopName}</code>
      </div>
    </div>
  )
}
