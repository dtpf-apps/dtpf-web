import React, { useState, Suspense, lazy, memo } from 'react';
import { Navigate, Outlet } from 'react-router';
import { Layout, Tag } from 'antd';
import useAuth from 'hooks/useAuth';
import useConnection from '../../hooks/useConnection';
import useMessagesUnreadLength from 'webSockets/hooks/useMessagesUnreadLength';
import { Notifications } from 'react-push-notification';
import { StopOutlined } from '@ant-design/icons';
import './LayoutAdmin.scss';
const MenuTop = lazy(() => import('views/components/Admin/MenuTop'));
const MenuSider = lazy(() => import('views/components/Admin/MenuSider'));

function LayoutAdmin() {
  const { connectionStatus, isNavigatorOnline } = useConnection();
  const { user, isLoading } = useAuth();
  if (!user && !isLoading) {
    return <Navigate to="/ad1988/login" replace />;
  }
  if (user && !isLoading) {
    return (
      <>
        <RenderLayoutAdmin connectionStatus={connectionStatus} />
        {(!isNavigatorOnline || connectionStatus === 500) && (
          <Tag className="offline-message" icon={<StopOutlined />}>
            Offline
          </Tag>
        )}
      </>
    );
  }
  return null;
}

export default memo(LayoutAdmin);

function RenderLayoutAdmin(props: any) {
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const messagesUnreadLength = useMessagesUnreadLength();
  const { Header, Content, Footer } = Layout;
  const closeMenu = () => {
    !menuCollapsed && setMenuCollapsed(true);
  };
  return (
    <Layout onClick={closeMenu}>
      <Notifications />
      <Suspense fallback={<></>}>
        <MenuSider menuCollapsed={menuCollapsed} messagesUnreadLength={messagesUnreadLength} />
        <Layout className="layout-admin">
          <Header className="layout-admin__header">
            <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
          </Header>
          <Content className="layout-admin__content">
            <Outlet />
          </Content>
          <Footer className="layout-admin__footer">David T. Pizarro Frick</Footer>
        </Layout>
      </Suspense>
    </Layout>
  );
}
