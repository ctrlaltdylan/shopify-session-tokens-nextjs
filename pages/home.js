import React, { useEffect, useState } from "react";
import { useApi } from 'shopify-nextjs-toolbox';


export default function Home() {
  const api = useApi();
  const [response, setResponse] = useState(false);

  // the session token is now available for use to make authenticated requests to the our server
  useEffect(() => {
    api.get("/api/verify-token")
    .then((res) => {
      setResponse(res.data);
    })
    .catch((res) => {
      debugger;
      console.log(res);
    });
  }, []);

  return (
    <>
      {JSON.stringify(response, null, 2)}
    </>
  )
}
