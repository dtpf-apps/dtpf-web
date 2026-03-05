import { createContext } from 'react';
import { IInitialConnectionState } from 'interfaces/connection.interface';

const ConnectionContext = createContext<IInitialConnectionState | undefined>(undefined);

export default ConnectionContext;
