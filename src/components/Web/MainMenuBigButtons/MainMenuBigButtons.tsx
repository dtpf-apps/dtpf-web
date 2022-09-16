import React from "react";
import { Link } from "react-router-dom";
import GetMainMenu from "../../../dbIndexed/mainMenu/GetMainMenu";
import useShowContentOffline from "../../../dbIndexed/utils/useShowContentOffline";
import useRandomNumber from "../../../hooks/useRandomNumber";
import { Row, Col } from "antd";
import "./MainMenuBigButtons.scss";

export default function MainMenuBigButtons(props: any) {
  const { location } = props;
  const menu = GetMainMenu();
  const getClassName: string = location ? location.split("/")[1] : "";
  const mainMenu = menu.filter(
    (item: any) => item.url.split("/")[1] !== getClassName
  );
  return (
    <Row className="main-menu-big-buttons">
      <RenderButtons mainMenu={mainMenu} />
    </Row>
  );
}

function RenderButtons(props: any) {
  const { mainMenu } = props;
  const showContentOffline = useShowContentOffline();
  const ramdomNumber = useRandomNumber(0, 2);
  return (
    <>
      {showContentOffline && <p>Aqui deberian haber unos botones enormes</p>}
      {mainMenu.length > 0 ? (
        mainMenu.map((item: any) => {
          const className: string = item.url.split("/")[1];
          const subtitle = () => {
            if (className === "education") {
              return FormacionTI(ramdomNumber);
            }
            if (className === "curriculum") {
              return Curriculum(ramdomNumber);
            }
            if (className === "projects") {
              return Proyectos(ramdomNumber);
            }
            if (className === "about-me") {
              return SobreMi(ramdomNumber);
            }
            if (className === "contact") {
              return Contacto(ramdomNumber);
            }
          };
          return (
            <Col span={24} md={11} key={item.url} className={className}>
              <Link to={item.url}>
                <h1>{item.title}</h1>
                <p>{subtitle()}</p>
              </Link>
            </Col>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
}

function FormacionTI(ramdomNumber: number) {
  const phrases = [
    `Desde que decidí introducirme en este mundo`,
    `Relacionada con el mundo de IT`,
    `En tecnologías de la información`,
  ];
  return phrases[ramdomNumber];
}

function Curriculum(ramdomNumber: number) {
  const phrases = [
    `Trayectoria profesional`,
    `Hoja de vida profesional`,
    `Biografía laboral`,
  ];
  return phrases[ramdomNumber];
}

function Proyectos(ramdomNumber: number) {
  const phrases = [
    `Aún son pocos, pero crecerán`,
    `Aún son pocos, pero crecerán`,
    `Aún son pocos, pero crecerán`,
  ];
  return phrases[ramdomNumber];
}

function SobreMi(ramdomNumber: number) {
  const phrases = [
    `Para que me puedas conocer mejor`,
    `Competencias, historia y aficiones`,
    `Un poco de información relevante`,
  ];
  return phrases[ramdomNumber];
}

function Contacto(ramdomNumber: number) {
  const phrases = [
    `¿Hablamos?`,
    `Vía formulario, email, teléfono o whatsapp`,
    `¿Interesado en mis habilidades? Contáctame`,
  ];
  return phrases[ramdomNumber];
}
