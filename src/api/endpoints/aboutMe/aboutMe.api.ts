import { basePath, apiVersion } from '../../utils/config';
import {
  IgetAboutMeInfoAPIResponse,
  IgetAboutMeInfoAPIResponseInfo,
  IupdateAboutMeInfoAPIResponse,
} from './brandUsers.response.interface';

export async function getAboutMeInfoAPI({ key }: { key: string }): Promise<IgetAboutMeInfoAPIResponse> {
  const params: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  const response = await fetch(`${basePath}/${apiVersion}/get-about-me-info/${key}`, params);
  const data = await response.json();
  return { response, data };
}

export async function updateAboutMeInfoAPI({
  newData,
  key,
}: {
  newData: IgetAboutMeInfoAPIResponseInfo;
  key: string;
}): Promise<IupdateAboutMeInfoAPIResponse> {
  const params: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(newData),
  };
  const response = await fetch(`${basePath}/${apiVersion}/update-about-me-info/${key}`, params);
  const data = await response.json();
  return { response, data };
}
