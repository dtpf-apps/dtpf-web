import { basePath, apiVersion } from './config';

export function apiUrl(path: string): string {
  return `${basePath}/${apiVersion}/${path}`;
}

export function buildUrl(base: string, params: Record<string, string | number | boolean>): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    searchParams.append(key, String(value));
  }
  return `${base}?${searchParams.toString()}`;
}

export async function fetchAPI<T>(
  url: string,
  options?: RequestInit
): Promise<{ response: Response; data: T }> {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
  });
  let data: T;
  try {
    data = await response.json();
  } catch {
    data = null as T;
  }
  return { response, data };
}
