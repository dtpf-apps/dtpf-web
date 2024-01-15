import React, { useState, Suspense, lazy, memo } from "react";
const MenuWebList = lazy(() => import("views/components/Admin/MenuWeb/MenuWebList"));
const Helmet = lazy(() => import("views/components/Helmet"));

function MenuWeb() {
  const [reloadMenuWeb, setReloadMenuWeb] = useState(false);
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Admin Menú Web"
        contentHelmet="Página Admin de Menú Web"
      />
      <MenuWebList reloadMenuWeb={reloadMenuWeb} setReloadMenuWeb={setReloadMenuWeb} />
    </Suspense>
  );
}

export default memo(MenuWeb);