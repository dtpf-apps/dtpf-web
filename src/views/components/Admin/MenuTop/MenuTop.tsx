import React, { memo } from 'react';
import { Button, Popover } from 'antd';
import Logo from 'assets/img/png/logo128.png';
import { URL } from 'config/url';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './MenuTop.scss';
import { useDauth } from 'dauth-context-react';

interface IMenuTopProps {
  menuCollapsed: boolean;
  setMenuCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuTop({ menuCollapsed, setMenuCollapsed }: IMenuTopProps) {
  const { user, logout, updateUserWithRedirect } = useDauth();

  const reload = () => {
    window.location.href = URL + 'ad1988';
  };

  const popoverContent = (
    <div className="menu-top__popover">
      <Button type="text" icon={<EditOutlined />} onClick={updateUserWithRedirect} block>
        Editar perfil
      </Button>
      <Button type="text" icon={<LogoutOutlined />} onClick={logout} danger block>
        Cerrar sesión
      </Button>
    </div>
  );

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img className="menu-top__left-logo" src={Logo} alt="David T. Pizarro Frick" onClick={reload} />
        <div className="menu-top__left-button">
          <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
            {React.createElement(menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button>
        </div>
      </div>
      <div className="menu-top__right">
        <Popover content={popoverContent} trigger="click" placement="bottomRight">
          <Button type="link" className="menu-top__right-user">
            <UserOutlined />
          </Button>
        </Popover>
      </div>
    </div>
  );
}

export default memo(MenuTop);
