import React, { Suspense, lazy, memo } from 'react';
const Helmet = lazy(() => import('views/components/Helmet'));
const ButtonGoBack = lazy(() => import('views/components/UI/ButtonGoBack'));
const PrivacyPolicyComponent = lazy(() => import('views/components/PrivacyPolicy'));

function PrivacyPolicy(props: any) {
  const { history } = props;
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Política de privacidad"
        contentHelmet="Página de política de privacidad de David T. Pizarro Frick"
      />
      <ButtonGoBack goBack={history.goBack} eventGoBack="politica-privacidad" />
      <PrivacyPolicyComponent />
    </Suspense>
  );
}

export default memo(PrivacyPolicy);
