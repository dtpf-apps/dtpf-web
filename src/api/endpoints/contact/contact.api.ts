import { fetchAPI, apiUrl, buildUrl } from '../../utils/fetchHelper';
import {
  IGetMessagesResponse,
  IContactMutationResponse,
  ISubmitContactBody,
  IMessagesStatusResponse,
} from './contact.response.interface';

export async function submitContactAPI({
  body,
}: {
  body: ISubmitContactBody;
}): Promise<IContactMutationResponse> {
  return fetchAPI<IContactMutationResponse['data']>(apiUrl('contact-me'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function getMessagesAPI({ readed }: { readed: boolean }): Promise<IGetMessagesResponse> {
  return fetchAPI<IGetMessagesResponse['data']>(
    buildUrl(apiUrl('get-contact-messages-unread'), { readed: String(readed) })
  );
}

export async function checkMessageAPI({
  messageId,
  readed,
}: {
  messageId: string;
  readed: boolean;
}): Promise<IContactMutationResponse> {
  return fetchAPI<IContactMutationResponse['data']>(apiUrl(`check-contact-message/${messageId}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ readed }),
  });
}

export async function deleteContactMessageAPI({
  messageId,
}: {
  messageId: string;
}): Promise<IContactMutationResponse> {
  return fetchAPI<IContactMutationResponse['data']>(apiUrl(`delete-contact-message/${messageId}`), {
    method: 'DELETE',
  });
}

export async function reloadMessagesAPI({
  haveToReload,
}: {
  haveToReload: boolean;
}): Promise<{ response: Response; data: unknown }> {
  return fetchAPI<unknown>(apiUrl(`reload-messages/${haveToReload}`), {
    method: 'POST',
  });
}

export async function messagesStatusAPI(): Promise<IMessagesStatusResponse> {
  return fetchAPI<IMessagesStatusResponse['data']>(apiUrl('messages-status'));
}

export async function getLastMessageAPI(): Promise<{ response: Response; data: { email?: string } }> {
  return fetchAPI<{ email?: string }>(apiUrl('get-last-message-email'));
}
