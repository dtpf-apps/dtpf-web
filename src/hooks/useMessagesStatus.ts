import { useState, useEffect } from 'react';
import { messagesStatusApi } from '../api/utils';

export default function useMessagesStatus() {
  const [messagesStatus, setMessagesStatus] = useState(false);

  useEffect(() => {
    let unmounted = false;
    messagesStatusApi().then((response) => {
      if (!unmounted) {
        setMessagesStatus(response.messagesStatus);
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;
    const interval = setInterval(() => {
      messagesStatusApi().then((response) => {
        if (!unmounted) {
          setMessagesStatus(response.messagesStatus);
        }
      });
    }, 1000);
    return () => {
      unmounted = true;
      clearInterval(interval);
    };
  }, []);

  return { messagesStatus, setMessagesStatus };
}
