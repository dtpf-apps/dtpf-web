import React, { useState, Suspense, lazy, memo } from "react";
import { Route, Redirect } from "react-router-dom";
import { Layout, Tag } from "antd";
import useAuth from "hooks/useAuth";
import useConnection from "../../hooks/useConnection";
import useMessagesUnreadLength from "webSockets/hooks/useMessagesUnreadLength";
import AdminSignIn from "../pages/Admin/SignIn";
import { Notifications } from "react-push-notification";
import { StopOutlined } from "@ant-design/icons";
import "./LayoutAdmin.scss";
const MenuTop = lazy(() => import("views/components/Admin/MenuTop"));
const MenuSider = lazy(() => import("views/components/Admin/MenuSider"));
const LoadRoutes = lazy(() => import("providers/LoadRoutes"));

function LayoutAdmin(props: any) {
  const { routes } = props;
  const { connectionStatus, isNavigatorOnline } = useConnection();
  const { user, isLoading } = useAuth();
  if (!user && !isLoading) {
    return (
      <>
        <Route path="/ad1988/login" component={AdminSignIn} />
        <Redirect to="/ad1988/login" />
      </>
    );
  }
  if (user && !isLoading) {
    return (
      <>
        <RenderLayoutAdmin
          routes={routes}
          connectionStatus={connectionStatus}
        />
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
  const { routes } = props;
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
        <MenuSider
          menuCollapsed={menuCollapsed}
          messagesUnreadLength={messagesUnreadLength}
        />
        <Layout className="layout-admin">
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            <LoadRoutes routes={routes && routes} />
          </Content>
          <Footer className="layout-admin__footer">
            David Thomas Pizarro Frick
          </Footer>
        </Layout>
      </Suspense>
    </Layout>
  );
}
