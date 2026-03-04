import { basePath, apiVersion } from './utils/config';
import { makeRequest } from './utils/makeRequest';

export function activateUserApi(userId, status) {
  const url = `${basePath}/${apiVersion}/activate-user/${userId}`;
  return makeRequest(url, true, true, 'PUT', null, JSON.stringify({ active: status }));
}

export function deleteUserApi(userId) {
  const url = `${basePath}/${apiVersion}/delete-user/${userId}`;
  return makeRequest(url, true, true, 'DELETE');
}

export function signUpAdminApi(data) {
  const url = `${basePath}/${apiVersion}/sign-up-admin`;
  return makeRequest(url, true, true, 'POST', null, JSON.stringify(data));
}
