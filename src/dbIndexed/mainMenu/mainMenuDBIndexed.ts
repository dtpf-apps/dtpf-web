import { getMenusAPI } from 'api/endpoints/menu/menu.api';
import { MAIN_MENU } from '../config';

export function updateMainMenuDBIndexed(db: any) {
  let mainMenu: any = {
    mainMenu: MAIN_MENU,
    menu: [],
  };
  getMenusAPI()
    .then(({ data }) => {
      if (data.menu) {
        const arrayMenu: any = [];
        data.menu.forEach((item: any) => {
          item.active && arrayMenu.push(item);
        });
        mainMenu = {
          mainMenu: MAIN_MENU,
          menu: arrayMenu,
        };
      }
    })
    .then(() => {
      const transaction = db.transaction([MAIN_MENU], 'readwrite');
      const store = transaction.objectStore(MAIN_MENU);
      store.put(mainMenu);
    });
}
