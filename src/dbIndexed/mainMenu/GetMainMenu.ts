import { useState, useEffect } from 'react';
import useContextMenu from '../../hooks/contexts/useContextMenu';
import useGetMainMenuDBIndexed from './useGetMainMenuDBIndexed';
import useConnection from '../../hooks/useConnection';

// If connection is ok show database data else show indexed database data
export default function GetMainMenu() {
  const { connectionStatus, isNavigatorOnline } = useConnection();
  const { activeMenus } = useContextMenu();
  const { mainMenuIndexed } = useGetMainMenuDBIndexed();
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    connectionStatus === 500 || !isNavigatorOnline ? setMenu(mainMenuIndexed) : setMenu(activeMenus as any);
  }, [connectionStatus, isNavigatorOnline, mainMenuIndexed, activeMenus]);
  return menu;
}
