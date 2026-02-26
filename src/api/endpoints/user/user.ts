import { basePath, apiVersion } from '../../utils/config';
import {
  IgetAvatarAPIResponse,
  IgetUsersAPIResponse,
  IsignInAPIBody,
  IsignInAPIResponse,
  IsignUpAPIBody,
  IsignUpAPIResponse,
  IupdateUserAPIResponse,
  IuploadAvatarAPIResponse,
  IUserResponse,
} from './user.response.interface';

export async function signUpAPI({ body }: { body: IsignUpAPIBody }): Promise<IsignUpAPIResponse> {
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${basePath}/${apiVersion}/sign-up`, params);
  const data = await response.json();
  return { response, data };
}

export async function signInAPI({ body }: { body: IsignInAPIBody }): Promise<IsignInAPIResponse> {
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${basePath}/${apiVersion}/sign-in`, params);
  const data = await response.json();
  return { response, data };
}

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

export async function uploadAvatarAPI({
  token,
  avatar,
  userId,
}: {
  token: string;
  avatar: File;
  userId: string;
}): Promise<IuploadAvatarAPIResponse> {
  const formData = new FormData();
  formData.append('avatar', avatar);
  const params = {
    method: 'PUT',
    headers: {
      Authorization: token,
    },
    body: formData,
  };
  const response = await fetch(`${basePath}/${apiVersion}/upload-avatar/${userId}`, params);
  const data = await response.json();
  return { response, data };
}

export async function getAvatarAPI({ avatar }: { avatar: string }): Promise<IgetAvatarAPIResponse> {
  const response = await fetch(`${basePath}/${apiVersion}/get-avatar/${avatar}`);

  const contentType = response.headers.get('Content-Type');

  if (!response.ok) {
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      return { data };
    } else {
      return { data: { message: 'Error al obtener el avatar.' } };
    }
  }

  if (contentType?.startsWith('image/')) {
    return { response };
  } else {
    return { data: { message: 'Error: el recurso no es una imagen.' } };
  }
}

export async function updateUserAPI({
  token,
  user,
  userId,
}: {
  token: string;
  user: Partial<IUserResponse & { password: string; repeatPassword: string }>;
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

export async function activateUserApi(token: string, userId: string, status: boolean) {
  const params = {
    method: 'PUT',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ active: status }),
  };
  const response = await fetch(`${basePath}/${apiVersion}/activate-user/${userId}`, params);
  const data = await response.json();
  return { response, data };
  // return makeRequest(url, true, true, 'PUT', token, JSON.stringify({ active: status }));
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
  // return makeRequest(url, true, true, 'DELETE', token);
}

export async function signUpAdminApi(token: string, body: any) {
  const params = {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${basePath}/${apiVersion}/sign-up-admin`, params);
  const data = await response.json();
  return { response, data };
  // return makeRequest(url, true, true, 'POST', token, JSON.stringify(body));
}
