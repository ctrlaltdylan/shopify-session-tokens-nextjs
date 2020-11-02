import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { SessionToken } from '../components/SessionProvider';
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';



export default function Home() {
  const sessionToken = useContext(SessionToken);
  const [response, setResponse] = useState(false)

  // the session token is now available for use to make authenticated requests to the our server
  useEffect(() => {
    axios
      .get("/api/verify-token", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((res) => {
        debugger;
        console.log(res);
      });
  }, []);


  return (
    <div className={styles.container}>
      <h3>Shopify Session Token</h3>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  )
}
