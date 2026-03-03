const DAUTH_ACCESS_TOKEN_KEY = 'dauth_state';

export function getAccessTokenApi(): string | null {
  const token = localStorage.getItem(DAUTH_ACCESS_TOKEN_KEY);
  if (!token || token === 'null') {
    return null;
  }
  return token;
}
