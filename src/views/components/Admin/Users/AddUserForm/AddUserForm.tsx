import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { signUpAdminApi } from "api/user";
import { notifDelay, notifDelayErr } from "utils/notifications";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined
} from "@ant-design/icons";

import "./AddUserForm.scss";
import { getAccessTokenApi } from "api/endpoints/auth/auth.api";

interface IAddUserFormProps {
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddUserForm({ setIsVisibleModal, setReloadUsers }: IAddUserFormProps) {
  const [userData, setUserData] = useState({});

  return (
    <div className="add-user-form">
      <AddForm
        userData={userData}
        setUserData={setUserData}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
}

export default AddUserForm;

interface IAddFormProps {
  userData: any;
  setUserData: (userData: any) => void;
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddForm({ userData, setUserData, setIsVisibleModal, setReloadUsers }: IAddFormProps) {
  const { Option } = Select;

  const addUser = () => {
    if (
      !userData.name ||
      !userData.lastname ||
      !userData.role ||
      !userData.email ||
      !userData.password ||
      !userData.repeatPassword
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
        duration: notifDelayErr
      });
    } else if (userData.password !== userData.repeatPassword) {
      notification["error"]({
        message: "Las contraseñas tienen que ser iguales.",
        duration: notifDelayErr
      });
    } else {
      const accessToken = getAccessTokenApi();
      signUpAdminApi(accessToken, userData)
        .then((response) => {
          if (response.status === 200) {
            notification["success"]({
              message: response.message,
              duration: notifDelay
            });
            setIsVisibleModal(false);
            setReloadUsers(true);
            setUserData({});
          } else {
            notification["error"]({
              message: response.message,
              duration: notifDelayErr
            });
          }
        })
        .catch((err) => {
          notification["error"]({
            message: err.message,
            duration: notifDelayErr
          });
        });
    }
  };
  
  return (
    <Form className="form-add" onFinish={addUser}>
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
              prefix={<MailOutlined />}
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
              placeholder="Selecciona ur rol"
              onChange={(e) => setUserData({ ...userData, role: e })}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewer">Revisor</Option>
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
              value={userData.password}
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
              placeholder="Repetir contraseña"
              value={userData.repeatPassword}
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
