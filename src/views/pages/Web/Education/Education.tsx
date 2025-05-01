import React, { Suspense, lazy, memo } from 'react';
import './Education.scss';
const Helmet = lazy(() => import('views/components/Helmet'));
const EducationWeb = lazy(() => import('views/components/Web/Education'));
const ButtonGoBack = lazy(() => import('views/components/UI/ButtonGoBack'));

function Education(props: any) {
  const { location, history } = props;
  return (
    <Suspense fallback={<></>}>
      <Helmet titleHelmet="DTPF | Formación IT" contentHelmet="Página de Formación en tecnologías de la información" />
      <ButtonGoBack goBack={history.goBack} eventGoBack="formacion" />
      <EducationWeb location={location} history={history} />
    </Suspense>
  );
}

export default memo(Education);
