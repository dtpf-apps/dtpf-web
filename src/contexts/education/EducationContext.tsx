import { createContext } from 'react';
import initialEducationState from './initialEducationState';

const EducationContext = createContext(initialEducationState);

export default EducationContext;
