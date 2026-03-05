import { fetchAPI, apiUrl } from '../../utils/fetchHelper';
import {
  IGetAboutMeInfoResponse,
  IAboutMeInfo,
  IUpdateAboutMeInfoResponse,
} from './aboutMe.response.interface';

export async function getAboutMeInfoAPI({ key }: { key: string }): Promise<IGetAboutMeInfoResponse> {
  return fetchAPI<IGetAboutMeInfoResponse['data']>(apiUrl(`get-about-me-info/${key}`));
}

export async function updateAboutMeInfoAPI({
  newData,
  key,
}: {
  newData: IAboutMeInfo;
  key: string;
}): Promise<IUpdateAboutMeInfoResponse> {
  return fetchAPI<IUpdateAboutMeInfoResponse['data']>(apiUrl(`update-about-me-info/${key}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData),
  });
}
