import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import ConnectionContext from './ConnectionContext';
import { connectionAPI } from 'api/endpoints/connection/connection.api';
import { ChildrenProps } from 'interfaces/general.interface';

function ConnectionProvider({ children }: ChildrenProps) {
  const [connectionStatus, setConnectionStatus] = useState<number | null>(null);
  const [isNavigatorOnline, setIsNavigatorOnline] = useState(true);
  const [timeToReload, setTimeToReload] = useState(2000);

  const checkConnection = useCallback(() => {
    const online = window.navigator.onLine;
    setIsNavigatorOnline(online);
    connectionAPI()
      .then(({ response }) => {
        if (!online) {
          setConnectionStatus(200);
        } else {
          setConnectionStatus(response.status || 500);
        }
        setTimeToReload(response.status === 200 && online ? 30000 : 2000);
      })
      .catch(() => {
        setConnectionStatus(500);
        setTimeToReload(2000);
      });
  }, []);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkConnection();
    }, timeToReload);
    return () => {
      clearInterval(interval);
    };
  }, [timeToReload, checkConnection]);

  const memoProvider = useMemo(
    () => ({
      connectionStatus,
      isNavigatorOnline,
    }),
    [connectionStatus, isNavigatorOnline]
  );

  return <ConnectionContext.Provider value={memoProvider}>{children}</ConnectionContext.Provider>;
}

export default memo(ConnectionProvider);
