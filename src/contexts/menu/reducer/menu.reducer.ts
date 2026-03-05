import { IInitialMenuState } from 'interfaces/menu.interface';
import { IMenuItem } from 'api/endpoints/menu/menu.response.interface';
import * as MenuTypes from './menu.types';

export type TMenuDispatchReducer =
  | {
      type: typeof MenuTypes.SET_MENUS;
      payload: IMenuItem[];
    }
  | {
      type: typeof MenuTypes.SET_IS_LOADING;
      payload: boolean;
    };

export default function menuReducer(
  state: IInitialMenuState,
  action: TMenuDispatchReducer
): IInitialMenuState {
  const { type, payload } = action;

  switch (type) {
    case MenuTypes.SET_MENUS: {
      return {
        ...state,
        menus: payload,
        activeMenus: payload.filter((item) => item.active),
      };
    }
    case MenuTypes.SET_IS_LOADING: {
      return { ...state, isLoading: payload };
    }
    default:
      return state;
  }
}
