/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useMemo, useCallback, useEffect, memo } from 'react';
import MenuContext from './MenuContext';
import initialMenuState from './initialMenuState';
import menuReducer from './reducer/menu.reducer';
import * as MenuTypes from './reducer/menu.types';
import * as action from './reducer/menu.actions';
import { IAddMenuBody } from 'api/endpoints/menu/menu.response.interface';
import { ChildrenProps } from 'interfaces/general.interface';
import useConnection from 'hooks/useConnection';

function MenuProvider({ children }: ChildrenProps) {
  const [state, dispatch] = useReducer(menuReducer, initialMenuState);
  const { connectionStatus, isNavigatorOnline } = useConnection();

  useEffect(() => {
    if (!connectionStatus) return;
    (async () => {
      dispatch({ type: MenuTypes.SET_IS_LOADING, payload: true });
      await action.getMenusAction({ dispatch });
      dispatch({ type: MenuTypes.SET_IS_LOADING, payload: false });
    })();
  }, [connectionStatus, isNavigatorOnline]);

  const getMenus = useCallback(async () => {
    return action.getMenusAction({ dispatch });
  }, []);

  const addMenu = useCallback(async (body: IAddMenuBody) => {
    return action.addMenuAction({ dispatch, body });
  }, []);

  const updateMenu = useCallback(async (menuId: string, data: Record<string, unknown>) => {
    return action.updateMenuAction({ dispatch, menuId, data });
  }, []);

  const activateMenu = useCallback(async (menuId: string, status: boolean) => {
    return action.activateMenuAction({ dispatch, menuId, status });
  }, []);

  const deleteMenu = useCallback(async (menuId: string) => {
    return action.deleteMenuAction({ dispatch, menuId });
  }, []);

  const memoProvider = useMemo(
    () => ({
      ...state,
      getMenus,
      addMenu,
      updateMenu,
      activateMenu,
      deleteMenu,
    }),
    [state, getMenus, addMenu, updateMenu, activateMenu, deleteMenu]
  );

  return <MenuContext.Provider value={memoProvider}>{children}</MenuContext.Provider>;
}

export default memo(MenuProvider);
