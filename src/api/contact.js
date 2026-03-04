import { apiVersion, basePath } from './utils/config';
import { makeRequest } from '../api/utils/makeRequest';

export function subscribeContactApi(data) {
  const url = `${basePath}/${apiVersion}/contact-me`;
  return makeRequest(url, true, true, 'POST', null, JSON.stringify(data));
}

export function getMessagesUnreadApi(status) {
  const url = `${basePath}/${apiVersion}/get-contact-messages-unread?readed=${status}`;
  return makeRequest(url, true, true, 'GET');
}

export function checkMessageApi(messageId, status) {
  const url = `${basePath}/${apiVersion}/check-contact-message/${messageId}`;
  return makeRequest(url, true, true, 'PUT', null, JSON.stringify({ readed: status }));
}

export function deleteContactMessageApi(messageId) {
  const url = `${basePath}/${apiVersion}/delete-contact-message/${messageId}`;
  return makeRequest(url, true, true, 'DELETE');
}

export function getLastMessageApi() {
  const url = `${basePath}/${apiVersion}/get-last-message-email`;
  return makeRequest(url, true, false, 'GET');
}
