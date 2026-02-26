import React, { memo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import gtag from 'utils/gtag';
import './CookiesConsent.scss';

function CookiesConsent() {
  const navigate = useNavigate();
  const accept = useCallback(() => {
    gtag();
    navigate(0);
  }, []);
  return (
    <CookieConsent
      location="bottom"
      buttonText="Aceptar"
      cookieName="_gaCookies"
      expires={730}
      onAccept={() => accept()}
    >
      Ayúdame a mejorar tu experiencia utilizando cookies para obtener información estadística anónima. Haz
      click en &laquo;Aceptar&raquo; para aceptar su uso.&nbsp;
      <Link to="/privacy-policy">Política de privacidad</Link>
    </CookieConsent>
  );
}

export default memo(CookiesConsent);
