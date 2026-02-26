import React, { useState, useEffect, createContext } from 'react';
import { connectionApi } from '../api/utils';

export const ConnectionContext = createContext();

export default function ConnectionProvider(props) {
  const { children } = props;
  const [timeToReload, setTimeToReload] = useState(2000);
  const [connection, setConnection] = useState({
    connectionStatus: null,
    isNavigatorOnline: true,
  });

  useEffect(() => {
    checkConnection(setConnection, setTimeToReload);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkConnection(setConnection, setTimeToReload);
    }, timeToReload);
    return () => {
      clearInterval(interval);
    };
  }, [timeToReload]);

  return <ConnectionContext.Provider value={connection}>{children}</ConnectionContext.Provider>;
}

function checkConnection(setConnection, setTimeToReload) {
  const isNavigatorOnline = window.navigator.onLine;
  connectionApi().then((res) => {
    if (!isNavigatorOnline) {
      setConnection({
        connectionStatus: 200,
        isNavigatorOnline: isNavigatorOnline,
      });
    } else {
      setConnection({
        connectionStatus: res.status ? res.status : 500,
        isNavigatorOnline: isNavigatorOnline,
      });
    }
    setTimeToReload(res.status && isNavigatorOnline ? 30000 : 2000);
  });
}
