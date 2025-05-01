const vls = localStorage.getItem('dtpf_idb_vs');
const versionLocalStorage = vls ? parseInt(vls) : 1;

export const VERSION = versionLocalStorage;
export const DB_DTPF = 'dtpf_idb';
export const DB_DTPF_LS_NAME = 'dtpf_idb_vs';
export const COURSES_INFO = 'coursesInfo';
export const MAIN_MENU = 'mainMenu';
