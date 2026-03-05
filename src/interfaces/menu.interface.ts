import { IMenuItem, IAddMenuBody } from 'api/endpoints/menu/menu.response.interface';

export interface IInitialMenuState {
  menus: IMenuItem[];
  activeMenus: IMenuItem[];
  isLoading: boolean;

  getMenus: () => Promise<boolean>;
  addMenu: (body: IAddMenuBody) => Promise<boolean>;
  updateMenu: (menuId: string, data: Record<string, unknown>) => Promise<boolean>;
  activateMenu: (menuId: string, status: boolean) => Promise<boolean>;
  deleteMenu: (menuId: string) => Promise<boolean>;
}
