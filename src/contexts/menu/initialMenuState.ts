import { IInitialMenuState } from 'interfaces/menu.interface';

const initialMenuState: IInitialMenuState = {
  menus: [],
  activeMenus: [],
  isLoading: true,

  getMenus: () => Promise.resolve(false),
  addMenu: () => Promise.resolve(false),
  updateMenu: () => Promise.resolve(false),
  activateMenu: () => Promise.resolve(false),
  deleteMenu: () => Promise.resolve(false),
};

export default initialMenuState;
