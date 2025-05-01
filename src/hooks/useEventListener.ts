import { useRef, useEffect } from 'react';
import { isMobile as isMobileRDD } from 'react-device-detect';

export default function useEventListener(eventName: string, handler: () => void, isMobile: boolean, element = window) {
  const savedHandler: any = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    const eventListener = (event: any) => savedHandler.current(event);
    if (isMobile) {
      isMobileRDD && element.addEventListener(eventName, eventListener);
    } else if (isMobile === false) {
      !isMobileRDD && element.addEventListener(eventName, eventListener);
    } else {
      element.addEventListener(eventName, eventListener);
    }
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName, element]);
}
