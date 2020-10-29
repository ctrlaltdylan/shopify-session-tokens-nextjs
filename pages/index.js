import Head from 'next/head'
import styles from '../styles/Home.module.css'
import createApp from '@shopify/app-bridge';
import {getSessionToken} from '@shopify/app-bridge-utils';
import React, {useEffect} from 'react';
import Axios from 'axios';

export default function Home() {
  const app = createApp({
    apiKey: process.env.SHOPIFY_API_PUBLIC_KEY
  })

  useEffect(() => {
    getSessionToken(app)
    .then((sessionToken) => {
      axios.get('/api/verify-token', {
        headers: {
          'Authorization': `Bearer ${sessionToken}`
        }
      }).then(res => {
          console.log(res)
        })
        .catch(res => {
          console.log(res)
        })
    })
    .catch(err => {
      console.log(err);
    })
  })

  return (
    <div className={styles.container}>
      Session Token: {sessionToken}
    </div>
  )
}
