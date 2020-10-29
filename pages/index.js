import Head from 'next/head'
import styles from '../styles/Home.module.css'
import createApp from '@shopify/app-bridge';
import {getSessionToken} from '@shopify/app-bridge-utils';
import React, {useEffect} from 'react';
import Axios from 'axios';

export default function Home() {
  const app = createApp({
    apiKey: '18dbe40547a50f351c2d1229f417ccf8'
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
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )

  // SHOPIFY_API_KEY=18dbe40547a50f351c2d1229f417ccf8
  // SHOPIFY_API_SECRET=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
  
}
