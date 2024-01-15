import React, { Suspense, lazy, memo } from "react"
const EducationComponent = lazy(() => import("views/components/Admin/Education"))
const Helmet = lazy(() => import("views/components/Helmet"))

function Education() {
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Admin Cursos"
        contentHelmet="Página Admin de Cursos"
      />
      <EducationComponent />
    </Suspense>
  )
}

export default memo(Education)