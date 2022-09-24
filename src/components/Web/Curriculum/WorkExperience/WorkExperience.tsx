import React from "react";
import { useNearScreen } from "../../../../hooks/useNearScreen";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import "./WorkExperience.scss";
const { Panel } = Collapse;

export default function WorkExperience() {
  return (
    <div className="work-experience">
      <h2 className="work-experience__title">Experiencia Laboral</h2>
      <div className="timeline">
        <DesarrolladorFreelance />
        <AlbañilFreelance />
        <SupermercadoChipYChop />
        <TizonaSL />
        <MoyaSaus />
        <IntegraTap />
        <LlabresFeliu />
        <TallerLaCabina />
      </div>
    </div>
  );
}

function DesarrolladorFreelance() {
  const [show, el] = useNearScreen();
  const ref: any = el;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className="container workx-8 left">
          <div className="title-left workx-8">
            <h3>DESARROLLADOR FREELANCE</h3>
          </div>
          <div className="content">
            <span>2018 - 2022</span>
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="work-collapse"
            >
              <Panel
                header="Desarrollador Junior de Software"
                key="1"
                className="work-collapse-panel"
              >
                <p className="work-collapse-panel__text">
                  En búsqueda activa de empleo.
                  <br />
                  Desde septiembre de 2018 formándome en diferentes lenguajes y
                  tecnologías en un centro formativo (FP), complementándolo con
                  cursos online con y sin certificado, y de manera autodidacta
                  para ser desarrollador de software.
                </p>
              </Panel>
            </Collapse>
          </div>
        </div>
      )}
    </div>
  );
}

function AlbañilFreelance() {
  const [show, el] = useNearScreen();
  const ref: any = el;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className="container workx-8 right">
          <div className="title-right workx-7">
            <h3>ALBAÑIL FREELANCE</h3>
          </div>
          <div className="content">
            <span>2020 - 2022</span>
            <p>Oficial de 1ª de albañilería</p>
          </div>
        </div>
      )}
    </div>
  );
}

function SupermercadoChipYChop() {
  const [show, el] = useNearScreen();
  const ref: any = el;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className="container workx-6 left">
          <div className="title-left workx-6">
            <h3>SUPERMERCADO CHIP Y CHOP</h3>
          </div>
          <div className="content">
            <span>Temporada 2018</span>
            <p>Dependiente de supermercado</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TizonaSL() {
  const [show, el] = useNearScreen();
  const ref: any = el;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className="container workx-5 right">
          <div className="title-right workx-5">
            <h3>TIZONA S.L (GRUPO IFA)</h3>
          </div>
          <div className="content">
            <span>2017</span>
            <p>Encargado de supermercado</p>
          </div>
        </div>
      )}
    </div>
  );
}

function MoyaSaus() {
  const [show, el] = useNearScreen();
  const ref: any = el;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className="container workx-4 left">
          <div className="title-left workx-4">
            <h3>MOYA SAUS (Grupo IFA)</h3>
          </div>
          <div className="content">
            <span>2016 - Enero 2017</span>
            <p>Encargado de supermercado</p>
            <span>2011 - 2015</span>
            <p>Segundo encargado de supermercado</p>
            <span>2010</span>
            <p>Dependiente de supermercado</p>
          </div>
        </div>
      )}
    </div>
  );
}

function IntegraTap() {
  const [show, el] = useNearScreen();
  const ref: any = el;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className="container workx-3 right">
          <div className="title-right workx-3">
            <h3>INTEGRA TAP</h3>
          </div>
          <div className="content">
            <span>2008 - 2010</span>
            <p>Oficial 2ª en aplicaciones técnicas de albañilería</p>
          </div>
        </div>
      )}
    </div>
  );
}

function LlabresFeliu() {
  const [show, el] = useNearScreen();
  const ref: any = el;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className="container workx-2 left">
          <div className="title-left workx-2">
            <h3>LLABRÉS FELIU MEDI-AMBENT</h3>
          </div>
          <div className="content">
            <span>2006 - 2008</span>
            <p>Peón, Oficial y Capataz de albañilería</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TallerLaCabina() {
  const [show, el] = useNearScreen();
  const ref: any = el;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className="container workx-1 right">
          <div className="title-right workx-1">
            <h3>TALLER LA CABINA</h3>
          </div>
          <div className="content">
            <span>Mayo - Octubre 2006</span>
            <p>Auxiliar de administrativo en taller de automóviles</p>
          </div>
        </div>
      )}
    </div>
  );
}
