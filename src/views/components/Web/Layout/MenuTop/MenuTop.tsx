import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from 'providers/AuthProvider';
import GetMainMenu from 'dbIndexed/mainMenu/GetMainMenu';
import { gaEvent } from 'utils/analytics';
import { Menu, Button } from 'antd';
import type { MenuProps } from 'antd';
import Logo from 'assets/img/png/logo128.png';
import { MenuOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './MenuTop.scss';

function MenuTop(props: any) {
  const { menuCollapsed, setMenuCollapsed } = props;
  const location = useLocation();
  const menu = GetMainMenu();
  return (
    <RenderMenu
      menuCollapsed={menuCollapsed}
      setMenuCollapsed={setMenuCollapsed}
      location={location}
      mainMenu={menu}
    />
  );
}

function RenderMenu(props: any) {
  const { menuCollapsed, setMenuCollapsed, location, mainMenu } = props;
  const { user } = useContext(AuthContext);
  const clickMenuIcon = () => {
    gaEvent('click_menu_mobile_icon', 'clicks', 'UI Clicks', true);
  };

  const menuItems: MenuProps['items'] = [
    { key: '/', label: <NavLink to="/">Inicio</NavLink>, className: 'menu-top-web__item' },
    ...(mainMenu
      ? mainMenu.map((item: any) => {
          const external = item.url.indexOf('http') > -1;
          return {
            key: item.url,
            className: 'menu-top-web__item',
            label: external ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            ) : (
              <NavLink to={item.url}>{item.title}</NavLink>
            ),
          };
        })
      : []),
    ...(user?.role === 'admin'
      ? [{ key: 'admin', label: <NavLink to="/ad1988">Admin</NavLink>, className: 'menu-top-web__item' }]
      : []),
  ];

  return (
    <div className="menu-top-web">
      <NavLink to="/" className="menu-top-web__logo">
        <img src={Logo} alt="Logo de David T. Pizarro Frick" />
      </NavLink>
      <Menu selectedKeys={[location.pathname]} mode="horizontal" items={menuItems} />
      <div>
        <Button
          type="link"
          className="menu-top-web__menu"
          onClick={() => {
            clickMenuIcon();
            setMenuCollapsed(!menuCollapsed);
          }}
        >
          {React.createElement(menuCollapsed ? MenuOutlined : CloseCircleOutlined)}
        </Button>
      </div>
    </div>
  );
}

export default MenuTop;
