import { fetchAPI, apiUrl } from '../../utils/fetchHelper';
import { IGetMenusResponse, IMenuMutationResponse, IAddMenuBody } from './menu.response.interface';

export async function getMenusAPI(): Promise<IGetMenusResponse> {
  return fetchAPI<IGetMenusResponse['data']>(apiUrl('get-menus'));
}

export async function addMenuAPI({ body }: { body: IAddMenuBody }): Promise<IMenuMutationResponse> {
  return fetchAPI<IMenuMutationResponse['data']>(apiUrl('add-menu'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function updateMenuAPI({
  menuId,
  data,
}: {
  menuId: string;
  data: Record<string, unknown>;
}): Promise<IMenuMutationResponse> {
  return fetchAPI<IMenuMutationResponse['data']>(apiUrl(`update-menu/${menuId}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function activateMenuAPI({
  menuId,
  status,
}: {
  menuId: string;
  status: boolean;
}): Promise<IMenuMutationResponse> {
  return fetchAPI<IMenuMutationResponse['data']>(apiUrl(`activate-menu/${menuId}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ active: status }),
  });
}

export async function deleteMenuAPI({ menuId }: { menuId: string }): Promise<IMenuMutationResponse> {
  return fetchAPI<IMenuMutationResponse['data']>(apiUrl(`delete-menu/${menuId}`), {
    method: 'DELETE',
  });
}
