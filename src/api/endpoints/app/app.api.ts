import { fetchAPI, apiUrl } from '../../utils/fetchHelper';
import { IGetIndexedDBVersionResponse, IUpdateIndexedDBVersionResponse } from './app.response.interface';

export async function getIndexedDBVersionAPI(): Promise<IGetIndexedDBVersionResponse> {
  return fetchAPI<IGetIndexedDBVersionResponse['data']>(apiUrl('get-indexeddb-version'));
}

export async function updateIndexedDBVersionAPI(): Promise<IUpdateIndexedDBVersionResponse> {
  return fetchAPI<IUpdateIndexedDBVersionResponse['data']>(apiUrl('update-indexeddb-version'), {
    method: 'PUT',
  });
}
