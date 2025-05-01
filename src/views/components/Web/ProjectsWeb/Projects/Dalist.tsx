import React from 'react';
import ProjectLayout from '../ProjectLayout';
import audityImage from 'assets/img/projects/dalist/dalist.webp';
import ModalImage1 from 'assets/img/projects/dalist/dalistModalImage1.webp';
import ModalImage2 from 'assets/img/projects/dalist/dalistModalImage2.webp';
import ModalImage3 from 'assets/img/projects/dalist/dalistModalImage3.webp';

export default function Dalist(props: { align: string; innerWidth: number }) {
  const { align, innerWidth } = props;
  return (
    <ProjectLayout
      innerWidth={innerWidth}
      align={align}
      linkToWeb="https://www.dalist.dtpf.es"
      imageAlt="Link a www.dalist.dtpf.es.es"
      image={audityImage}
      contentTitle="Dalist Notes App"
      contentText="Dalist es una PWA altamente personalizable para la 
      gestión de listas de notas en la cual podras tener todas las listas y notas que 
      quieras, que ofrece autenticación a través de Google, guardado en la nube 
      y soporte multidioma."
      modalTitle="App de Notas"
      modalImage1={ModalImage1}
      modalImage2={ModalImage2}
      modalImage3={ModalImage3}
      modalImageAlt="Imágen de www.dalist.dtpf.es"
      modalDate="Abril 2020"
      modalIntroduction="Dalist es un proyecto desarrollado como parte del módulo final 
        del Máster en Desarrollo de Software de Assembler Institute of Technology."
      modalText={[
        `El proyecto se ha llevado a cabo siguiendo la metodología SCRUM y aplicando 
        integración continua. Para el backend, se ha utilizado NodeJS y Express para el 
        enrutamiento, y se ha implementado la autenticación y autorización de usuarios 
        con Auth0. En cuanto al frontend, se ha desarrollado con React, utilizando Ant 
        Design como framework de diseño, i18next para el soporte multilingüe y Workbox 
        para la implementación de service workers.`,
        `El front-end se ha realizado siguiendo los principios SOLID. Es una SPA 
        realizada con React y Typescript, Auth0 para la autentificación de usuarios, 
        Workbox para los Service Workers, Ant Design como framework de diseño, i18next 
        para el multiidioma, Swiper para los sliders de contenido, entre otras.`,
        `Para más información:`,
        `・ Backend: https://github.com/DTPF/wishlist-node`,
        `・ Frontend: https://github.com/DTPF/wishlist-react`,
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
        'PWA',
        'Flux',
        'MVC',
        'SOLID',
      ]}
      analyticTag="Dalist"
    />
  );
}
