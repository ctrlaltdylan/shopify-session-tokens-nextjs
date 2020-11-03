import React, { useEffect, useContext, useState } from 'react'
import { SessionToken } from '../components/SessionProvider';
import axios from 'axios';

export default function useApi() {
  const sessionToken = useContext(SessionToken);

  const instance = axios.create({
    headers: { Authorization: `Bearer ${sessionToken}` },
  });

  return instance;
}
