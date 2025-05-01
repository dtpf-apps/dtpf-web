import { DB_DTPF, VERSION, COURSES_INFO, MAIN_MENU } from '../config';
import { updateCoursesDBIndexed } from '../courses/coursesDBIndexed';
import { updateMainMenuDBIndexed } from '../mainMenu/mainMenuDBIndexed';

export function createObjects(db: any) {
  if (!db.objectStoreNames.contains(COURSES_INFO)) {
    db.createObjectStore(COURSES_INFO, { keyPath: COURSES_INFO });
  }
  if (!db.objectStoreNames.contains(MAIN_MENU)) {
    db.createObjectStore(MAIN_MENU, { keyPath: MAIN_MENU });
  }
}

export function getObjects(db: any) {
  if (db.objectStoreNames.contains(COURSES_INFO) && db.objectStoreNames.contains(MAIN_MENU)) {
    return true;
  } else {
    return false;
  }
}

export function removeEmptyDB(db: any) {
  if (db.objectStoreNames.length === 0) {
    indexedDB.deleteDatabase(DB_DTPF);
    const openRequest = indexedDB.open(DB_DTPF, VERSION);
    openRequest.onupgradeneeded = function (e: any) {
      const db = e.target.result;
      createObjects(db);
      updateCoursesDBIndexed(db);
      updateMainMenuDBIndexed(db);
    };
  }
}
