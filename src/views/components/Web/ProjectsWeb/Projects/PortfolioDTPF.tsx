import React from 'react';
import ProjectLayout from '../ProjectLayout';
import PortfolioDTPFImage from 'assets/img/projects/dtpf/dtpf.jpg';
import ModalImage1 from 'assets/img/projects/dtpf/dtpfModalImage1.jpg';
import ModalImage2 from 'assets/img/projects/dtpf/dtpfModalImage2.jpg';
import ModalImage3 from 'assets/img/projects/dtpf/dtpfModalImage3.jpg';

export default function PortfolioDTPF(props: { align: string; innerWidth: number }) {
  const { align, innerWidth } = props;
  return (
    <ProjectLayout
      innerWidth={innerWidth}
      align={align}
      linkToWeb="https://dtpf.es"
      imageAlt="Link a https://www.dtpf.es"
      image={PortfolioDTPFImage}
      contentTitle="Portfolio DTPF"
      contentText="Mi portfolio es una aplicación web hecha a medida, que muestra mi 
      progreso en el sector de IT, y que tiene como objetivo tener un contacto más 
      directo con quien esté buscando un perfil como yo."
      modalTitle="Portfolio David T. Pizarro Frick"
      modalImage1={ModalImage1}
      modalImage2={ModalImage2}
      modalImage3={ModalImage3}
      modalImageAlt="Imágen de www.dtpf.es"
      modalDate="En desarrollo"
      modalIntroduction="
        Mi portfolio es un proyecto que tiene como objetivo darme a 
        conocer, un registro de lo que he hecho hasta ahora y una muestra
        de lo que soy capaz de hacer. Este proyecto parte de un conocimiento
        adquirido en un curso posteriormente he seguido realizando cursos 
        en diferentes plataformas, me he formado con las documentaciones
        oficiales de las tecnologías utilizadas y en foros especializados.
      "
      modalText={[
        `Aplicación web progresiva Full Stack JavaScript, 100% responsive y con CMS a medida.`,
        `Utilizo NodeJS para el back-end junto con Express para la infraestructura
        API de la aplicación. MongoDB como sistema de base de datos y Mongoose 
        para la definición de objetos mediante esquemas tipados. Moment.js para
        el manejo de fechas. JWT para la creación de tokens de usuario. Socket.io 
        para crear una conexión con WebSockets. ImageMagick para el procesamiento
        de imágenes.`,
        `Para el front-end SPA utilizo React con una arquitectura Flux, desarrollada
        para un rendimiento óptimo haciendo uso del componente Suspense de React para
        la carga de componentes en demanda, la API de Intersection Observer para
        carga de contenido en demanda y manteniendo la UI de usuarios comunes separada
        del administrador. Para la navegación en la web hago uso de React Router.
        React Helmet para la gestión de las cabeceras de la web. Utilizo Socket.io
        para las notificaciones de los mensajes recibidos del formulario de
        contacto de la web en el panel de administrador, y también recibo los mensajes 
        vía email utilizando el servicio de EmailJs. He empleado el framework
        Ant Design para el diseño, y SASS para los estilos. Los test se realizan
        con Jest, que cubren todas las llamadas API del front-end. Empleo Google
        Analytics gtag con eventos personalizados en la aplicación para mejorar 
        la experiencia de usuario.`,
      ]}
      modalTags={[
        'NodeJS',
        'Express',
        'JWT',
        'MongoDB',
        'Mongoose',
        'React',
        'JavaScript',
        'TypeScript',
        'JSX',
        'SASS',
        'Ant Design',
        'Socket.io',
        'EmailJS',
        'MomentJS',
        'Helmet',
        'Google Analytics',
      ]}
      analyticTag="PortfolioDTPF"
    />
  );
}
