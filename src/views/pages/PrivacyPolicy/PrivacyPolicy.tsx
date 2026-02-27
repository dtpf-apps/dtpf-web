import React, { Suspense, lazy, memo } from 'react';
import { useNavigate } from 'react-router';
const Helmet = lazy(() => import('views/components/Helmet'));
const ButtonGoBack = lazy(() => import('views/components/UI/ButtonGoBack'));
const PrivacyPolicyComponent = lazy(() => import('views/components/PrivacyPolicy'));

function PrivacyPolicy() {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Política de privacidad"
        contentHelmet="Página de política de privacidad de David T. Pizarro Frick"
      />
      <ButtonGoBack goBack={() => navigate(-1)} eventGoBack="politica-privacidad" />
      <PrivacyPolicyComponent />
    </Suspense>
  );
}

export default memo(PrivacyPolicy);
