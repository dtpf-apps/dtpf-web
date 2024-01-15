import React, { memo, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signInApi } from "api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "utils/constants";
import {
  emailValidation,
  inputValidationStyle,
} from "utils/formValidation";
import "./LoginForm.scss";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [countLogin, setCountLogin] = useState(0);
  const [timeToLogin, setTimeToLogin] = useState(0);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChangeForm = (e: any) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const inputValidation = (e: any) => {
    const { type } = e.target;
    const emailValid = emailValidation(e.target.value);
    if (type === "email") {
      if (!emailValid) {
        inputValidationStyle(e, "add", "error");
      } else {
        inputValidationStyle(e, "remove", "error");
      }
    }
    if (e.target.value === "") {
      inputValidationStyle(e, "remove", "error");
    }
  };
  const login = () => {
    if (countLogin > 10) {
      setTimeToLogin(30000);
    }
    setIsLoading(true);
    setTimeout(async function () {
      let count = countLogin;
      setCountLogin(count + 1);
      const result = await signInApi(inputs);
      if (result.message) {
        message.error(result.message);
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
        window.location.href = "/ad1988";
      }
      setIsLoading(false);
    }, timeToLogin);
  };
  return (
    <Form className="login-form" onFinish={login} onChange={handleChangeForm}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="email"
          name="email"
          aria-label="Email"
          placeholder="Correo electrónico"
          className="login-form__input"
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          aria-label="Contraseña"
          placeholder="Contraseña"
          className="login-form__input"
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="link"
          htmlType="submit"
          className="login-form__button"
          loading={isLoading}
        >
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default memo(LoginForm);