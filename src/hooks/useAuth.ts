import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => useContext(AuthContext);
