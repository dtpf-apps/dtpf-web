import { useState, useEffect } from 'react';
import { DB_DTPF, VERSION, COURSES_INFO } from '../config';
import { isDBValid } from '../utils/validations';

export default function useGetCoursesDBIndexed() {
  const [coursesData, setCoursesData] = useState({
    coursesInfoIndexed: [],
  });
  useEffect(() => {
    if (!isDBValid()) return;
    const openRequest = indexedDB.open(DB_DTPF, VERSION);
    openRequest.onupgradeneeded = function (e: any) {
      const db = e.target.result;
      setCourses(db, setCoursesData);
    };
    openRequest.onsuccess = function (e: any) {
      const db = e.target.result;
      setCourses(db, setCoursesData);
    };
    openRequest.onerror = function (e: any) {
      if (e.target.error.code === 0) {
        indexedDB.deleteDatabase(DB_DTPF);
        window.location.reload();
      }
    };
  }, []);
  return coursesData;
}

const setCourses = (db: any, setCoursesData: any) => {
  if (db.objectStoreNames.contains(COURSES_INFO)) {
    const transaction = db.transaction(COURSES_INFO, 'readonly');
    const objectStore = transaction.objectStore(COURSES_INFO);
    const request = objectStore.get(COURSES_INFO);
    request.onsuccess = function (e: any) {
      const db = e.target.result;
      setCoursesData({
        coursesInfoIndexed: db ? db : [],
      });
    };
    request.onerror = function (e: any) {
      console.log('onerror!', e);
    };
  } else {
    setCoursesData({
      coursesInfoIndexed: [],
    });
  }
};
