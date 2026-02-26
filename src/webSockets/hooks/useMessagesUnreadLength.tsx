import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { ENDPOINT } from '../../config/url';

export default function useMessagesUnreadLength() {
  const [messagesUnreadLength, setMessagesUnreadLength] = useState(null);
  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on('getMessagesLength', (data: any) => {
      setMessagesUnreadLength(data);
    });
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return messagesUnreadLength;
}
