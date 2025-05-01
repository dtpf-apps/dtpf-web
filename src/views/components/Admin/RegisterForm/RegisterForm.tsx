import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { minLenghtValidation, emailValidation, inputValidationStyle } from 'utils/formValidation';
import { signUpApi } from 'api/user';
import './RegisterForm.scss';

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    privacyPolicy: false,
  });
  const handleChangeForm = (e: any) => {
    if (e.target.name === 'privacyPolicy') {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };
  const inputValidation = (e: any) => {
    const { type } = e.target;
    const emailValid = emailValidation(e.target.value);
    const passwordMinLength = minLenghtValidation(e.target.value, 8);
    if (type === 'email') {
      if (!emailValid) {
        inputValidationStyle(e, 'add', 'error');
      } else {
        inputValidationStyle(e, 'remove', 'error');
      }
    }
    if (type === 'password') {
      if (!passwordMinLength) {
        inputValidationStyle(e, 'add', 'error');
      } else {
        inputValidationStyle(e, 'remove', 'error');
      }
    }
    if (e.target.value === '') {
      inputValidationStyle(e, 'remove', 'error');
    }
  };
  const register = async () => {
    setIsLoading(true);
    const { email, password, repeatPassword, privacyPolicy } = inputs;
    if (!email || !password || !repeatPassword || !privacyPolicy) {
      if (email && password && repeatPassword && !privacyPolicy) {
        message.warn('Acepta nuestra política de privacidad');
      } else {
        message.warn('Todos los campos son obligatorios');
      }
      setIsLoading(false);
    } else {
      if (password !== repeatPassword) {
        message.warn('Las contraseñas tienen que ser iguales');
        setIsLoading(false);
      } else {
        const result = await signUpApi(inputs);
        if (result.status === 200) {
          message.success(result.message);
          setIsLoading(false);
          resetForm();
        } else {
          if (result.status === 500) {
            message.error(result.message);
          } else {
            message.warn(result.message);
          }
          setIsLoading(false);
        }
      }
    }
  };
  const resetForm = () => {
    setInputs({
      email: '',
      password: '',
      repeatPassword: '',
      privacyPolicy: false,
    });
    const removeclassName: any = document.getElementsByClassName('ant-input');
    for (let i = 0; i < removeclassName.length; i++) {
      removeclassName[i].classList.remove('form-validation-success');
      removeclassName[i].classList.remove('form-validation-error');
    }
  };
  return (
    <Form className="register-form" onFinish={register} onChange={handleChangeForm}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="email"
          name="email"
          aria-label="Email"
          placeholder="Correo electrónico"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          name="password"
          aria-label="Contraseña"
          placeholder="Contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          name="repeatPassword"
          aria-label="Repetir contraseña"
          placeholder="Repetir contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox type="checkbox" name="privacyPolicy" onChange={inputValidation} checked={inputs.privacyPolicy}>
          He leído y acepto la
          <Link to="/privacy-policy">&nbsp;política de privacidad.</Link>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="link" htmlType="submit" className="register-form__button" loading={isLoading}>
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}

export default memo(RegisterForm);
