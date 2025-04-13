import React, { Suspense, lazy, memo } from "react"
import "./Curriculum.scss"
const Helmet = lazy(() => import("views/components/Helmet"))
const CurriculumWeb = lazy(() => import("views/components/Web/Curriculum"))
const ButtonGoBack = lazy(() => import("views/components/UI/ButtonGoBack"))

function Curriculum(props: any) {
  const { history } = props
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Curriculum"
        contentHelmet="Curriculum de David T. Pizarro Frick"
      />
      <ButtonGoBack goBack={history.goBack} eventGoBack="curriculum" />
      <CurriculumWeb />
    </Suspense>
  )
}

export default memo(Curriculum)