import { basePath, apiVersion } from '../../utils/config';
import { IgetUsersAPIResponse, IUserResponse, IupdateUserAPIResponse } from './user.response.interface';

export async function getUsersAPI(): Promise<IgetUsersAPIResponse> {
  const params: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  const response = await fetch(`${basePath}/${apiVersion}/users`, params);
  const data = await response.json();
  return { response, data };
}

export async function updateUserAPI({
  user,
  userId,
}: {
  user: Partial<IUserResponse>;
  userId: string;
}): Promise<IupdateUserAPIResponse> {
  const params: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(user),
  };
  const response = await fetch(`${basePath}/${apiVersion}/update-user/${userId}`, params);
  const data = await response.json();
  return { response, data };
}

export async function deleteUserApi(userId: string) {
  const params: RequestInit = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  const response = await fetch(`${basePath}/${apiVersion}/delete-user/${userId}`, params);
  const data = await response.json();
  return { response, data };
}
