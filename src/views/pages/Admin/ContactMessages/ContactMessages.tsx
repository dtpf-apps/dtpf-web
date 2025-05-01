import React, { useState, Suspense, lazy, memo } from 'react';
const ContactMessagesList = lazy(() => import('views/components/Admin/ContactMessagesList'));
const Helmet = lazy(() => import('views/components/Helmet'));

function ContactMessages() {
  const [reloadMessages, setReloadMessages] = useState(false);
  return (
    <Suspense fallback={<></>}>
      <Helmet titleHelmet="DTPF | Admin Mensajes" contentHelmet="Página admin de Mensajes" />
      <ContactMessagesList reloadMessages={reloadMessages} setReloadMessages={setReloadMessages} />
    </Suspense>
  );
}

export default memo(ContactMessages);
