import React, { useState, Suspense, lazy, memo } from "react"
const ListUsers = lazy(() => import("views/components/Admin/Users/ListUsers"))
const Helmet = lazy(() => import("views/components/Helmet"))

function Users() {
  const [reloadUsers, setReloadUsers] = useState(false)
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Admin Usuarios"
        contentHelmet="Página Admin de Usuarios"
      />
      <ListUsers
        reloadUsers={reloadUsers}
        setReloadUsers={setReloadUsers}
      />
    </Suspense>
  )
}

export default memo(Users)