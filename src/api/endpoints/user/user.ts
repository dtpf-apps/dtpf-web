import { basePath, apiVersion } from '../../utils/config';
import { IgetUsersAPIResponse, IUserResponse, IupdateUserAPIResponse } from './user.response.interface';

export async function getUsersAPI({ token }: { token: string }): Promise<IgetUsersAPIResponse> {
  const params = {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(`${basePath}/${apiVersion}/users`, params);
  const data = await response.json();
  return { response, data };
}

export async function updateUserAPI({
  token,
  user,
  userId,
}: {
  token: string;
  user: Partial<IUserResponse>;
  userId: string;
}): Promise<IupdateUserAPIResponse> {
  const params = {
    method: 'PUT',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(`${basePath}/${apiVersion}/update-user/${userId}`, params);
  const data = await response.json();
  return { response, data };
}

export async function deleteUserApi(token: string, userId: string) {
  const params = {
    method: 'DELETE',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(`${basePath}/${apiVersion}/delete-user/${userId}`, params);
  const data = await response.json();
  return { response, data };
}
