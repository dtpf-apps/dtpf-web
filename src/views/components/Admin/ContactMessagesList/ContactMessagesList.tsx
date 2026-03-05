import React, { useState, useEffect, memo } from 'react';
import { Switch, List, Button, Modal as ModalDelete } from 'antd';
import useContextContact from 'hooks/contexts/useContextContact';
import { IContactMessage } from 'api/endpoints/contact/contact.response.interface';
import { reloadMessagesAPI, messagesStatusAPI } from 'api/endpoints/contact/contact.api';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import './ContactMessagesList.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';

dayjs.extend(relativeTime);
dayjs.locale('es');
const { confirm } = ModalDelete;

function ContactMessagesList() {
  const { unreadMessages, readMessages, loadMessages, checkMessage, deleteMessage } = useContextContact();
  const [viewMessagesUnread, setViewMessagesUnread] = useState(true);

  // Load messages on mount and poll for new ones
  useEffect(() => {
    reloadMessagesAPI({ haveToReload: false });
    loadMessages();

    const interval = setInterval(async () => {
      const statusFetch = await messagesStatusAPI();
      if (statusFetch.response.status === 200 && statusFetch.data.messagesStatus) {
        loadMessages();
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="messages-contact">
      <div className="messages-contact__header">
        <div className="messages-contact__switch">
          <Switch
            title="Mostrar Leídos"
            size="default"
            defaultChecked
            onChange={() => setViewMessagesUnread(!viewMessagesUnread)}
          />
          <span>{viewMessagesUnread ? 'No leídos' : 'Leídos'}</span>
        </div>
      </div>
      {viewMessagesUnread ? (
        <MessagesUnread messages={unreadMessages} checkMessage={checkMessage} />
      ) : (
        <MessagesRead messages={readMessages} checkMessage={checkMessage} deleteMessage={deleteMessage} />
      )}
    </div>
  );
}

function MessagesUnread({
  messages,
  checkMessage,
}: {
  messages: IContactMessage[];
  checkMessage: (messageId: string, readed: boolean) => Promise<boolean>;
}) {
  return (
    <List
      className="messages-unread"
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(msg: IContactMessage) => (
        <List.Item
          actions={[
            <Button type="primary" onClick={() => checkMessage(msg._id, true)}>
              <CheckOutlined />
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={`${msg.name || 'Anónimo'} - Hace ${dayjs(msg.date).fromNow(true)}`}
            description={
              <div>
                <em>{msg.email}</em>
                <div>{msg.phone_number}</div>
                {msg.subject !== 'Sin asunto' && msg.subject && <div>Asunto: {msg.subject}</div>}
                <p>{msg.message}</p>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
}

function MessagesRead({
  messages,
  checkMessage,
  deleteMessage,
}: {
  messages: IContactMessage[];
  checkMessage: (messageId: string, readed: boolean) => Promise<boolean>;
  deleteMessage: (messageId: string) => Promise<boolean>;
}) {
  const handleDelete = (msg: IContactMessage) => {
    confirm({
      title: 'Eliminando mensaje',
      content: `¿Estás seguro que quieres eliminar el mensaje de ${msg.email}?`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        deleteMessage(msg._id);
      },
    });
  };

  return (
    <List
      className="messages-read"
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(msg: IContactMessage) => (
        <List.Item
          actions={[
            <Button type="primary" onClick={() => checkMessage(msg._id, false)}>
              <CheckOutlined />
            </Button>,
            <Button type="primary" danger onClick={() => handleDelete(msg)}>
              <DeleteOutlined />
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={`${msg.name || 'Anónimo'} - Hace ${dayjs(msg.date).fromNow(true)}`}
            description={
              <div>
                <em>{msg.email}</em>
                <div>{msg.phone_number}</div>
                {msg.subject !== 'Sin asunto' && msg.subject && <div>Asunto: {msg.subject}</div>}
                <p>{msg.message}</p>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
}

export default memo(ContactMessagesList);
