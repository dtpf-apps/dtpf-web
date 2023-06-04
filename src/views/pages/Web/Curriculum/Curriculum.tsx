import React, { Suspense, lazy } from "react"
import "./Curriculum.scss"
const Helmet = lazy(() => import("views/components/Helmet"))
const CurriculumWeb = lazy(() => import("views/components/Web/Curriculum"))
const ButtonGoBack = lazy(() => import("views/components/UI/ButtonGoBack"))

export default function Curriculum(props: any) {
  const { history } = props
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Curriculum"
        contentHelmet="Curriculum de David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={history.goBack} eventGoBack="curriculum" />
      <CurriculumWeb />
    </Suspense>
  )
}