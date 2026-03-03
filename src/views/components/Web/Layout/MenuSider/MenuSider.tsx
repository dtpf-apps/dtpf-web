import React from 'react';
import { Link, useLocation } from 'react-router';
import { useDauth } from 'dauth-context-react';
import GetMainMenu from 'dbIndexed/mainMenu/GetMainMenu';
import SocialLinks from 'views/components/Web/SocialLinks';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import './MenuSider.scss';

function MenuSider(props: any) {
  const { menuCollapsed, setMenuCollapsed } = props;
  const location = useLocation();
  const menu = GetMainMenu();
  return (
    <RenderMenuSider
      menuCollapsed={menuCollapsed}
      setMenuCollapsed={setMenuCollapsed}
      location={location}
      mainMenu={menu}
    />
  );
}

function RenderMenuSider(props: any) {
  const { menuCollapsed, setMenuCollapsed, location, mainMenu } = props;
  const { Sider } = Layout;
  const { user } = useDauth();

  const menuItems: MenuProps['items'] = [
    { key: '/', label: <Link to="/">Inicio</Link>, className: 'menu-sider-web__item' },
    ...(mainMenu
      ? mainMenu.map((item: any) => {
          const external = item.url.indexOf('http') > -1;
          return {
            key: item.url,
            className: 'menu-sider-web__item',
            label: external ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            ) : (
              <Link to={item.url}>{item.title}</Link>
            ),
          };
        })
      : []),
    ...(user?.role === 'admin'
      ? [{ key: 'admin', label: <Link to="/ad1988">Admin</Link>, className: 'menu-sider-web__item' }]
      : []),
  ];

  return (
    <Sider
      collapsible
      collapsedWidth="0"
      breakpoint="lg"
      className="menu-sider-web"
      collapsed={menuCollapsed}
      onClick={() => setMenuCollapsed(!menuCollapsed)}
    >
      <Menu selectedKeys={[location.pathname]} mode="vertical" items={menuItems} />
      <div className="menu-sider-web__item-social-sider">
        <SocialLinks />
      </div>
    </Sider>
  );
}

export default MenuSider;
