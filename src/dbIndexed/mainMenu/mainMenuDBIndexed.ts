import { getMenuApi } from '../../api/menu';
import { MAIN_MENU } from '../config';

export function updateMainMenuDBIndexed(db: any) {
  let mainMenu = {
    mainMenu: MAIN_MENU,
    menu: [],
  };
  getMenuApi()
    .then((res) => {
      if (res.message !== 'Failed to fetch') {
        if (res) {
          const arrayMenu: any = [];
          res.menu &&
            res.menu.forEach((item: any) => {
              item.active && arrayMenu.push(item);
            });
          mainMenu = {
            mainMenu: MAIN_MENU,
            menu: arrayMenu,
          };
        }
      }
    })
    .then(() => {
      const transaction = db.transaction([MAIN_MENU], 'readwrite');
      const store = transaction.objectStore(MAIN_MENU);
      store.put(mainMenu);
    });
}
