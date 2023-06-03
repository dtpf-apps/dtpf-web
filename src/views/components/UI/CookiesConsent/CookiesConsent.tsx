import React from "react";
import { useHistory, Link } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import gtag from "utils/gtag";
import "./CookiesConsent.scss";

export default function CookiesConsent() {
  const history = useHistory();
  const accept = () => {
    gtag();
    history.go(0);
  };
  return (
    <CookieConsent
      location="bottom"
      buttonText="Aceptar"
      cookieName="_gaCookies"
      expires={730}
      onAccept={() => accept()}
    >
      Ayúdame a mejorar tu experiencia utilizando cookies para obtener
      información estadística anónima. Haz click en &laquo;Aceptar&raquo; para
      aceptar su uso.&nbsp;
      <Link to="/privacy-policy">Política de privacidad</Link>
    </CookieConsent>
  );
}
