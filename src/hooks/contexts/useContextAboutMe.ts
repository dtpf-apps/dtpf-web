import { useContext } from 'react';
import AboutMeContext from 'contexts/aboutMe/AboutMeContext';

export default function useContextAboutMe() {
  const context = useContext(AboutMeContext);
  if (context === undefined) {
    throw new Error('useContextAboutMe must be used within an AboutMeProvider');
  }
  return context;
}
