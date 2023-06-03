import React, { useState, Suspense, lazy } from "react"
const AboutMeAdmin = lazy(() => import("views/components/Admin/AboutMeAdmin"))
const Helmet = lazy(() => import("views/components/Helmet"))

export default function AboutMeAdminPage() {
  const [reloadAboutMeAdmin, setReloadAboutMeAdmin] = useState(false)
  return (
    <Suspense fallback={<></>}>
      <Helmet titleHelmet="DTPF | Admin Sobre Mi" contentHelmet="Página Sobre Mi Admin" />
      <AboutMeAdmin
        reloadAboutMeAdmin={reloadAboutMeAdmin}
        setReloadAboutMeAdmin={setReloadAboutMeAdmin}
      />
    </Suspense>
  )
}