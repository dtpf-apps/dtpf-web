import React, { Suspense, lazy } from "react"
const EducationComponent = lazy(() => import("views/components/Admin/Education"))
const Helmet = lazy(() => import("views/components/Helmet"))

export default function Education() {
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