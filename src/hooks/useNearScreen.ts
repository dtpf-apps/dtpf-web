import React, { useState, useEffect, useRef } from 'react';

export function useNearScreen() {
  const el = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [show, setShow] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const observer = new IntersectionObserver(function (entries) {
      const { isIntersecting } = entries[0];
      if (isIntersecting) {
        isMounted && setShow(true);
        observer.disconnect();
      }
    });
    if (el.current) {
      observer.observe(el.current);
    }
    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [el]);

  return [show, el];
}
