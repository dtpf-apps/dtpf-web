import { basePath, apiVersion } from "./utils/config";
import { makeRequest } from "../api/utils/makeRequest";

export function connectionApi() {
  const url = `${basePath}/${apiVersion}/connection`;
  return makeRequest(url);
}

export function reloadMessagesApi(haveToReload) {
  const url = `${basePath}/${apiVersion}/reload-messages/${haveToReload}`;
  return makeRequest(url, true, false, "POST");
}

export function messagesStatusApi() {
  const url = `${basePath}/${apiVersion}/messages-status`;
  return makeRequest(url);
}

export function getIndexedDBVersionApi() {
  const url = `${basePath}/${apiVersion}/get-indexeddb-version`;
  return makeRequest(url);
}

export function updateIndexedDBVersionApi() {
  const url = `${basePath}/${apiVersion}/update-indexeddb-version`;
  return makeRequest(url, true, true, "PUT");
}
