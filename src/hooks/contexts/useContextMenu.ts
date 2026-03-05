import { useContext } from 'react';
import MenuContext from 'contexts/menu/MenuContext';

export default function useContextMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useContextMenu must be used within a MenuProvider');
  }
  return context;
}
