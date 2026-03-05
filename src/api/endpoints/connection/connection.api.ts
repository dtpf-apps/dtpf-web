import { fetchAPI, apiUrl } from '../../utils/fetchHelper';

export async function connectionAPI(): Promise<{ response: Response; data: unknown }> {
  return fetchAPI<unknown>(apiUrl('connection'));
}
