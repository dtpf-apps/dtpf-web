import React, { Suspense, lazy } from "react"
const Helmet = lazy(() => import("views/components/Helmet"))
const AboutMeWeb = lazy(() => import("views/components/Web/AboutMeWeb"))
const ButtonGoBack = lazy(() => import("views/components/UI/ButtonGoBack"))
const MainMenuBigButtons = lazy(() => import("views/components/Web/MainMenuBigButtons"))

export default function AboutMe(props: any) {
  const { location, history } = props
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Sobre Mi"
        contentHelmet="Página sobre David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={history.goBack} eventGoBack="sobre-mi" />
      <AboutMeWeb />
      <MainMenuBigButtons location={location.pathname} />
    </Suspense>
  )
}