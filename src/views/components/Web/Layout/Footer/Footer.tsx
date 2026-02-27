import React from 'react';
import { Layout, Row, Col } from 'antd';
import { useNavigate } from 'react-router';
import './Footer.scss';

export default function Footer() {
  const { Footer } = Layout;
  const navigate = useNavigate();
  return (
    <Footer className="footer unselectable">
      <Row className="footer__content">
        <Col span={24} sm={22} md={20} lg={16}>
          <Row className="footer__copyright">
            <Col span={24} md={11} xl={10}>
              David T. Pizarro Fr<span onClick={() => navigate('/ad1988')}>i</span>ck
            </Col>
            <Col span={24} md={2} xl={4} />
            <Col span={24} md={11} xl={10} aria-hidden="true">
              Desarrollador Full Stack | 2020-2023
            </Col>
          </Row>
        </Col>
      </Row>
    </Footer>
  );
}
