import React from "react"
import ProjectLayout from "../ProjectLayout"
import PortfolioDTPFImage from "assets/img/projects/audity/audity.webp"
import ModalImage1 from "assets/img/projects/audity/audityModalImage1.webp"
import ModalImage2 from "assets/img/projects/audity/audityModalImage2.webp"
import ModalImage3 from "assets/img/projects/audity/audityModalImage3.webp"

export default function Audity(props: {
  align: string
  innerWidth: number
}) {
  const { align, innerWidth } = props
  return (
    <ProjectLayout
      innerWidth={innerWidth}
      align={align}
      linkToWeb="https://audity.dtpf.es"
      imageAlt="Link a https://www.audity.dtpf.es"
      image={PortfolioDTPFImage}
      contentTitle="Audity Music"
      contentText="Audity Music es un proyecto de fin de máster colaborativo
      realizado en un mes y medio con cuatro compañeros del máster. Mi rol fué
      el de Scrum Master y he tenido una participación activa en el desarrollo 
      de la arquitectura y la lógica de la aplicación."
      modalTitle="Audity Music App"
      modalImage1={ModalImage1}
      modalImage2={ModalImage2}
      modalImage3={ModalImage3}
      modalImageAlt="Imágen de www.audity.es"
      modalDate="Mayo 2023"
      modalIntroduction="Audity es una PWA Full Stack JavaScript, siguiendo los 
        principios SOLID, 100% responsive y con CMS a medida.
        El backend se ha desarrollado con NodeJS y Express. Para la persistencia de datos 
        MongoDB y Mongoose para el modelado y manejo de la base de datos. Para la 
        autentificación y autorización hemos utilizado Auth0, y para el manejo de archivos 
        multimedia Cloudinary. 
        El frontend se ha realizado siguiendo los principios 
        SOLID. Es una SPA realizada con React y Typescript, Auth0 para la autentificación 
        de usuarios, Workbox para los Service Workers, Ant Design como framework de diseño, 
        i18next para el multidioma, Swiper para los sliders de contenido, entre otras."
      modalText={[
        `La aplicación es una colaboración con Iuliia Shikhanova, Joe Alt, Javier Pascual 
        y Lucia del Cacho.`,
        `Para más información:`,
        `・ Backend: https://github.com/Lucydct22/audity_node_app`,
        `・ Frontend: https://github.com/Lucydct22/audity_react_app`
      ]}
      modalTags={[
        "NodeJS",
        "Express",
        "MongoDB",
        "Mongoose",
        "React",
        "JavaScript",
        "TypeScript",
        "JSX",
        "SASS",
        "Auth0",
        "Cloudinary",
        "Ant Design",
        "MomentJS",
        "Helmet",
        "Google Analytics",
      ]}
      analyticTag='Audity'
    />
  )
}