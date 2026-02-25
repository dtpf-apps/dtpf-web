import React, { useState, useEffect, memo } from 'react';
import { Switch, List, Avatar, Button, Modal as ModalDelete, notification } from 'antd';
import NoAvatar from 'assets/img/png/no-avatar.png';
import Modal from 'views/components/UI/Modal';
import EditUserForm from '../EditUserForm';
import AddUserForm from '../AddUserForm';
import { activateUserApi, deleteUserApi } from 'api/user';
import { notifDelay, notifDelayErr } from 'utils/notifications';
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import './ListUsers.scss';
import { getAccessTokenApi } from 'api/endpoints/auth/auth.api';
import { getAvatarAPI, getUsersAPI } from 'api/endpoints/user/user';
import { IUserResponse } from 'api/endpoints/user/user.response.interface';
const { confirm } = ModalDelete;

interface IListUsersProps {
  reloadUsers: boolean;
  setReloadUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

function ListUsers({ reloadUsers, setReloadUsers }: IListUsersProps) {
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);
  const [usersActive, setUsersActive] = useState<Array<IUserResponse>>([]);
  const [usersInactive, setUsersInactive] = useState<Array<IUserResponse>>([]);
  const token = getAccessTokenApi();

  useEffect(() => {
    let isMounted = true;
    if (!token || !isMounted) return;
    (async () => {
      try {
        const getUsers = await getUsersAPI({ token });
        if (getUsers.data.users.length > 0) {
          setUsersActive(getUsers.data.users.filter((user) => user.active === true));
          setUsersInactive(getUsers.data.users.filter((user) => user.active === false));
        }
      } catch (error) {
        notification['error']({
          message: 'Error al cargar los usuarios',
          duration: notifDelayErr,
        });
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [reloadUsers, token]);

  return (
    <div className="list-users">
      <RenderListUsers
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        setReloadUsers={setReloadUsers}
        usersActive={usersActive}
        usersInactive={usersInactive}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </div>
  );
}

interface IRenderListUsersProps {
  usersActive: IUserResponse[];
  usersInactive: IUserResponse[];
  setModalTitle: React.Dispatch<React.SetStateAction<string>>;
  setModalContent: React.Dispatch<React.SetStateAction<any>>;
  setReloadUsers: React.Dispatch<React.SetStateAction<boolean>>;
  modalTitle: string;
  modalContent: any;
}

function RenderListUsers({
  usersActive,
  usersInactive,
  setModalTitle,
  setModalContent,
  setReloadUsers,
  modalTitle,
  modalContent,
}: IRenderListUsersProps) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [viewUsersActive, setViewUsersActive] = useState(true);

  const addUserModal = () => {
    setIsVisibleModal(true);
    setModalTitle('Creando nuevo usuario');
    setModalContent(<AddUserForm setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />);
  };

  return (
    <>
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            title="Mostrar Usuarios"
            size="default"
            defaultChecked
            onChange={() => setViewUsersActive(!viewUsersActive)}
          />
          <span>{viewUsersActive ? 'Usuarios Activos' : 'Usuarios Inactivos'}</span>
        </div>
        <Button type="primary" onClick={addUserModal}>
          Nuevo Usuario
        </Button>
      </div>
      {viewUsersActive ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive usersInactive={usersInactive} setReloadUsers={setReloadUsers} />
      )}
      <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
        {modalContent}
      </Modal>
    </>
  );
}

interface IUsersActiveProps {
  usersActive: IUserResponse[];
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalTitle: React.Dispatch<React.SetStateAction<string>>;
  setModalContent: React.Dispatch<React.SetStateAction<any>>;
  setReloadUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

function UsersActive({
  usersActive,
  setIsVisibleModal,
  setModalTitle,
  setModalContent,
  setReloadUsers,
}: IUsersActiveProps) {
  const editUser = (user: any) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar ${user.name ? user.name : '...'} ${user.lastname ? user.lastname : '...'}`);
    setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />);
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => <UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers} />}
    />
  );
}

interface IUserActiveProps {
  user: IUserResponse;
  editUser: (user: any) => void;
  setReloadUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserActive({ user, editUser, setReloadUsers }: IUserActiveProps) {
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (!isMounted || !user.avatar) return;
      try {
        const getAvatar = await getAvatarAPI({ avatar: user.avatar });
        if (getAvatar.response?.status === 200) {
          setAvatar(getAvatar.response.url);
        }
      } catch (error) {
        console.log('Error al obtener el avatar', error);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const deactivateUser = () => {
    const accessToken = getAccessTokenApi();
    if (user.email === 'davidpizarrofrick@gmail.com') {
      notification['error']({
        message: '¡Usuario protegido!',
        duration: notifDelayErr,
      });
    } else {
      activateUserApi(accessToken, user._id, false)
        .then((response) => {
          notification['success']({
            message: response.message,
            duration: notifDelay,
          });
          setReloadUsers(true);
        })
        .catch((err) => {
          notification['error']({
            message: err.message,
            duration: notifDelayErr,
          });
        });
    }
  };

  const showDeleteConfirm = () => {
    const accessToken = getAccessTokenApi();
    if (user.email === 'davidpizarrofrick@gmail.com') {
      notification['error']({
        message: '¡Usuario protegido!',
        duration: notifDelayErr,
      });
    } else {
      confirm({
        title: 'Eliminando usuario',
        content: `¿Estás seguro que quieres eliminar a ${user.email}?`,
        okText: 'Eliminar',
        okType: 'danger',
        cancelText: 'Cancelar',
        onOk() {
          deleteUserApi(accessToken, user._id)
            .then((response) => {
              notification['success']({
                message: response.message,
                duration: notifDelay,
              });
              setReloadUsers(true);
            })
            .catch((err) => {
              notification['error']({
                message: err.message,
                duration: notifDelayErr,
              });
            });
        },
      });
    }
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUser(user)}>
          <EditOutlined />
        </Button>,
        <Button type="primary" danger onClick={deactivateUser}>
          <StopOutlined />
        </Button>,
        <Button type="primary" danger onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
          ${user.name ? user.name : '...'} 
          ${user.lastname ? user.lastname : '...'}
        `}
        description={user.email}
      />
    </List.Item>
  );
}

interface IUsersInactiveProps {
  usersInactive: IUserResponse[];
  setReloadUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

function UsersInactive({ usersInactive, setReloadUsers }: IUsersInactiveProps) {
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => <UserInactive user={user} setReloadUsers={setReloadUsers} />}
    />
  );
}

