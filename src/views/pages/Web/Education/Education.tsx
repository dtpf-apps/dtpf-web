import React, { Suspense, lazy, memo } from 'react';
import { useNavigate } from 'react-router';
import './Education.scss';
const Helmet = lazy(() => import('views/components/Helmet'));
const EducationWeb = lazy(() => import('views/components/Web/Education'));
const ButtonGoBack = lazy(() => import('views/components/UI/ButtonGoBack'));

function Education() {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Formación IT"
        contentHelmet="Página de Formación en tecnologías de la información"
      />
      <ButtonGoBack goBack={() => navigate(-1)} eventGoBack="formacion" />
      <EducationWeb />
    </Suspense>
  );
}

export default memo(Education);
