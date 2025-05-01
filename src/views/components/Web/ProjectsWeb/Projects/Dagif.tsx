import React from 'react';
import ProjectLayout from '../ProjectLayout';
import dagifImage from 'assets/img/projects/dagif/dagif.webp';
import ModalImage1 from 'assets/img/projects/dagif/dagifModalImage1.webp';
import ModalImage2 from 'assets/img/projects/dagif/dagifModalImage2.webp';
import ModalImage3 from 'assets/img/projects/dagif/dagifModalImage3.webp';

export default function Dagif(props: { align: string; innerWidth: number }) {
  const { align, innerWidth } = props;
  return (
    <ProjectLayout
      innerWidth={innerWidth}
      align={align}
      linkToWeb="https://www.dagif.dtpf.es"
      imageAlt="Link a www.dagif.dtpf.es"
      image={dagifImage}
      contentTitle="Dagif App de GIFs"
      contentText="DaGif es una PWA realizada con NodeJS, Express, MongoDB, React y 
        Typescript. Consiste en prueba técnica full-stack con predominio en el backend 
        con un plazo de 3 días para realizarla."
      modalTitle="App de GIFs"
      modalImage1={ModalImage1}
      modalImage2={ModalImage2}
      modalImage3={ModalImage3}
      modalImageAlt="Imágen de www.dagif.dtpf.es"
      modalDate="Mayo 2020"
      modalIntroduction="DaGif es un proyecto desarrollado como prueba técnica 
        del Máster en Desarrollo de Software de Assembler Institute of Technology."
      modalText={[
        `El backend tiene un patrón de arquitectura basado en MVC. Está realizada con 
        Node.js, Express y MongoDB. He utilizado Cloudinary para la gestión de las 
        imágenes y Auth0 para la autorización de los endpoints. Utilizo conceptos 
        avanzados de MongoDB como indexación para búsquedas eficientes, referencias 
        para las relaciones y uniones de las colecciones, además de funciones propias 
        para el migrado automático de la base de datos.`,
        `El frontend aunque no se valoraba en esta prueba, he tenido cierto detalle en 
        cuanto a las implementaciones. Está realizada en React y Typescript basada en 
        principios SOLID. Para la autentificación y la autorización he implentado Auth0, 
        Workbox para los services-workers, Ant Design como framework de diseño, Sass 
        para los estilos, Hooks de React como useContext y useReducer para la 
        actualización de estados de la aplicación.`,
        `Para más información:`,
        `・ Backend: https://github.com/DTPF/gif_challenge_node`,
        `・ Frontend: https://github.com/DTPF/gif_challenge_react`,
      ]}
      modalTags={[
        'JavaScript',
        'TypeScript',
        'NodeJS',
        'Express',
        'JavaScript',
        'MongoDB',
        'Mongoose',
        'Auth0',
        'Helmet',
        'Cors',
        'i18next',
        'Dotenv',
        'SCSS',
        'Ant Design',
        'Flux',
        'MVC',
        'SOLID',
        'PWA',
        'Cloudinary',
        'Git',
        'GitHub',
      ]}
      analyticTag="Dagif"
    />
  );
}
