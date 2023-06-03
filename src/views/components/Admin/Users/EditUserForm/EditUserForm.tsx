import React, { useState, useEffect, useCallback } from "react";
import { Avatar, Form, Input, Select, Button, Row, Col, notification } from "antd";
import { useDropzone } from "react-dropzone";
import NoAvatar from "assets/img/png/no-avatar.png";
import { updateUserApi, uploadAvatarApi, getAvatarApi } from "api/user";
import { getAccessTokenApi } from "api/auth";
import { notifDelay, notifDelayErr } from "utils/notifications";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./EditUserForm.scss";

export default function EditUserForm(props: any) {
  const { user, setIsVisibleModal, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});
  let avatarType: any = avatar;
  useEffect(() => {
    setUserData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    })
  }, [user]);
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then(response => {
        setAvatar(response.url);
      })
    } else {
      setAvatar(null);
    }
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
    acceptedFiles => {
      const file = acceptedFiles[0];
      if (file === undefined) {
        notification["error"]({
          message: "Formato de imágen inválido.",
          duration: notifDelay
        });
      } else {
        setAvatar({ file, preview: URL.createObjectURL(file) });
      }
    }, [setAvatar]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
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

function EditForm(props: any) {
  const { user, userData, setUserData, setIsVisibleModal, setReloadUsers } = props;
  const { Option } = Select;
  const updateUser = () => {
    const token = getAccessTokenApi();
    let userUpdate = userData;
    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales.",
          duration: notifDelay
        })
        return;
      } else {
        delete userUpdate.repeatPassword;
      }
    }
    if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
      notification["error"]({
        message: "El nombre, apellidos y email son obligatorios.",
        duration: notifDelay
      })
      return;
    }
    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id)
        .then(response => {
          userUpdate.avatar = response.avatarName;
          if (response.avatarName !== undefined) {
            updateUserApi(token, userUpdate, user._id).then(result => {
              if (result.status === 200) {
                notification["success"]({
                  message: result.message,
                  duration: notifDelay
                });
                setIsVisibleModal(false);
                setReloadUsers(true);
              } else {
                notification["error"]({
                  message: result.message,
                  duration: notifDelayErr
                });
                notification["success"]({
                  message: "Avatar cambiado corretamente.",
                  duration: notifDelay
                });
                setReloadUsers(true);
              }
            });
          } else {
            notification["error"]({
              message: "Extensiones admitidas: (.jpg, .jpeg, .png)",
              duration: notifDelay
            });
            setIsVisibleModal(false);
          }
        });
    } else {
      updateUserApi(token, userUpdate, user._id)
        .then(result => {
          if (result.status === 200) {
            notification["success"]({
              message: result.message,
              duration: notifDelay
            });
            setIsVisibleModal(false);
            setReloadUsers(true);
          } else {
            notification["error"]({
              message: result.message,
              duration: notifDelay
            });
          }
        });
    }
  };
  return (
    <Form className="form-edit" onFinish={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Apellidos"
              value={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
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
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
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
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Repetir Contraseña"
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
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
