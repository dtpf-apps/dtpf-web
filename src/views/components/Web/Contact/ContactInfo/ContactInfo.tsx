import React from "react"
import SocialLinks from "../../SocialLinks"
import { Row, Col } from "antd"
import { WhatsAppOutlined, PhoneTwoTone, MailTwoTone } from "@ant-design/icons"
import "./ContactInfo.scss"

export default function ContactInfo(props: any) {
  const { innerWidth } = props
  return (
    <Row className="contact__info">
      <Col span={24} className="contact__info-title">
        <p>
          Ponte en contacto conmigo haciendo click en los iconos de contacto o a
          través del formulario.
        </p>
        <h2>David T. Pizarro Frick</h2>
      </Col>
      {innerWidth <= 767 ? (
        <>
          <Col span={24} md={10} lg={11} className="contact__info-mobile">
            <a href="mailto:davidpizarrofrick@gmail.com">
              <MailTwoTone twoToneColor={"rgb(233, 147, 13)"} />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=Hola%20David!&phone=+34652490504`}
            >
              <WhatsAppOutlined />
            </a>
            <a href="tel:+34652490504">
              <PhoneTwoTone twoToneColor={"#273b56"} />
            </a>
            <SocialLinks />
          </Col>
        </>
      ) : (
        <Col span={24} className="contact__info-email">
          <a href="mailto:davidpizarrofrick@gmail.com">
            <MailTwoTone twoToneColor={"rgb(233, 147, 13)"} />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=Hola%20David!&phone=+34652490504`}
          >
            <WhatsAppOutlined />
          </a>
          <a href="tel:+34652490504">
            <PhoneTwoTone twoToneColor={"#273b56"} />
          </a>
          <SocialLinks />
        </Col>
      )}
    </Row>
  )
}