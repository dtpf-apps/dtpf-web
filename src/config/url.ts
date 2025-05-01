import { isLocalhost } from '../utils/isLocalhost';
export const URL = isLocalhost
  ? `${window.location.protocol}//${window.location.hostname}:3000/`
  : `${window.location.origin}/`;
export const ENDPOINT = isLocalhost
  ? `${window.location.protocol}//${window.location.hostname}:3998/`
  : window.location.origin;
