import React, { useState, useEffect } from 'react';
import { getLastMessageAPI } from 'api/endpoints/contact/contact.api';
import { Link, useLocation } from 'react-router';
import { Layout, Menu, Tag, message } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  MenuOutlined,
  ChromeOutlined,
  MessageOutlined,
  ReadOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import './MenuSider.scss';
import addNotification from 'react-push-notification';
import sound from 'assets/audio/sound.mp3';
import soundOGG from 'assets/audio/sound.ogg';

function MenuSider({ menuCollapsed, messagesUnreadLength }: any) {
  const location = useLocation();
  return (
    <RenderMenuSider
      messagesUnreadLength={messagesUnreadLength}
      menuCollapsed={menuCollapsed}
      location={location}
    />
  );
}

interface IRenderMenuSiderProps {
  messagesUnreadLength: number;
  menuCollapsed: boolean;
  location: any;
}

function RenderMenuSider({ messagesUnreadLength, menuCollapsed, location }: IRenderMenuSiderProps) {
  const [newMessage, setNewMessage] = useState(messagesUnreadLength);
  useEffect(() => {
    let isMounted = true;
    if (messagesUnreadLength !== undefined) {
      isMounted && setNewMessage(messagesUnreadLength);
    }
    return () => {
      isMounted = false;
    };
  }, [newMessage, messagesUnreadLength]);
  return (
    <NextRender
      menuCollapsed={menuCollapsed}
      location={location}
      messagesUnreadLength={messagesUnreadLength}
      newMessage={newMessage}
    />
  );
}

interface INextRenderProps {
  menuCollapsed: boolean;
  location: any;
  messagesUnreadLength: number;
  newMessage: number;
}

function NextRender({ menuCollapsed, location, messagesUnreadLength, newMessage }: INextRenderProps) {
  const { Sider } = Layout;

  const playSound = () => {
    const a: any = document.getElementById('sound');
    a.play();
  };

  useEffect(() => {
    getLastMessageAPI().then(({ data }) => {
      if (data.email) {
        if (newMessage && messagesUnreadLength && newMessage < messagesUnreadLength) {
          message.success(`Mensaje de ${data.email}`, 5);
          addNotification({
            title: `Mensaje de ${data.email}`,
            native: true,
            duration: 5000,
          });
          playSound();
        }
      }
    });
  }, [messagesUnreadLength, newMessage]);

  const menuItems: MenuProps['items'] = [
    {
      key: '/ad1988',
      icon: <HomeOutlined />,
      label: <Link to="/ad1988">Home</Link>,
    },
    {
      key: '/ad1988/menu',
      icon: <MenuOutlined />,
      label: <Link to="/ad1988/menu">Menú</Link>,
    },
    {
      key: 'ad1988/contact-messages',
      icon: <MessageOutlined />,
      label: (
        <Link to="/ad1988/contact-messages">
          Mensajes
          {messagesUnreadLength > 0 && <Tag className="admin-sider__tag">{messagesUnreadLength}</Tag>}
        </Link>
      ),
    },
    {
      key: 'ad1988/education',
      icon: <ReadOutlined />,
      label: <Link to="/ad1988/education">Formación</Link>,
    },
    {
      key: 'ad1988/about-me',
      icon: <SmileOutlined />,
      label: <Link to="/ad1988/about-me">Sobre Mi</Link>,
    },
    {
      key: '/',
      icon: <ChromeOutlined />,
      label: <Link to="/">Web</Link>,
    },
  ];

  return (
    <>
      <Sider collapsible collapsedWidth="0" breakpoint="lg" className="admin-sider" collapsed={menuCollapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]} items={menuItems} />
      </Sider>
      <audio id="sound" preload="auto">
        <source src={sound} type="audio/mp3" />
        <source src={soundOGG} type="audio/ogg" />
        <embed hidden={true} src={sound} />
      </audio>
    </>
  );
}

export default MenuSider;
