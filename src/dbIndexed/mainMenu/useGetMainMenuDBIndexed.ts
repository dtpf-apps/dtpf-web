import { useState, useEffect } from 'react';
import { DB_DTPF, VERSION, MAIN_MENU } from '../config';
import { isDBValid } from '../utils/validations';

export default function useGetMainMenuDBIndexed() {
  const [mainMenuData, setMainMenuData] = useState({
    mainMenuIndexed: [],
  });
  useEffect(() => {
    if (!isDBValid()) return;
    const openRequest = indexedDB.open(DB_DTPF, VERSION);
    openRequest.onupgradeneeded = function (e: any) {
      const db = e.target.result;
      setMenu(db, setMainMenuData);
    };
    openRequest.onsuccess = function (e: any) {
      const db = e.target.result;
      setMenu(db, setMainMenuData);
    };
    openRequest.onerror = function (e: any) {
      // If indexedDb version is lower than the current..
      if (e.target.error.code === 0) {
        indexedDB.deleteDatabase(DB_DTPF);
        window.location.reload();
      }
    };
  }, []);
  return mainMenuData;
}

const setMenu = (db: any, setMainMenuData: any) => {
  if (db.objectStoreNames.contains(MAIN_MENU)) {
    const transaction = db.transaction(MAIN_MENU, 'readonly');
    const objectStore = transaction.objectStore(MAIN_MENU);
    const request = objectStore.get(MAIN_MENU);
    request.onsuccess = function (e: any) {
      const db = e.target.result;
      setMainMenuData({
        mainMenuIndexed: db ? db.menu : [],
      });
    };
    request.onerror = function (e: any) {
      console.log('onerror!', e);
    };
  } else {
    setMainMenuData({
      mainMenuIndexed: [],
    });
  }
};
