import React, { useState, useEffect, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import { getAccessTokenApi, getRefreshTokenApi, refreshAccessTokenApi, logout } from 'api/endpoints/auth/auth.api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'utils/constants';

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export async function checkUserLogin(setUser) {
  const accessToken = getAccessTokenApi();
  if (!accessToken) {
    const refreshToken = getRefreshTokenApi();
    if (!refreshToken) {
      logout();
      setUser({
        user: null,
        isLoading: false,
      });
    } else {
      const refresh = await refreshAccessTokenApi({ refreshToken });
      if (refresh.response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, refresh.data.accessToken);
        localStorage.setItem(REFRESH_TOKEN, refresh.data.refreshToken);
      } else {
        logout();
        setUser({
          user: null,
          isLoading: false,
        });
      }
    }
  } else {
    setUser({
      isLoading: false,
      user: jwtDecode(accessToken),
    });
  }
}
