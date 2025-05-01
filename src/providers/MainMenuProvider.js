import React, { useState, useEffect, createContext } from 'react';
import { getMenuApi } from '../api/menu';
import useConnection from '../hooks/useConnection';

export const MainMenuContext = createContext();

export default function MainMenuProvider(props) {
  const { children } = props;
  const [menuData, setMenu] = useState({
    mainMenu: [],
  });
  const { connectionStatus, isNavigatorOnline } = useConnection();

  useEffect(() => {
    getMenu(setMenu);
  }, [connectionStatus, isNavigatorOnline]);

  return <MainMenuContext.Provider value={menuData}>{children}</MainMenuContext.Provider>;
}

function getMenu(setMenuData) {
  getMenuApi().then(async (response) => {
    if (response.status === 200) {
      const arrayMenu = [];
      response.menu &&
        response.menu.forEach((item) => {
          item.active && arrayMenu.push(item);
        });
      await setMenuData({
        mainMenu: arrayMenu,
      });
    } else {
      console.log('MainMenu Error.');
    }
  });
}
