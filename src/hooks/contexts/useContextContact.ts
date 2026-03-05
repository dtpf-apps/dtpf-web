import { useContext } from 'react';
import ContactContext from 'contexts/contact/ContactContext';

export default function useContextContact() {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContextContact must be used within a ContactProvider');
  }
  return context;
}
