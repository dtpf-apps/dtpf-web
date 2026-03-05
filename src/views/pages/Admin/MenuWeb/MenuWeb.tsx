import React, { Suspense, lazy, memo } from 'react';
const MenuWebList = lazy(() => import('views/components/Admin/MenuWeb/MenuWebList/MenuWebList'));
const Helmet = lazy(() => import('views/components/Helmet'));

function MenuWeb() {
  return (
    <Suspense fallback={<></>}>
      <Helmet titleHelmet="DTPF | Admin Menú Web" contentHelmet="Página Admin de Menú Web" />
      <MenuWebList />
    </Suspense>
  );
}

export default memo(MenuWeb);
