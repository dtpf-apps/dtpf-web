import React, { Suspense, lazy, memo } from "react"
const Helmet = lazy(() => import("views/components/Helmet"))
const Home = lazy(() => import("views/components/Admin/Home"))

function Admin() {
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Admin"
        contentHelmet="Página principal de Admin"
      />
      <Home />
    </Suspense>
  )
}

export default memo(Admin)