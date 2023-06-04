import React from "react";
import { useNearScreen } from "hooks/useNearScreen";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import "./WorkExperience.scss";
const { Panel } = Collapse;

export default function WorkExperience() {
  return (
    <div className="work-experience">
      <h2 className="work-experience__title">Experiencia Laboral</h2>
      <div className="timeline">
        <DesarrolladorFullStackAssembler />
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

function DesarrolladorFullStackAssembler() {
  const [show, el] = useNearScreen();
  const ref: any = el;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className="container workx-8 left">
          <div className="title-left workx-8">
            <h3>DESARROLLADOR FULL STACK</h3>
          </div>
          <div className="content">
            <span>2022 - 2023</span>
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="work-collapse"
            >
              <Panel
                header="Assembler Institute of Technology"
                key="1"
                className="work-collapse-panel"
              >
                <p className="work-collapse-panel__text">
                  Trabajando como desarrollador full-stack aplicando las últimas tecnologías
                  con metodologías como <b>Peer Learning</b>, <b>Pair Programming</b> y <b>Live Coding</b>.
                  <br /><br />

                  ・Máster intensivo con más de 1200 horas de proyectos orientados
                  al mundo real basados en metodologías ágiles.<br />
                  ・Más de 30 proyectos en el mundo real realizados con un enfoque
                  profundo en las pilas <b>MERN</b> y <b>LAMP</b> aplicando
                  principios <b>SOLID</b>.<br />
                  ・Trabajando en proyectos reales aplicando prácticas de código 
                  limpio y patrones de escalabilidad.<br />
                  ・Utilizando técnicas de desarrollo <b>Agile</b> (<b>Kaban</b>, <b>Scrum</b>).<br /><br />

                  Proyectos destacados:<br />
                  ・<a href="https://audity.dtpf.es" target="_blank" rel='noreferrer'><b>Audity</b>(Clon Spotify)</a>: <b>React</b>, <b>Typescript</b>, <b>NodeJS</b>, Express, <b>MongoDB</b>, <b>SASS</b>, Auth0, Ant-Design, Workbox, Google Analytics.<br />
                  ・<a href="https://dalist.dtpf.es" target="_blank" rel='noreferrer'><b>Dalist</b>(Bloc de notas)</a>: <b>React</b>, <b>Typescript</b>, <b>NodeJS</b>, Express, <b>MongoDB</b>, <b>SASS</b>, Auth0, Ant-Design.<br />
                  ・<a href="https://amazen.dtpf.es" target="_blank" rel='noreferrer'><b>Amazén</b>(Clon Amazon)</a>: <b>React</b>, <b>NodeJS</b>, ExpressJs, <b>MongoDB</b>, SCSS.<br />
                  ・<a href="https://befriends.dtpf.es" target="_blank" rel='noreferrer'><b>BeFriends</b>(Red social)</a>: <b>PHP</b>, <b>JavaScript</b>, MySQL.<br /><br />

                  Tecnologías: <b>Javascript</b>, <b>Typescript</b>, <b>MongoDB</b>, Express, <b>React</b>, <b>NodeJS</b>, HTML5, CSS3, <b>SASS</b>, Ant-Design, MySQL, <b>PHP</b>, <b>Git</b>, <b>GitHub</b>, Postman, Figma.
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
