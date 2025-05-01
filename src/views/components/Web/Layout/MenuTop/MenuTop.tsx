import React, { useContext } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { AuthContext } from 'providers/AuthProvider';
import GetMainMenu from 'dbIndexed/mainMenu/GetMainMenu';
import { gaEvent } from 'utils/analytics';
import { Menu, Button } from 'antd';
import Logo from 'assets/img/png/logo128.png';
import { MenuOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './MenuTop.scss';

function MenuTop(props: any) {
  const { menuCollapsed, setMenuCollapsed, location } = props;
  const menu = GetMainMenu();
  return (
    <RenderMenu menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} location={location} mainMenu={menu} />
  );
}

function RenderMenu(props: any) {
  const { menuCollapsed, setMenuCollapsed, location, mainMenu } = props;
  const { user } = useContext(AuthContext);
  const clickMenuIcon = () => {
    gaEvent('click_menu_mobile_icon', 'clicks', 'UI Clicks', true);
  };
  return (
    <Menu selectedKeys={[location.pathname]} className="menu-top-web" mode="horizontal">
      <NavLink to={'/'} className="menu-top-web__logo">
        <img src={Logo} alt="Logo de David T. Pizarro Frick" />
      </NavLink>
      <Menu.Item key={'/'} className="menu-top-web__item">
        <NavLink to={'/'}>Inicio</NavLink>
      </Menu.Item>
      {mainMenu &&
        mainMenu.map((item: any) => {
          const external = item.url.indexOf('http') > -1 ? true : false;
          if (external) {
            return (
              <Menu.Item key={item.url} className="menu-top-web__item">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </Menu.Item>
            );
          }
          return (
            <Menu.Item key={item.url} className="menu-top-web__item">
              <NavLink to={item.url}>{item.title}</NavLink>
            </Menu.Item>
          );
        })}
      {user?.role === 'admin' && (
        <Menu.Item key={'admin'} className="menu-top-web__item">
          <NavLink to={'/ad1988'}>Admin</NavLink>
        </Menu.Item>
      )}
      <div>
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
    </Menu>
  );
}

export default withRouter(MenuTop);
