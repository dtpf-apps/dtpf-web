import { createContext } from 'react';
import initialContactState from './initialContactState';

const ContactContext = createContext(initialContactState);

export default ContactContext;
