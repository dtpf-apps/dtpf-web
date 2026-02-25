import React, { useState, useEffect, useCallback, memo } from 'react';
import { Avatar, Form, Input, Select, Button, Row, Col, notification } from 'antd';
import { useDropzone } from 'react-dropzone';
import NoAvatar from 'assets/img/png/no-avatar.png';
import { notifDelay, notifDelayErr } from 'utils/notifications';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './EditUserForm.scss';
import { getAccessTokenApi } from 'api/endpoints/auth/auth.api';
import { getAvatarAPI, updateUserAPI, uploadAvatarAPI } from 'api/endpoints/user/user';
import { IUserResponse } from 'api/endpoints/user/user.response.interface';

interface IEditUserFormProps {
  user: IUserResponse;
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditUserForm({ user, setIsVisibleModal, setReloadUsers }: IEditUserFormProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [userData, setUserData] = useState<Partial<IUserResponse & { password: string; repeatPassword: string }>>({
    name: '',
    lastname: '',
    email: '',
    role: 'admin',
    avatar: '',
    password: '',
    repeatPassword: '',
  });
  let avatarType: any = avatar;

  console.log({ userData });

  // useEffect(() => {
  //   setUserData({
  //     ...userData,
  //     name: user.name,
  //     lastname: user.lastname,
  //     email: user.email,
  //     role: user.role,
  //     avatar: user.avatar,
  //   });
  // }, [user]);

  useEffect(() => {
    let IsMounted = true;
    (async () => {
      if (!IsMounted || !user.avatar) return;
      try {
        const getAvatar = await getAvatarAPI({ avatar: user.avatar });
        if (getAvatar.response?.status === 200) {
          setAvatar(getAvatar.response.url);
        }
      } catch (error) {
        console.error('Error al obtener el avatar', error);
      }
    })();
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatarType.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        user={user}
        userData={userData}
        setUserData={setUserData}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
}

function UploadAvatar(props: any) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);
  let avatarType: any = avatarUrl;

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file === undefined) {
        notification['error']({
          message: 'Formato de imágen inválido.',
          duration: notifDelay,
        });
      } else {
        setAvatar({ file, preview: URL.createObjectURL(file) });
      }
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarType ? avatarType : NoAvatar} />
      )}
    </div>
  );
}

interface IEditFormProps {
  user: IUserResponse;
  userData: Partial<IUserResponse & { password: string; repeatPassword: string }>;
  setUserData: React.Dispatch<
    React.SetStateAction<Partial<IUserResponse & { password: string; repeatPassword: string }>>
  >;
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditForm({ user, userData, setUserData, setIsVisibleModal, setReloadUsers }: IEditFormProps) {
  const { Option } = Select;
  const [form] = Form.useForm();

  const updateUser = async () => {
    const token = getAccessTokenApi();
    if (!token) return;
    let userUpdate = userData;
    // console.log(userUpdate.password, userUpdate.repeatPassword);
    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification['error']({
          message: 'Las contraseñas tienen que seeeer igualessssss.',
          duration: notifDelay,
        });
        return;
      } else {
        // delete userUpdate.repeatPassword;
      }
    }
    if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
      notification['error']({
        message: 'El nombre, apellidos y email son obligatorios.',
        duration: notifDelay,
      });
      return;
    }
    if (typeof userUpdate.avatar === 'object') {
      try {
        const uploadAvatar = await uploadAvatarAPI({ token, avatar: userUpdate.avatar, userId: user._id });
        if (uploadAvatar.response.status !== 200) return;
        userUpdate.avatar = uploadAvatar.data.avatarName;
        if (uploadAvatar.data.avatarName !== undefined) {
          updateUserAPI({ token, user: userUpdate, userId: user._id }).then((result) => {
            if (result.response.status === 200) {
              notification['success']({
                message: result.data.message,
                duration: notifDelay,
              });
              setIsVisibleModal(false);
              setReloadUsers(true);
            } else {
              notification['error']({
                message: result.data.message,
                duration: notifDelayErr,
              });
              notification['success']({
                message: 'Avatar cambiado corretamente.',
                duration: notifDelay,
              });
              setReloadUsers(true);
            }
          });
        } else {
          notification['error']({
            message: 'Extensiones admitidas: (.jpg, .jpeg, .png)',
            duration: notifDelay,
          });
          setIsVisibleModal(false);
        }
      } catch (error) {
        notification['error']({
          message: 'Error al subir la imagen.',
          duration: notifDelay,
        });
        return;
      }
    } else {
      updateUserAPI({ token, user: userUpdate, userId: user._id }).then((result) => {
        if (result.response.status === 200) {
          notification['success']({
            message: result.data.message,
            duration: notifDelay,
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
        } else {
          notification['error']({
            message: result.data.message,
            duration: notifDelay,
          });
        }
      });
    }
  };

  return (
    <Form className="form-edit" onFinish={updateUser} form={form}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item initialValue={user.name}>
            <Input
              name="name"
              prefix={<UserOutlined />}
              placeholder="Nombre"
              defaultValue={user.name}
              // value={userData.name}
              // onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Apellidos"
              value={userData.lastname}
              onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Correo electrónico"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecciona un rol"
              onChange={(e) => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="revisor">Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Repetir Contraseña"
              onChange={(e) => setUserData({ ...userData, repeatPassword: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}

export default memo(EditUserForm);
