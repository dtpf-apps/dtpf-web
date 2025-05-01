import { useContext } from 'react';
import { ConnectionContext } from '../providers/ConnectionProvider';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => useContext(ConnectionContext);
