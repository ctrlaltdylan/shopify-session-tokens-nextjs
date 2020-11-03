import React, { useEffect, useState } from "react";
import useApi from '../hooks/useApi';


export default function Dashboard() {
  const api = useApi();
  const [response, setResponse] = useState(false);

  // the session token is now available for use to make authenticated requests to the our server
  useEffect(() => {
    if(api) {
      api.get("/api/verify-token")
      .then((res) => {
        setResponse(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    }
  }, [api]);

  return (
    <>
      {JSON.stringify(response, null, 2)}
    </>
  )
}