interface IUserInactiveProps {
  user: IUserResponse;
  setReloadUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserInactive({ user, setReloadUsers }: IUserInactiveProps) {
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (!isMounted || !user.avatar) return;
      try {
        const getAvatar = await getAvatarAPI({ avatar: user.avatar });
        if (getAvatar.response?.status === 200) {
          setAvatar(getAvatar.response.url);
        }
      } catch (error) {
        console.log('Error al obtener el avatar', error);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const activateUser = () => {
    const accessToken = getAccessTokenApi();
    activateUserApi(accessToken, user._id, true)
      .then((response) => {
        notification['success']({
          message: response.message,
          duration: notifDelay,
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification['error']({
          message: err.message,
          duration: notifDelayErr,
        });
      });
  };

  const showDeleteConfirm = () => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: 'Eliminando usuario',
      content: `¿Estás seguro que quieres eliminar a ${user.email}?`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        deleteUserApi(accessToken, user._id)
          .then((response) => {
            notification['success']({
              message: response.message,
              duration: notifDelay,
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification['error']({
              message: err.message,
              duration: notifDelayErr,
            });
          });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={activateUser}>
          <CheckOutlined />
        </Button>,
        <Button type="primary" danger onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
              ${user.name ? user.name : '...'} 
              ${user.lastname ? user.lastname : '...'}
            `}
        description={user.email}
      />
    </List.Item>
  );
}

export default memo(ListUsers);
