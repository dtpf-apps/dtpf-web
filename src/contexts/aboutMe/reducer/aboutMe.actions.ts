import * as AboutMeTypes from './aboutMe.types';
import * as aboutMeAPI from 'api/endpoints/aboutMe/aboutMe.api';
import { IAboutMeInfo } from 'api/endpoints/aboutMe/aboutMe.response.interface';
import { notification } from 'antd';
import { notifDelay, notifDelayErr } from 'utils/notifications';
import { TAboutMeDispatchReducer } from './aboutMe.reducer';

export async function getCubeInfoAction({
  dispatch,
}: {
  dispatch: React.Dispatch<TAboutMeDispatchReducer>;
}): Promise<boolean> {
  try {
    const apiFetch = await aboutMeAPI.getAboutMeInfoAPI({ key: 'cube' });
    if (apiFetch.response.status === 200) {
      dispatch({ type: AboutMeTypes.SET_CUBE_INFO, payload: apiFetch.data.info });
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function getMainInfoAction({
  dispatch,
}: {
  dispatch: React.Dispatch<TAboutMeDispatchReducer>;
}): Promise<boolean> {
  try {
    const apiFetch = await aboutMeAPI.getAboutMeInfoAPI({ key: 'mainInfo' });
    if (apiFetch.response.status === 200) {
      dispatch({ type: AboutMeTypes.SET_MAIN_INFO, payload: apiFetch.data.info });
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function updateCubeInfoAction({
  dispatch,
  data,
}: {
  dispatch: React.Dispatch<TAboutMeDispatchReducer>;
  data: IAboutMeInfo;
}): Promise<boolean> {
  try {
    const apiFetch = await aboutMeAPI.updateAboutMeInfoAPI({ newData: data, key: 'cube' });
    if (apiFetch.response.status === 200) {
      dispatch({ type: AboutMeTypes.SET_CUBE_INFO, payload: data });
      notification.success({ message: apiFetch.data.message, duration: notifDelay });
      return true;
    }
    notification.error({ message: apiFetch.data.message, duration: notifDelayErr });
    return false;
  } catch {
    notification.error({ message: 'Error del servidor', duration: notifDelayErr });
    return false;
  }
}

export async function updateMainInfoAction({
  dispatch,
  data,
}: {
  dispatch: React.Dispatch<TAboutMeDispatchReducer>;
  data: IAboutMeInfo;
}): Promise<boolean> {
  try {
    const apiFetch = await aboutMeAPI.updateAboutMeInfoAPI({ newData: data, key: 'mainInfo' });
    if (apiFetch.response.status === 200) {
      dispatch({ type: AboutMeTypes.SET_MAIN_INFO, payload: data });
      notification.success({ message: apiFetch.data.message, duration: notifDelay });
      return true;
    }
    notification.error({ message: apiFetch.data.message, duration: notifDelayErr });
    return false;
  } catch {
    notification.error({ message: 'Error del servidor', duration: notifDelayErr });
    return false;
  }
}
