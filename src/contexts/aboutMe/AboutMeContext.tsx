import { createContext } from 'react';
import initialAboutMeState from './initialAboutMeState';

const AboutMeContext = createContext(initialAboutMeState);

export default AboutMeContext;
