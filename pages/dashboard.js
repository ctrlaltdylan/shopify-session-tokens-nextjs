import React, { useEffect, useContext, useState } from "react";
import { SessionToken } from "../components/SessionProvider";
import axios from "axios";


export default function Dashboard() {
  const sessionToken = useContext(SessionToken);
  const [response, setResponse] = useState(false);

  // the session token is now available for use to make authenticated requests to the our server
  useEffect(() => {
    if(sessionToken) {
      axios.get("/api/verify-token", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
    }
  }, [sessionToken]);

  return (
    <>
      {JSON.stringify(response, null, 2)}
    </>
  )
}
