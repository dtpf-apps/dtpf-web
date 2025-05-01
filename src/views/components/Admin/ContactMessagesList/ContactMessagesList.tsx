import React, { useState, useEffect, memo } from 'react';
import { Switch, List, Button, Modal as ModalDelete, message as messageAnt } from 'antd';
import Modal from 'views/components/UI/Modal';
import useMessagesStatus from 'hooks/useMessagesStatus';
import { getMessagesUnreadApi, checkMessageApi, deleteContactMessageApi } from 'api/contact';
import { reloadMessagesApi } from 'api/utils';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import './ContactMessagesList.scss';
import moment from 'moment';
import 'moment/locale/es';
import { getAccessTokenApi } from 'api/endpoints/auth/auth.api';
const { confirm } = ModalDelete;

interface IContactMessagesListProps {
  reloadMessages: boolean;
  setReloadMessages: React.Dispatch<React.SetStateAction<boolean>>;
}

function ContactMessagesList({ reloadMessages, setReloadMessages }: IContactMessagesListProps) {
  const [viewMessagesUnread, setViewMessagesUnread] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle] = useState('');
  const [modalContent] = useState(null);
  const { messagesStatus, setMessagesStatus } = useMessagesStatus();
  const [messagesUnread, setMessagesUnread] = useState([]);
  const [messagesRead, setMessagesRead] = useState([]);
  const token = getAccessTokenApi();

  useEffect(() => {
    let isMounted = true;
    reloadMessagesApi(false).then(() => {
      if (isMounted) {
        setReloadMessages(false);
        setMessagesStatus(false);
      }
    });
    getMessagesUnreadApi(token, false).then((response) => {
      isMounted && setMessagesUnread(response.messages);
    });
    getMessagesUnreadApi(token, true).then((response) => {
      isMounted && setMessagesRead(response.messages);
    });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesStatus, reloadMessages]);

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
        <MessagesUnread messagesUnread={messagesUnread} setReloadMessages={setReloadMessages} />
      ) : (
        <MessagesRead messagesRead={messagesRead} setReloadMessages={setReloadMessages} />
      )}
      <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

interface IMessagesUnreadProps {
  messagesUnread: any[];
  setReloadMessages: React.Dispatch<React.SetStateAction<boolean>>;
}

function MessagesUnread({ messagesUnread, setReloadMessages }: IMessagesUnreadProps) {
  return (
    <List
      className="messages-unread"
      itemLayout="horizontal"
      dataSource={messagesUnread}
      renderItem={(message: any) => <MessageUnread message={message} setReloadMessages={setReloadMessages} />}
    />
  );
}

interface IMessageUnreadProps {
  message: any;
  setReloadMessages: React.Dispatch<React.SetStateAction<boolean>>;
}

function MessageUnread({ message, setReloadMessages }: IMessageUnreadProps) {
  const checkMessage = () => {
    const accessToken = getAccessTokenApi();
    reloadMessagesApi(true).then(() => {
      checkMessageApi(accessToken, message._id, true)
        .then((response) => {
          messageAnt.success(response.message);
          setReloadMessages(true);
        })
        .catch((err) => {
          messageAnt.error(err.message);
        });
    });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={checkMessage}>
          <CheckOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={`${message.name ? message.name : 'Anónimo'} - Hace ${message && moment(message.date).fromNow(true)}`}
        description={
          <div>
            <em>{message.email}</em>
            <div>{message.phone_number}</div>
            {message.subject !== 'Sin asunto' && message.subject && <div>Asunto: {message.subject}</div>}
            <p>{message.message}</p>
          </div>
        }
      />
    </List.Item>
  );
}

interface IMessagesReadProps {
  messagesRead: any[];
  setReloadMessages: React.Dispatch<React.SetStateAction<boolean>>;
}

function MessagesRead({ messagesRead, setReloadMessages }: IMessagesReadProps) {
  return (
    <List
      className="messages-read"
      itemLayout="horizontal"
      dataSource={messagesRead}
      renderItem={(message: any) => <MessageRead message={message} setReloadMessages={setReloadMessages} />}
    />
  );
}

interface IMessageReadProps {
  message: any;
  setReloadMessages: React.Dispatch<React.SetStateAction<boolean>>;
}

function MessageRead({ message, setReloadMessages }: IMessageReadProps) {
  const checkMessage = () => {
    const accessToken = getAccessTokenApi();
    checkMessageApi(accessToken, message._id, false)
      .then((response) => {
        messageAnt.success(response.message);
        setReloadMessages(true);
      })
      .catch((err) => {
        messageAnt.error(err.message);
      });
  };

  const showDeleteConfirm = () => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: 'Eliminando mensaje',
      content: `¿Estás seguro que quieres eliminar el mensaje de ${message.email}?`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        deleteContactMessageApi(accessToken, message._id)
          .then((response) => {
            if (response.status === 200) {
              messageAnt.success(response.message);
            } else {
              messageAnt.warning(response.message);
            }
            setReloadMessages(true);
          })
          .catch((err) => {
            messageAnt.error(err.message);
          });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={checkMessage}>
          <CheckOutlined />
        </Button>,
        <Button type="primary" danger onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={`${message.name ? message.name : 'Anónimo'} - Hace ${message && moment(message.date).fromNow(true)}`}
        description={
          <div>
            <em>{message.email}</em>
            <div>{message.phone_number}</div>
            {message.subject !== 'Sin asunto' && message.subject && <div>Asunto: {message.subject}</div>}
            <p>{message.message}</p>
          </div>
        }
      />
    </List.Item>
  );
}

export default memo(ContactMessagesList);
