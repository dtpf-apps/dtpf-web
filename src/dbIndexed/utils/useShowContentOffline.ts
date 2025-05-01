import { useState, useEffect } from 'react';
import useConnection from '../../hooks/useConnection';
import { DB_DTPF, VERSION } from '../config';
import { getObjects } from '../utils/manageObjects';

export default function useShowOfflineContent() {
  const { connectionStatus, isNavigatorOnline } = useConnection();
  const [databaseExists, setDatabaseExists] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const openRequest = indexedDB.open(DB_DTPF, VERSION);
  openRequest.onupgradeneeded = function (e: any) {
    const db = e.target.result;
    getObjects(db) ? setDatabaseExists(true) : setDatabaseExists(false);
  };
  openRequest.onsuccess = function (e: any) {
    const db = e.target.result;
    getObjects(db) ? setDatabaseExists(true) : setDatabaseExists(false);
  };
  useEffect(() => {
    !databaseExists && (connectionStatus === 500 || !isNavigatorOnline) ? setShowContent(true) : setShowContent(false);
  }, [databaseExists, connectionStatus, isNavigatorOnline]);
  return showContent;
}
