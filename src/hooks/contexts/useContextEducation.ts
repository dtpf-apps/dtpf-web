import { useContext } from 'react';
import EducationContext from 'contexts/education/EducationContext';

export default function useContextEducation() {
  const context = useContext(EducationContext);
  if (context === undefined) {
    throw new Error('useContextEducation must be used within an EducationProvider');
  }
  return context;
}
