import * as ContactTypes from './contact.types';
import * as contactAPI from 'api/endpoints/contact/contact.api';
import { ISubmitContactBody } from 'api/endpoints/contact/contact.response.interface';
import { message as messageAnt } from 'antd';
import { TContactDispatchReducer } from './contact.reducer';

export async function loadMessagesAction({
  dispatch,
}: {
  dispatch: React.Dispatch<TContactDispatchReducer>;
}): Promise<boolean> {
  dispatch({ type: ContactTypes.SET_IS_LOADING, payload: true });
  try {
    const [unreadFetch, readFetch] = await Promise.all([
      contactAPI.getMessagesAPI({ readed: false }),
      contactAPI.getMessagesAPI({ readed: true }),
    ]);
    if (unreadFetch.response.status === 200 && unreadFetch.data.messages) {
      dispatch({ type: ContactTypes.SET_UNREAD_MESSAGES, payload: unreadFetch.data.messages });
    }
    if (readFetch.response.status === 200 && readFetch.data.messages) {
      dispatch({ type: ContactTypes.SET_READ_MESSAGES, payload: readFetch.data.messages });
    }
    return true;
  } catch {
    return false;
  } finally {
    dispatch({ type: ContactTypes.SET_IS_LOADING, payload: false });
  }
}

export async function submitContactAction({ body }: { body: ISubmitContactBody }): Promise<boolean> {
  try {
    const apiFetch = await contactAPI.submitContactAPI({ body });
    if (apiFetch.response.status === 200) {
      await contactAPI.reloadMessagesAPI({ haveToReload: true });
      return true;
    }
    if (apiFetch.data.message) {
      messageAnt.warning(apiFetch.data.message);
    }
    return false;
  } catch {
    messageAnt.error('No se ha podido enviar el mensaje.');
    return false;
  }
}

export async function checkMessageAction({
  dispatch,
  messageId,
  readed,
}: {
  dispatch: React.Dispatch<TContactDispatchReducer>;
  messageId: string;
  readed: boolean;
}): Promise<boolean> {
  try {
    if (readed) {
      await contactAPI.reloadMessagesAPI({ haveToReload: true });
    }
    const apiFetch = await contactAPI.checkMessageAPI({ messageId, readed });
    if (apiFetch.response.status === 200) {
      messageAnt.success(apiFetch.data.message);
      await loadMessagesAction({ dispatch });
      return true;
    }
    messageAnt.error(apiFetch.data.message);
    return false;
  } catch {
    messageAnt.error('Error del servidor.');
    return false;
  }
}

export async function deleteMessageAction({
  dispatch,
  messageId,
}: {
  dispatch: React.Dispatch<TContactDispatchReducer>;
  messageId: string;
}): Promise<boolean> {
  try {
    const apiFetch = await contactAPI.deleteContactMessageAPI({ messageId });
    if (apiFetch.response.status === 200) {
      messageAnt.success(apiFetch.data.message);
      await loadMessagesAction({ dispatch });
      return true;
    }
    messageAnt.warning(apiFetch.data.message);
    return false;
  } catch {
    messageAnt.error('Error del servidor.');
    return false;
  }
}
