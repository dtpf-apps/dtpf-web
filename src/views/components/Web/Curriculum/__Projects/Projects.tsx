import React from "react";
import { useNearScreen } from "hooks/useNearScreen";
import { Row, Col, Image } from "antd";
import { Link } from "react-router-dom";
import dtpfImage from "assets/img/jpg/project-dtpf.jpg";
import recetasImage from "assets/img/jpg/project-recetas.jpg";
import "./Projects.scss";

export default function Projects() {
  const [show, el] = useNearScreen();
  const ref: any = el;
  return (
    <div className="projects">
      <div className="use-near-screen" ref={ref}>
        {show && (
          <>
            <h2>Proyectos</h2>
            <Row>
              <Col span={12}>
                <h3>Portfolio personal</h3>
                <Link to="/">
                  <Image src={dtpfImage}></Image>
                </Link>
              </Col>
              <Col span={12}>
                <h3>Blog de recetas</h3>
                <a
                  href="https://recetasmsr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={recetasImage} preview={false}></Image>
                </a>
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
}
