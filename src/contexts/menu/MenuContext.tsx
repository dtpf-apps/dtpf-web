import { createContext } from 'react';
import initialMenuState from './initialMenuState';

const MenuContext = createContext(initialMenuState);

export default MenuContext;
