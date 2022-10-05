import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Checkbox, Button, message } from "antd";
import { subscribeContactApi } from "../../../../../api/contact";
import { reloadMessagesApi } from "../../../../../api/utils";
import { gaEvent } from "../../../../../utils/analytics.js";
import { SmileOutlined } from "@ant-design/icons";
import "./ContactMe.scss";
import {
  emailValidation,
  isNumberValidation,
  inputValidationStyle,
} from "../../../../../utils/formValidation";
import emailjs from "emailjs-com";

export default function ContactMe() {
  const [inputs, setInputs] = useState({
    email: "",
    message: "",
    privacyPolicy: false,
  });
  return (
    <div className="footer__contact-me">
      <span className="footer__contact-me__title">
        Contacta conmigo&nbsp;
        <SmileOutlined />
      </span>
      <RenderForm inputs={inputs} setInputs={setInputs} />
    </div>
  );
}

function RenderForm(props: any) {
  const { inputs, setInputs } = props;
  const messageAnt: any = message;
  const { TextArea }: any = Input;
  const handleChangeForm = (e: any) => {
    if (e.target.name === "privacyPolicy") {
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
    const { name } = e.target;
    const messageTrim = e.target.value.replace(/ /g, "");
    ////////// VALIDATIONS
    // email
    const emailValid = emailValidation(e.target.value);
    // message
    const messageIsNumber = isNumberValidation(messageTrim);
    const messageCountWords = e.target.value.split(" ").length;
    ////////// END VALIDATIONS
    const addError = () => inputValidationStyle(e, "add", "error");
    const removeError = () => inputValidationStyle(e, "remove", "error");
    if (name === "email") {
      if (!emailValid) {
        addError();
      } else {
        removeError();
      }
    }
    if (name === "message") {
      if (messageCountWords < 3 || messageIsNumber) {
        addError();
      } else {
        removeError();
      }
    }
    if (e.target.value === "") {
      removeError();
    }
  };
  const onFinish = async () => {
    const { email, message, privacyPolicy } = inputs;
    const emailTrim = email?.replace(/ /g, "");
    const messageTrim = message?.replace(/ /g, "");
    const finalData = {
      name: "Anónimo",
      email: emailTrim,
      subject: "Sin asunto",
      message: message,
    };
    ////////// VALIDATIONS
    // email
    const emailValid = emailValidation(emailTrim);
    // message
    const messageIsNumber = isNumberValidation(messageTrim);
    const messageCountWords = message && message.split(" ").length;
    ////////// END VALIDATIONS
    if (!email && message === "1988") {
      window.location.href = "/ad1988";
    } else if (!email && !message) {
      messageAnt.warn("El email y el mensaje son obligatorios.");
    } else if (!email) {
      messageAnt.warn("El email es obligatorio.");
    } else if (!message) {
      messageAnt.warn("El mensaje es obligatorio.");
    } else if (!emailValid) {
      messageAnt.warn("El email no es válido.");
    } else if (messageIsNumber) {
      setInputs({
        email: "Autodestrucción...",
        message: "Cuenta atrás iniciada...",
      });
      messageAnt
        .loading("Enviando mensaje...", 1.5)
        .then(() => messageAnt.warn("Un momento...", 1))
        .then(() => messageAnt.loading("Desplegando misiles...", 2))
        .then(
          () =>
            messageAnt.error(
              `Codigo de Autodestrucción Activado. Desplegando misiles en ${message} segundos...`,
              3.5
            ),
          setTimeout(() => {
            messageAnt.info(
              "!!Es broma!! Sigue con lo que estabas haciendo 😁",
              2
            );
            setInputs({ email: email, message: message });
          }, 10000)
        );
    } else if (messageCountWords < 3) {
      messageAnt.warn("Especifica un poco más en el mensaje por favor.");
    } else if (!privacyPolicy) {
      messageAnt.warn("Acepta la política de privacidad.");
    } else {
      await subscribeContactApi(finalData).then(async (response) => {
        if (response.status === 200) {
          emailjs
            .send(
              "contact-email-2365",
              "template_2uj79vj",
              finalData,
              "iboAXgpflV9a6wRRG"
            )
            .then(
              (response) => {
                console.log(`%c${response.text}`, "color: green");
              },
              (err) => {
                console.log("FAILED...", err);
              }
            );
          await reloadMessagesApi(true);
          setInputs({ email: "", message: "", privacyPolicy: false });
          messageAnt
            .success("Enviado correctamente!!", 1.5)
            .then(() => messageAnt.info("Contestaré lo antes posible!!", 2.5));
        } else if (response.status === 500) {
          messageAnt.error(response.message);
        } else {
          if (response.message === "Failed to fetch") {
            messageAnt
              .error("No se ha podido enviar el mensaje.", 2)
              .then(() => messageAnt.warn("Comprueba tu conexión a internet."));
          } else {
            messageAnt.warn(response.message);
          }
        }
      });
    }
  };
  const gaClickEmailFormFooter = () => {
    gaEvent("click_email_contact_me_footer", "clicks", "UI Clicks", true);
  };
  return (
    <Form onFinish={onFinish} onChange={handleChangeForm}>
      <Form.Item>
        <Input
          type="email"
          name="email"
          aria-label="Email"
          placeholder="Correo electrónico"
          value={inputs.email}
          onInput={inputValidation}
          onClick={gaClickEmailFormFooter}
        />
      </Form.Item>
      <Form.Item className="contactme__textarea-form-item">
        <TextArea
          name="message"
          aria-label="Mensaje"
          placeholder="Escribe aquí tu mensaje"
          autoSize={{ minRows: 1, maxRows: 6 }}
          maxLength={500}
          value={inputs.message}
          onPressEnter={onFinish}
          onInput={inputValidation}
        />
      </Form.Item>
      <Form.Item className="contactme__checkbox-form-item">
        <Checkbox
          type="checkbox"
          name="privacyPolicy"
          className="ant-input__checkbox"
          checked={inputs.privacyPolicy}
        >
          He leído y acepto la
          <Link to="/privacy-policy">&nbsp;política de privacidad.</Link>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}
