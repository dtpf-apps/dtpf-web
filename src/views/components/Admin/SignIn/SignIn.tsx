import React, { useEffect, memo } from 'react';
import { Navigate } from 'react-router';
import { useDauth } from 'dauth-context-react';
import { Spin } from 'antd';

function SignIn() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useDauth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/ad1988" replace />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin size="large" />
    </div>
  );
}

export default memo(SignIn);
