import { basePath, apiVersion } from './utils/config';
import { makeRequest } from '../api/utils/makeRequest';

export function getMenuApi() {
  const url = `${basePath}/${apiVersion}/get-menus`;
  return makeRequest(url);
}

export function updateMenuApi(token, menuId, data) {
  const url = `${basePath}/${apiVersion}/update-menu/${menuId}`;
  return makeRequest(url, true, true, 'PUT', token, JSON.stringify(data));
}

export function activateMenuApi(token, menuId, status) {
  const url = `${basePath}/${apiVersion}/activate-menu/${menuId}`;
  return makeRequest(url, true, true, 'PUT', token, JSON.stringify({ active: status }));
}

export function addMenuApi(token, menu) {
  const url = `${basePath}/${apiVersion}/add-menu`;
  return makeRequest(url, true, true, 'POST', token, JSON.stringify(menu));
}

export function deleteMenuApi(token, menuId) {
  const url = `${basePath}/${apiVersion}/delete-menu/${menuId}`;
  return makeRequest(url, true, true, 'DELETE', token);
}
