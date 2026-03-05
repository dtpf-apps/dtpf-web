import * as MenuTypes from './menu.types';
import * as menuAPI from 'api/endpoints/menu/menu.api';
import { IAddMenuBody } from 'api/endpoints/menu/menu.response.interface';
import { notification } from 'antd';
import { notifDelay, notifDelayErr } from 'utils/notifications';
import { TMenuDispatchReducer } from './menu.reducer';

export async function getMenusAction({
  dispatch,
}: {
  dispatch: React.Dispatch<TMenuDispatchReducer>;
}): Promise<boolean> {
  try {
    const apiFetch = await menuAPI.getMenusAPI();
    if (apiFetch.response.status === 200 && apiFetch.data.menu) {
      dispatch({ type: MenuTypes.SET_MENUS, payload: apiFetch.data.menu });
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function addMenuAction({
  dispatch,
  body,
}: {
  dispatch: React.Dispatch<TMenuDispatchReducer>;
  body: IAddMenuBody;
}): Promise<boolean> {
  try {
    const apiFetch = await menuAPI.addMenuAPI({ body });
    if (apiFetch.response.status === 200 || apiFetch.response.status === 201) {
      notification.success({ message: apiFetch.data.message, duration: notifDelay });
      await getMenusAction({ dispatch });
      return true;
    }
    notification.error({ message: apiFetch.data.message, duration: notifDelayErr });
    return false;
  } catch {
    notification.error({ message: 'Error del servidor.', duration: notifDelayErr });
    return false;
  }
}

export async function updateMenuAction({
  dispatch,
  menuId,
  data,
}: {
  dispatch: React.Dispatch<TMenuDispatchReducer>;
  menuId: string;
  data: Record<string, unknown>;
}): Promise<boolean> {
  try {
    const apiFetch = await menuAPI.updateMenuAPI({ menuId, data });
    if (apiFetch.response.status === 200) {
      await getMenusAction({ dispatch });
      return true;
    }
    notification.error({ message: apiFetch.data.message, duration: notifDelayErr });
    return false;
  } catch {
    notification.error({ message: 'Error del servidor.', duration: notifDelayErr });
    return false;
  }
}

export async function activateMenuAction({
  dispatch,
  menuId,
  status,
}: {
  dispatch: React.Dispatch<TMenuDispatchReducer>;
  menuId: string;
  status: boolean;
}): Promise<boolean> {
  try {
    const apiFetch = await menuAPI.activateMenuAPI({ menuId, status });
    if (apiFetch.response.status === 200) {
      if (status) {
        notification.success({ message: apiFetch.data.message, duration: notifDelay });
      } else {
        notification.warning({ message: apiFetch.data.message, duration: notifDelayErr });
      }
      await getMenusAction({ dispatch });
      return true;
    }
    notification.error({ message: apiFetch.data.message, duration: notifDelayErr });
    return false;
  } catch {
    notification.error({ message: 'Error del servidor.', duration: notifDelayErr });
    return false;
  }
}

export async function deleteMenuAction({
  dispatch,
  menuId,
}: {
  dispatch: React.Dispatch<TMenuDispatchReducer>;
  menuId: string;
}): Promise<boolean> {
  try {
    const apiFetch = await menuAPI.deleteMenuAPI({ menuId });
    if (apiFetch.response.status === 200) {
      notification.success({ message: apiFetch.data.message, duration: notifDelay });
      await getMenusAction({ dispatch });
      return true;
    }
    notification.error({ message: apiFetch.data.message, duration: notifDelayErr });
    return false;
  } catch {
    notification.error({
      message: 'Error del servidor, inténtelo más tarde.',
      duration: notifDelayErr,
    });
    return false;
  }
}
