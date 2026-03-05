import React, { Suspense, lazy, memo } from 'react';
const AboutMeAdmin = lazy(() => import('views/components/Admin/AboutMeAdmin'));
const Helmet = lazy(() => import('views/components/Helmet'));

function AboutMeAdminPage() {
  return (
    <Suspense fallback={<></>}>
      <Helmet titleHelmet="DTPF | Admin Sobre Mi" contentHelmet="Página Sobre Mi Admin" />
      <AboutMeAdmin />
    </Suspense>
  );
}

export default memo(AboutMeAdminPage);
