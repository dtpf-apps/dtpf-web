import React, { Suspense, lazy, memo } from 'react';
const ContactMessagesList = lazy(() => import('views/components/Admin/ContactMessagesList'));
const Helmet = lazy(() => import('views/components/Helmet'));

function ContactMessages() {
  return (
    <Suspense fallback={<></>}>
      <Helmet titleHelmet="DTPF | Admin Mensajes" contentHelmet="Página admin de Mensajes" />
      <ContactMessagesList />
    </Suspense>
  );
}

export default memo(ContactMessages);
