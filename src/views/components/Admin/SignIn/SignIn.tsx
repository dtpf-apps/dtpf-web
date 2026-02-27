import React, { memo } from 'react';
import { Layout, Tabs } from 'antd';
import { Navigate } from 'react-router';
import Logo from 'assets/img/png/logo256.png';
import './SignIn.scss';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import { getAccessTokenApi } from 'api/endpoints/auth/auth.api';

function SignIn() {
  const { Content } = Layout;

  if (getAccessTokenApi()) {
    return <Navigate to="/ad1988" replace />;
  }

  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">
          <img src={Logo} alt="David T. Pizarro Frick" />
        </h1>
        <div className="sign-in__content-tabs">
          <Tabs
            type="card"
            items={[
              { key: '1', label: 'Entrar', children: <LoginForm /> },
              { key: '2', label: 'Nuevo usuario', children: <RegisterForm /> },
            ]}
          />
        </div>
      </Content>
    </Layout>
  );
}

export default memo(SignIn);
