import React from "react";
import { useNearScreen } from "hooks/useNearScreen";
import "./ComplementaryEducation.scss";
import { Col, Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

export default function ComplementaryEducation() {
  const [show, el] = useNearScreen();
  let ref: any = el;
  return (
    <div className="complementary-education">
      <div className="use-near-screen" ref={ref}>
        {show && (
          <>
            <h2>Formación Complementaria</h2>
            <Col span={24} className="complementary-education__collapse">
              <Collapse
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
              >
                <Panel header="2020" key="1">
                  <ul>
                    <li>
                      Master en Frameworks JavaScript: Angular, React, Vue - (26,5h)
                    </li>
                    <li>
                      Curso “MERN Full Stack: MongoDB, Express, React y Node” -
                      Udemy (33,5h)
                    </li>
                    <li>Curso profesional de Git y GitHub – Platzi (6h)</li>
                    <li>Vim - Udemy (1,5h)</li>
                    <li>
                      Angular y NodeJS en producción - Configurar un servidor
                      VPS - (2h)
                    </li>
                    <li>
                      Curso “Master Full Stack: Angular, Node, Laravel y
                      Symfony” - Udemy (34,5h)
                    </li>
                  </ul>
                </Panel>
                <Panel header="2019" key="2">
                  <ul>
                    <li>Javascript - Udemy (10h)</li>
                    <li>Bootstrap 4 - Udemy (20h)</li>
                  </ul>
                </Panel>
              </Collapse>
            </Col>
          </>
        )}
      </div>
    </div>
  );
}
