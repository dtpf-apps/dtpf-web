import React, { memo } from "react";
import { logout } from "api/auth";
import { Button } from "antd";
import Logo from "assets/img/png/logo128.png";
import { URL } from "config/url";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import "./MenuTop.scss";

function MenuTop(props: any) {
  const { menuCollapsed, setMenuCollapsed } = props;
  const logoutUser = () => {
    logout();
    window.location.reload();
  };
  const reload = () => {
    window.location.href = URL + "ad1988";
  };
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={Logo}
          alt="David T. Pizarro Frick"
          onClick={reload}
        />
        <div className="menu-top__left-button">
          <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
            {React.createElement(
              menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined
            )}
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