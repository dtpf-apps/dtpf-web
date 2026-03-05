import { useContext } from 'react';
import ConnectionContext from 'contexts/connection/ConnectionContext';

export default function useConnection() {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error('useConnection must be used within a ConnectionProvider');
  }
  return context;
}
