import React, { Suspense, lazy, memo } from 'react';
import { useNavigate } from 'react-router';
const Helmet = lazy(() => import('views/components/Helmet'));
const ContactPage = lazy(() => import('views/components/Web/Contact'));
const ButtonGoBack = lazy(() => import('views/components/UI/ButtonGoBack'));

function Contact() {
  const navigate = useNavigate();
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Contacto"
        contentHelmet="Página para contactar con David T. Pizarro Frick"
      />
      <ButtonGoBack goBack={() => navigate(-1)} eventGoBack="contacto" />
      <ContactPage />
    </Suspense>
  );
}

export default memo(Contact);
