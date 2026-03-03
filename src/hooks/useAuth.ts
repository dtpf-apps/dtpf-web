import { useDauth } from 'dauth-context-react';

export default function useAuth() {
  const { user, isLoading, isAuthenticated } = useDauth();
  return { user, isLoading, isAuthenticated };
}
