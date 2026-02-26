import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo/ContactInfo';
import useScrollToTop from 'hooks/useScrollToTop';
import './Contact.scss';

export default function Contact() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const reportWindowSize = () => {
    setInnerWidth(window.innerWidth);
  };
  useScrollToTop();
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      window.onresize = reportWindowSize;
    }
    return () => {
      unmounted = true;
    };
  }, []);
  return (
    <div className="contact">
      <h1 className="contact__title">Contacto</h1>
      <ContactInfo innerWidth={innerWidth} />
      <ContactForm />
      {innerWidth <= 650 ? (
        <div id="contact-map-mobile-image"></div>
      ) : (
        <div id="contact-map-desktop-image"></div>
      )}
    </div>
  );
}
