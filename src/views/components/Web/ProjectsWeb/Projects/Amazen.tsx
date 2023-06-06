import React from "react"
import ProjectLayout from "../ProjectLayout"
import amazenImage from "assets/img/projects/amazen/amazen.webp"
import ModalImage1 from "assets/img/projects/amazen/amazenModalImage1.webp"
import ModalImage2 from "assets/img/projects/amazen/amazenModalImage2.webp"
import ModalImage3 from "assets/img/projects/amazen/amazenModalImage3.webp"

export default function Amazen(props: {
  align: string
  innerWidth: number
}) {
  const { align, innerWidth } = props
  return (
    <ProjectLayout
      innerWidth={innerWidth}
      align={align}
      linkToWeb="https://www.amazen.dtpf.es"
      imageAlt="Link a www.amazen.dtpf.es"
      image={amazenImage}
      contentTitle="Amazén Eccomerce App"
      contentText="Amazén es un proyecto desarrollado como parte del segundo módulo 
      del Máster en Desarrollo de Software. 
      Se trata de una clon de Amazon con autentificación de usuarios y rol de 
      administrador para la gestión del contenido y estadisticas del eccomerce."
      modalTitle="Clon de Amazon"
      modalImage1={ModalImage1}
      modalImage2={ModalImage2}
      modalImage3={ModalImage3}
      modalImageAlt="Imágen de www.amazen.dtpf.es"
      modalDate="Mayo 2020"
      modalIntroduction="El proyecto se ha llevado a cabo siguiendo la metodología SCRUM con la 
        herramienta de ClickUp y aplicando integración continua. Para el backend, 
        he utilizado NodeJS y Express para el enrutamiento, y se ha implementado 
        la autenticación y autorización de usuarios haciendo uso de JWT. En cuanto 
        al frontend, se ha desarrollado con React, utilizando Ant Design como 
        framework de diseño para el panel de administrador y Workbox para la 
        implementación de service workers."
      modalText={[
        `Para más información:`,
        `・ Backend: https://github.com/DTPF/amazen-ecommerce-node.git`,
        `・ Frontend: https://github.com/DTPF/amazen-ecommerce.git`
      ]}
      modalTags={[
        "JavaScript",
        "TypeScript",
        "NodeJS",
        "Express",
        "JavaScript",
        "MongoDB",
        "Mongoose",
        "SCSS",
        "Ant Design",
        "JWT",
        "MVC",
        "SOLID",
        "PWA",
        "Git",
        "GitHub",
      ]}
      analyticTag='Amazen'
    />
  )
}