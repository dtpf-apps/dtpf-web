import React from 'react';
import { useNearScreen } from 'hooks/useNearScreen';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import './WorkExperience.scss';
const { Panel } = Collapse;

export default function WorkExperience() {
  return (
    <div className="work-experience">
      <h2 className="work-experience__title">Experiencia Laboral</h2>
      <div className="timeline">
        <Hub4Retail position="left" />
        <DesarrolladorFullStackPalmira position="right" />
        <DesarrolladorFullStackAssembler position="left" />
        <AlbañilFreelance position="right" />
        <SupermercadoChipYChop position="left" />
        <TizonaSL position="right" />
        <MoyaSaus position="left" />
        <IntegraTap position="right" />
        <LlabresFeliu position="left" />
        <TallerLaCabina position="right" />
      </div>
    </div>
  );
}
function Hub4Retail(props: { position: string }) {
  const [show, el] = useNearScreen();
  const ref: any = el;
  const { position } = props;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className={`container workx-8 ${position}`}>
          <div className={`title-${position} workx-8`}>
            <h3>DESARROLLADOR FRONTEND</h3>
          </div>
          <div className="content">
            <span>Desde Julio 2023</span>
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} style={{ marginRight: 25 }} />
              )}
              className="work-collapse"
            >
              <Panel header="Hub4Retail" key="1" className="work-collapse-panel">
                <p className="work-collapse-panel__text">
                  Actualmente desarrollando el frontend de una plataforma SaaS especializada en conectar
                  marcas y multimarcas del sector de la moda, generando valor a las empresas mediante el
                  intercambio y explotación de datos.
                  <br />
                  <br />
                  En este proyecto he estado involucrado en distintas fases, desde el análisis de la
                  arquitectura inicial, hasta la decisión de las tencologías a emplear o la toma de decisiones
                  en aspectos relacionados con el frontend y la coordinación con el elquipo de backend y data.
                  <br />
                  <br />
                  La plataforma se encuentra operativa, dando servicios a más de 20 empresas destacadas en el
                  sector, como Lacoste, Levis, Camper, Ecoalf, Wow Concept y The Fashion Hunter, entre otras.
                  <br />
                  <br />
                  Tecnologías: <b>HTML5</b>, <b>CSS3</b>, <b>SCSS</b>, <b>Javascript</b>, <b>Typescript</b>,
                  React.
                  <b>js</b>, Ant <b>Design</b>, <b>Testing</b>, CI/
                  <b>CD</b>, <b>Git</b>, <b>Bitbucket</b>, <b>Agile</b>,<b>Scrum</b>, <b>Postman</b>, Auth0.
                </p>
              </Panel>
            </Collapse>
          </div>
        </div>
      )}
    </div>
  );
}

function DesarrolladorFullStackPalmira(props: { position: string }) {
  const [show, el] = useNearScreen();
  const ref: any = el;
  const { position } = props;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className={`container workx-8 ${position}`}>
          <div className={`title-${position} workx-8`}>
            <h3>DESARROLLADOR FULL STACK</h3>
          </div>
          <div className="content">
            <span>Junio 2021 - Junio 2023</span>
            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} style={{ marginRight: 25 }} />
              )}
              className="work-collapse"
            >
              <Panel header="Palmira" key="1" className="work-collapse-panel">
                <p className="work-collapse-panel__text">
                  ・Crear interfaces de usuario interactivas y atractivas utilizando tecnologías como HTML,
                  CSS y JavaScript, y la librería de React Native.
                  <br />
                  ・Implementar lógica de negocio, manejar solicitudes del cliente y asegurar el rendimiento y
                  la seguridad del sistema utilizando tecnologías del lado del servidor como Node.js y
                  Express.
                  <br />
                  ・Diseñar y gestionar bases de datos NoSQL, optimizando consultas y garantizando la
                  integridad de los datos.
                  <br />
                  ・Desarrollar y mantener APIs para permitir la comunicación eficiente entre diferentes
                  componentes de la aplicación y servicios externos.
                  <br />
                  ・Resolver problemas y depurar errores en todas las capas de la aplicación, asegurando un
                  funcionamiento fluido y sin problemas.
                  <br />
                  ・Colaborar estrechamente con otros miembros del equipo de desarrollo, participando en la
                  planificación y gestión de proyectos.
                  <br />
                  ・Mantenerse actualizado sobre las últimas tendencias y mejores prácticas en el campo del
                  desarrollo web y de aplicaciones.
                  <br />
                  <br />
                  Tecnologías: <b>Javascript</b>, <b>Typescript</b>, <b>MongoDB</b>, Express,{' '}
                  <b>React Native</b>, <b>NodeJS</b>, HTML5, CSS3, <b>SCSS</b>,<b> Git</b>, <b>GitHub</b>,
                  Postman.
                </p>
              </Panel>
            </Collapse>
          </div>
        </div>
      )}
    </div>
  );
}

