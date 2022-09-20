import React from "react";
import { Layout, Row, Col } from "antd";
import MyInfo from "./MyInfo";
import ContactMe from "./ContactMe";
import "./Footer.scss";

export default function Footer() {
  const { Footer } = Layout;
  return (
    <Footer className="footer unselectable">
      <Row className="footer__content">
        <Col span={0} sm={1} md={2} lg={4} />
        <Col span={24} sm={22} md={20} lg={16}>
          <Row>
            <Col span={24} sm={11} xl={10}>
              <MyInfo />
            </Col>
            <Col span={24} sm={2} xl={4} />
            <Col span={24} sm={11} xl={10}>
              <ContactMe />
            </Col>
          </Row>
          <Row className="footer__copyright">
            <Col span={24} sm={11} xl={10}>
              David Thomas Pizarro Frick
            </Col>
            <Col span={24} sm={2} xl={4} />
            <Col span={24} sm={11} xl={10} aria-hidden="true">
              Desarrollador Web | 2022
            </Col>
          </Row>
        </Col>
        <Col span={0} sm={1} md={2} lg={4} />
      </Row>
    </Footer>
  );
}
