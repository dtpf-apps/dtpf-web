import React, { Suspense, lazy } from "react"
const Helmet = lazy(() => import("views/components/Helmet"))
const ProjectsWeb = lazy(() => import("views/components/Web/ProjectsWeb"))
const ButtonGoBack = lazy(() => import("views/components/UI/ButtonGoBack"))
const MainMenuBigButtons = lazy(() => import("views/components/Web/MainMenuBigButtons"))

export default function Projects(props: any) {
  const { location, history } = props
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Proyectos"
        contentHelmet="Página de proyectos realizados por David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={history.goBack} eventGoBack="proyectos" />
      <ProjectsWeb />
      <MainMenuBigButtons location={location.pathname} />
    </Suspense>
  )
}