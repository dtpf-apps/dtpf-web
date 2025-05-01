import { DB_DTPF, VERSION } from './config';
import { isDBValid } from './utils/validations';
import { createObjects, removeEmptyDB } from './utils/manageObjects';
import { updateCoursesDBIndexed } from './courses/coursesDBIndexed';
import { updateMainMenuDBIndexed } from './mainMenu/mainMenuDBIndexed';
import setIndexedDBVersion from './utils/setIndexedDBVersion';
import { COURSES_TECH, COURSES_HOURS } from '../utils/constants';
import { StorageValid } from '../utils/validations';

export default function dbIndexed() {
  if (!isDBValid()) return;
  const openRequest = indexedDB.open(DB_DTPF, VERSION);
  openRequest.onupgradeneeded = function (e: any) {
    if (window.navigator.onLine) {
      const db = e.target.result;
      createObjects(db);
      updateCoursesDBIndexed(db);
      updateMainMenuDBIndexed(db);
      if (StorageValid()) {
        localStorage.removeItem(COURSES_TECH);
        localStorage.removeItem(COURSES_HOURS);
      }
    }
  };
  openRequest.onsuccess = function (e: any) {
    const db = e.target.result;
    window.navigator.onLine && setIndexedDBVersion(db);
    removeEmptyDB(db);
  };
}
