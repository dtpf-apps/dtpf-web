import { isLocalhost } from '../../utils/isLocalhost';
export const apiVersion = 'v1';
export const basePath = isLocalhost
  ? `${window.location.protocol}//${window.location.hostname}:3998/api`
  : `${window.location.origin}/api`;

export function apiUrl(path: string) {
  return `${basePath}/${apiVersion}${path.startsWith('/') ? path : `/${path}`}`;
}
