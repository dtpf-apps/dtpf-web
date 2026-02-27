import React, { Suspense, lazy, memo } from 'react';
import { useNavigate } from 'react-router';
import './Curriculum.scss';
const Helmet = lazy(() => import('views/components/Helmet'));
const CurriculumWeb = lazy(() => import('views/components/Web/Curriculum'));
const ButtonGoBack = lazy(() => import('views/components/UI/ButtonGoBack'));

function Curriculum() {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<></>}>
      <Helmet titleHelmet="DTPF | Curriculum" contentHelmet="Curriculum de David T. Pizarro Frick" />
      <ButtonGoBack goBack={() => navigate(-1)} eventGoBack="curriculum" />
      <CurriculumWeb />
    </Suspense>
  );
}

export default memo(Curriculum);
