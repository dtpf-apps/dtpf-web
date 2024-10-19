/* eslint-disable no-template-curly-in-string */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Form as FormAnt,
  Input,
  Checkbox,
  Button,
  message as msg,
} from "antd";
import "./ContactForm.scss";
import { subscribeContactApi } from "api/contact";
import { reloadMessagesApi } from "api/utils";
import {
  emailValidation,
  minLenghtValidation,
  isNumberValidation,
  isPhoneNumberValidation,
  inputValidationStyle,
} from "utils/formValidation";
import { RedoOutlined } from "@ant-design/icons";
import emailjs from "emailjs-com";

export default function ContactForm() {
  const { TextArea } = Input;
  const Form: any = FormAnt;
  const messageAnt: any = msg;
  const removeclassName: any = document.getElementsByClassName("ant-input");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone_number: "",
    subject: "",
    message: "",
    privacyPolicy: false,
  });
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
    const { type, name } = e.target;
    const valueTrim = e.target.value.replace(/ /g, "");
    ////////// VALIDATIONS
    // email
    const emailValid = emailValidation(e.target.value);
    // name
    const nameMinLength = minLenghtValidation(e.target.value, 3);
    const nameIsNumber = isNumberValidation(valueTrim);
    // phone number
    const phoneValid = isPhoneNumberValidation(e.target.value);
    // subject
    const subjectMinLength = minLenghtValidation(e.target.value, 3);
    const subjectIsNumber = isNumberValidation(valueTrim);
    // message
    const messageMinLength = minLenghtValidation(e.target.value, 15);
    const messageIsNumber = isNumberValidation(valueTrim);
    const messageCountWords = e.target.value.split(" ").length;
    ////////// END VALIDATIONS
    const addError = () => inputValidationStyle(e, "add", "error");
    const removeError = () => inputValidationStyle(e, "remove", "error");
    if (type === "email") {
      if (!emailValid) {
        addError();
      } else {
        removeError();
      }
    }
    if (name === "name") {
      if (!nameMinLength || nameIsNumber) {
        addError();
      } else {
        removeError();
      }
    }
    if (type === "tel") {
      if (!phoneValid) {
        addError();
      } else {
        removeError();
      }
    }
    if (name === "subject") {
      if (!subjectMinLength || subjectIsNumber) {
        addError();
      } else {
        removeError();
      }
    }
    if (name === "message") {
      if (!messageMinLength || messageIsNumber || messageCountWords < 3) {
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
    const {
      name,
      email,
      phone_number,
      subject,
      message,
      privacyPolicy,
    } = inputs;

    const emailTrim = email.replace(/ /g, "");
    const nameTrim = name.replace(/ /g, "");
    const subjectTrim = subject.replace(/ /g, "");
    const messageTrim = message.replace(/ /g, "");
    const finalData = {
      name: name ? name : "Anónimo",
      email: emailTrim,
      phone_number: phone_number ? phone_number : "Ninguno",
      subject: subject ? subject : "Sin asunto",
      message: message,
    };
    ////////// VALIDATIONS
    // email
    const emailValid = emailValidation(emailTrim);
    const spamWords = /(agenc|posicio|market|legal|juridi|consul)/i;
    const containsSpamWords = spamWords.test(emailTrim);
    // name
    const nameMinLength = minLenghtValidation(name, 3);
    const nameIsNumber = isNumberValidation(nameTrim);
    // phone_number
    const phoneValid = isPhoneNumberValidation(phone_number);
    // subject
    const subjectMinLength = minLenghtValidation(subject, 3);
    const subjectIsNumber = isNumberValidation(subjectTrim);
    // message
    const messageMinLength = minLenghtValidation(message, 10);
    const messageIsNumber = isNumberValidation(messageTrim);
    ////////// END VALIDATIONS
    if (!email && !message) {
      messageAnt.warn("El email y el mensaje son obligatorios.");
    } else if (nameIsNumber) {
      messageAnt.warn(`Seguro que te llamas ${name}??`);
    } else if (name && !nameMinLength) {
      messageAnt.warn("El nombre requiere un mínimo de 3 carácteres.");
    } else if (!email) {
      messageAnt.warn("El email es obligatorio.");
    } else if (!emailValid) {
      messageAnt.warn("El email no es correcto.");
    } else if (containsSpamWords === true) {
      messageAnt.warn("Lo siento, no estoy interesado en este tipo de servicios.");
    } else if (phone_number && !phoneValid) {
      messageAnt.warn("El número de teléfono no es correcto.");
    } else if (!message) {
      messageAnt.warn("El mensaje es obligatorio.");
    } else if (subject && !subjectMinLength) {
      messageAnt.warn("El asunto requiere un mínimo de 3 carácteres.");
    } else if (subjectIsNumber) {
      messageAnt.warn("El asunto no pueden ser todo números...");
    } else if (messageIsNumber) {
      messageAnt.warn("El mensaje no pueden ser todo números...");
    } else if (!messageMinLength) {
      messageAnt.warn("El mensaje requiere un mínimo de 10 carácteres.");
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
          for (let i = 0; i < removeclassName.length; i++) {
            removeclassName[i].classList.remove("form-validation-success");
            removeclassName[i].classList.remove("form-validation-error");
          }
          setInputs({
            name: "",
            email: "",
            phone_number: "",
            subject: "",
            message: "",
            privacyPolicy: false,
          });
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
  const resetForm = () => {
    setInputs({
      name: "",
      email: "",
      phone_number: "",
      subject: "",
      message: "",
      privacyPolicy: inputs.privacyPolicy,
    });
    for (let i = 0; i < removeclassName.length; i++) {
      removeclassName[i].classList.remove("form-validation-success");
      removeclassName[i].classList.remove("form-validation-error");
    }
  };
  return (
    <Form
      name="contact-message"
      onFinish={onFinish}
      onChange={handleChangeForm}
    >
      <Row className="contact__form">
        <Col span={24} lg={12} className="contact__form-column-left">
          <div className="contact__form-item">
            <div className="contact__form-item-label">
              <span>*&nbsp;</span>Email
            </div>
            <Form.Item>
              <Input
                type="email"
                name="email"
                aria-label="Email"
                value={inputs.email}
                onInput={inputValidation}
              />
            </Form.Item>
          </div>
          <div className="contact__form-item">
            <div className="contact__form-item-label">Nombre</div>
            <Form.Item>
              <Input
                type="text"
                name="name"
                aria-label="Nombre"
                value={inputs.name}
                onInput={inputValidation}
              />
            </Form.Item>
          </div>
          <div className="contact__form-item">
            <div className="contact__form-item-label">Teléfono</div>
            <Form.Item>
              <Input
                type="tel"
                name="phone_number"
                aria-label="Teléfono"
                value={inputs.phone_number}
                onInput={inputValidation}
              />
            </Form.Item>
          </div>
          <div className="contact__form-item">
            <div className="contact__form-item-label">Asunto</div>
            <Form.Item>
              <Input
                type="text"
                name="subject"
                aria-label="Asunto"
                value={inputs.subject}
                onInput={inputValidation}
              />
            </Form.Item>
          </div>
        </Col>
        <Col span={24} lg={12} className="contact__form-column-right">
          <div className="contact__form-item">
            <div className="contact__form-item-label">
              <span>*&nbsp;</span>Mensaje
            </div>
            <Form.Item>
              <TextArea
                name="message"
                aria-label="Mensaje"
                autoSize={{ minRows: 8, maxRows: 16 }}
                value={inputs.message}
                onInput={inputValidation}
              />
            </Form.Item>
          </div>
        </Col>
        <Col span={24} className="contact__form-checkbox">
          <Form.Item>
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
        </Col>
        <Col span={24} className="contact__form-button">
          <Form.Item>
            {(inputs.name ||
              inputs.email ||
              inputs.phone_number ||
              inputs.subject ||
              inputs.message) && (
                <Button
                  type="primary"
                  className="contact__form-button-reset"
                  onClick={resetForm}
                >
                  <RedoOutlined />
                </Button>
              )}
            <Button
              type="primary"
              htmlType="submit"
              className="contact__form-button-submit"
            >
              Enviar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