function DesarrolladorFullStackAssembler(props: { position: string }) {
  const [show, el] = useNearScreen();
  const ref: any = el;
  const { position } = props;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className={`container workx-8 ${position}`}>
          <div className={`title-${position} workx-8`}>
            <h3>DESARROLLADOR FULL STACK</h3>
          </div>
          <div className="content">
            <span>Octubre 2022 - Mayo 2023</span>
            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} style={{ marginRight: 25 }} />
              )}
              className="work-collapse"
            >
              <Panel header="Assembler Institute of Technology" key="1" className="work-collapse-panel">
                <p className="work-collapse-panel__text">
                  Trabajando como desarrollador full-stack aplicando las últimas tecnologías con metodologías
                  como <b>Peer Learning</b>, <b>Pair Programming</b> y <b>Live Coding</b>.
                  <br />
                  <br />
                  ・Máster intensivo con más de 1200 horas de proyectos orientados al mundo real basados en
                  metodologías ágiles.
                  <br />
                  ・Más de 30 proyectos en el mundo real realizados con un enfoque profundo en las pilas{' '}
                  <b>MERN</b> y <b>LAMP</b> aplicando principios <b>SOLID</b>.<br />
                  ・Trabajando en proyectos reales aplicando prácticas de código limpio y patrones de
                  escalabilidad.
                  <br />
                  ・Utilizando técnicas de desarrollo <b>Agile</b> (<b>Kaban</b>, <b>Scrum</b>).
                  <br />
                  <br />
                  Proyectos destacados:
                  <br />・
                  <a href="https://audity.dtpf.es" target="_blank" rel="noreferrer">
                    <b>Audity</b>(Clon Spotify)
                  </a>
                  : <b>React</b>, <b>Typescript</b>, <b>NodeJS</b>, Express, <b>MongoDB</b>, <b>SASS</b>,
                  Auth0, Ant-Design, Workbox, Google Analytics.
                  <br />・
                  <a href="https://dalist.dtpf.es" target="_blank" rel="noreferrer">
                    <b>Dalist</b>(Bloc de notas)
                  </a>
                  : <b>React</b>, <b>Typescript</b>, <b>NodeJS</b>, Express, <b>MongoDB</b>, <b>SASS</b>,
                  Auth0, Ant-Design.
                  <br />・
                  <a href="https://amazen.dtpf.es" target="_blank" rel="noreferrer">
                    <b>Amazén</b>(Clon Amazon)
                  </a>
                  : <b>React</b>, <b>NodeJS</b>, ExpressJs, <b>MongoDB</b>, SCSS.
                  <br />・
                  <a href="https://befriends.dtpf.es" target="_blank" rel="noreferrer">
                    <b>BeFriends</b>(Red social)
                  </a>
                  : <b>PHP</b>, <b>JavaScript</b>, MySQL.
                  <br />
                  <br />
                  Tecnologías: <b>Javascript</b>, <b>Typescript</b>, <b>MongoDB</b>, Express, <b>React</b>,{' '}
                  <b>NodeJS</b>, HTML5, CSS3, <b>SASS</b>, Ant-Design, MySQL, <b>PHP</b>, <b>Git</b>,{' '}
                  <b>GitHub</b>, Postman, Figma.
                </p>
              </Panel>
            </Collapse>
          </div>
        </div>
      )}
    </div>
  );
}

function AlbañilFreelance(props: { position: string }) {
  const [show, el] = useNearScreen();
  const ref: any = el;
  const { position } = props;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className={`container workx-8 ${position}`}>
          <div className={`title-${position} workx-7`}>
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

function SupermercadoChipYChop(props: { position: string }) {
  const [show, el] = useNearScreen();
  const ref: any = el;
  const { position } = props;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className={`container workx-6 ${position}`}>
          <div className={`title-${position} workx-6`}>
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

function TizonaSL(props: { position: string }) {
  const [show, el] = useNearScreen();
  const ref: any = el;
  const { position } = props;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className={`container workx-5 ${position}`}>
          <div className={`title-${position} workx-5`}>
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

function MoyaSaus(props: { position: string }) {
  const [show, el] = useNearScreen();
  const ref: any = el;
  const { position } = props;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className={`container workx-4 ${position}`}>
          <div className={`title-${position} workx-4`}>
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

function IntegraTap(props: { position: string }) {
  const [show, el] = useNearScreen();
  const ref: any = el;
  const { position } = props;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className={`container workx-3 ${position}`}>
          <div className={`title-${position} workx-3`}>
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

function LlabresFeliu(props: { position: string }) {
  const [show, el] = useNearScreen();
  const ref: any = el;
  const { position } = props;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className={`container workx-2 ${position}`}>
          <div className={`title-${position} workx-2`}>
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

function TallerLaCabina(props: { position: string }) {
  const [show, el] = useNearScreen();
  const ref: any = el;
  const { position } = props;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <div className={`container workx-1 ${position}`}>
          <div className={`title-${position} workx-1`}>
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
