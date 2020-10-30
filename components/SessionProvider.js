import React, { useState, useEffect, createContext, useContext } from 'react'
import { useAppBridge, Context } from "@shopify/app-bridge-react";
import {getSessionToken} from '@shopify/app-bridge-utils';
import axios from 'axios';

export const SessionToken = React.createContext(false);


export default function SessionProvider(props) {
  const [sessionToken, setSessionToken] = useState(false);
  const app = useContext(Context);

  useEffect(() => {
    getSessionToken(app)
      .then((sessionToken) => {
        setSessionToken(sessionToken);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [app]);

  return (
    <SessionToken.Provider value={sessionToken}>
      {
        (app && sessionToken) ? props.children : <>Loading...</>
      }
    </SessionToken.Provider>
  )
}
