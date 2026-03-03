import React, { memo } from 'react';
import { Button } from 'antd';
import Logo from 'assets/img/png/logo128.png';
import { URL } from 'config/url';
import { MenuUnfoldOutlined, MenuFoldOutlined, PoweroffOutlined } from '@ant-design/icons';
import './MenuTop.scss';
import { useDauth } from 'dauth-context-react';

interface IMenuTopProps {
  menuCollapsed: boolean;
  setMenuCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuTop({ menuCollapsed, setMenuCollapsed }: IMenuTopProps) {
  const { logout } = useDauth();
  const logoutUser = () => {
    logout();
  };

  const reload = () => {
    window.location.href = URL + 'ad1988';
  };

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
        <Button type="link" onClick={logoutUser}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}

export default memo(MenuTop);
