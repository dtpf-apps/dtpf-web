import React from "react";
import ProjectLayout from "../ProjectLayout";
import recetasDeliciosasImage from "../../../../assets/img/jpg/recetasmsr.jpg";
import ModalImage1 from "../../../../assets/img/jpg/recetasmsrModalImage1.jpg";
import ModalImage2 from "../../../../assets/img/jpg/recetasmsrModalImage2.jpg";
import ModalImage3 from "../../../../assets/img/jpg/recetasmsrModalImage3.jpg";

export default function RecetasDeliciosasMsr(props: {
  align: string;
  innerWidth: number;
}) {
  const { align, innerWidth } = props;
  return (
    <ProjectLayout
      innerWidth={innerWidth}
      align={align}
      linkToWeb="https://www.recetasmsr.com"
      imageAlt="Link a www.recetasmsr.com"
      image={recetasDeliciosasImage}
      contentTitle="Recetas Deliciosas MSR's"
      contentText="Recetas Deliciosas MSR's es un blog de recetas de cocina, creado
      para agrupar todas las recetas culinarias en un solo sitio. Una aplicación
      web personal con acceso para usuarios previamente
      registrados y verificados."
      modalTitle="Blog de recetas de cocina"
      modalImage1={ModalImage1}
      modalImage2={ModalImage2}
      modalImage3={ModalImage3}
      modalImageAlt="Imágen de www.recetasmsr.com"
      modalDate="Septiembre 2020"
      modalIntroduction="
        Recetas Deliciosas MSR's es el proyecto de final de curso del FP3 de Desarrollo 
        de Aplicaciones Web realizado en solitario. 
      "
      modalText={[
        `Es una aplicación web monolítica de Laravel, con una arquitectura MVC. MySQL
        como sistema de gestión de base de datos. HTML5 y CSS3 para la estructura
        y estilos, haciendo uso de las plantillas blade. Tiene sistema de gestión 
        de usuarios con roles de usuario, un único administrador con todos los 
        privilegios como gestión de contenido, gestión de usuarios, datos de interés 
        para el administrador, entre otros. Usuarios invitados que se diferencian 
        de los usuarios normales por poder publicar recetas. Utilizo el sistema de 
        registro y verificación de usuario propio de Laravel para dar seguridad a 
        la web y por petición de la propietaria. Se podría destacar como mejores 
        utilidades la capacidad de compartir recetas via email con estilos acorde 
        a la web, filtros y búsqueda avanzada de recetas, gestión autónoma del 
        administrador para la gestión de contenido y de usuarios. Además, esta 
        adaptada para todos los dispositivos.`,
      ]}
      modalTags={[
        "PHP",
        "Laravel",
        "HTML5",
        "CSS3",
        "JavaScript",
        "JQuery",
        "MVC",
        "MySQL",
      ]}
    />
  );
}
