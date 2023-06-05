import React from "react"
import ProjectLayout from "../ProjectLayout"
import beFriendsImage from "assets/img/projects/beFriends/befriends.webp"
import ModalImage1 from "assets/img/projects/beFriends/befriendsModalImage1.webp"
import ModalImage2 from "assets/img/projects/beFriends/befriendsModalImage2.webp"
import ModalImage3 from "assets/img/projects/beFriends/befriendsModalImage3.webp"

export default function BeFriends(props: {
  align: string
  innerWidth: number
}) {
  const { align, innerWidth } = props
  return (
    <ProjectLayout
      innerWidth={innerWidth}
      align={align}
      linkToWeb="https://www.befriends.dtpf.es"
      imageAlt="Link a www.befriends.dtpf.es"
      image={beFriendsImage}
      contentTitle="BeFriends Social App"
      contentText="BeFriends es un proyecto colaborativo de fin de módulo de máster 
      realizado con PHP y JavaScript Vanilla. Consiste en una red social al estilo 
      de Instagram."
      modalTitle="Social App estilo Instagram"
      modalImage1={ModalImage1}
      modalImage2={ModalImage2}
      modalImage3={ModalImage3}
      modalImageAlt="Imágen de www.befriends.dtpf.es"
      modalDate="Septiembre 2020"
      modalIntroduction="Para su desarrollo, se han utilizado diversas herramientas 
      y tecnologías, entre las que destacan:"
      modalText={[
        `・Figma para la creación de los mockups.`,
        `・Dia para la elaboración de los diagramas`,
        `・PHP para el backend.`,
        `・MySQL para la persistencia de los datos.`,
        `・HTML5 y CSS3 para la maquetación.`,
        `・JavaScript para la interacción reactiva con la aplicación.`,
        `Para más información:`,
        `・ Github: https://github.com/jesusfvj/beFriends`
      ]}
      modalTags={[
        "PHP",
        "HTML5",
        "CSS3",
        "JavaScript",
        "MVC",
        "MySQL",
        "Figma",
        "Dia"
      ]}
      analyticTag='BeFriends'
    />
  )
}