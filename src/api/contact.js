import { apiVersion, basePath } from "./utils/config";
import { makeRequest } from "../api/utils/makeRequest";

export function subscribeContactApi(data) {
  const url = `${basePath}/${apiVersion}/contact-me`;
  return makeRequest(url, true, true, "POST", null, JSON.stringify(data));
}

export function getMessagesUnreadApi(token, status) {
  const url = `${basePath}/${apiVersion}/get-contact-messages-unread?readed=${status}`;
  return makeRequest(url, true, true, "GET", token);
}

export function checkMessageApi(token, messageId, status) {
  const url = `${basePath}/${apiVersion}/check-contact-message/${messageId}`;
  return makeRequest(
    url,
    true,
    true,
    "PUT",
    token,
    JSON.stringify({ readed: status })
  );
}

export function deleteContactMessageApi(token, messageId) {
  const url = `${basePath}/${apiVersion}/delete-contact-message/${messageId}`;
  return makeRequest(url, true, true, "DELETE", token);
}

export function getLastMessageApi(token) {
  const url = `${basePath}/${apiVersion}/get-last-message-email`;
  return makeRequest(url, true, false, "GET", token);
}
