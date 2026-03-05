/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useMemo, useCallback, memo } from 'react';
import ContactContext from './ContactContext';
import initialContactState from './initialContactState';
import contactReducer from './reducer/contact.reducer';
import * as action from './reducer/contact.actions';
import { ISubmitContactBody } from 'api/endpoints/contact/contact.response.interface';
import { ChildrenProps } from 'interfaces/general.interface';

function ContactProvider({ children }: ChildrenProps) {
  const [state, dispatch] = useReducer(contactReducer, initialContactState);

  const loadMessages = useCallback(async () => {
    return action.loadMessagesAction({ dispatch });
  }, []);

  const submitContact = useCallback(async (body: ISubmitContactBody) => {
    return action.submitContactAction({ body });
  }, []);

  const checkMessage = useCallback(async (messageId: string, readed: boolean) => {
    return action.checkMessageAction({ dispatch, messageId, readed });
  }, []);

  const deleteMessage = useCallback(async (messageId: string) => {
    return action.deleteMessageAction({ dispatch, messageId });
  }, []);

  const memoProvider = useMemo(
    () => ({
      ...state,
      loadMessages,
      submitContact,
      checkMessage,
      deleteMessage,
    }),
    [state, loadMessages, submitContact, checkMessage, deleteMessage]
  );

  return <ContactContext.Provider value={memoProvider}>{children}</ContactContext.Provider>;
}

export default memo(ContactProvider);
