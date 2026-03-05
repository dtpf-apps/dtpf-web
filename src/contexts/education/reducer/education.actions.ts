import * as EducationTypes from './education.types';
import * as educationAPI from 'api/endpoints/education/education.api';
import { notification } from 'antd';
import { notifDelay, notifDelayErr } from 'utils/notifications';
import { TEducationDispatchReducer } from './education.reducer';

interface IDispatchCtx {
  dispatch: React.Dispatch<TEducationDispatchReducer>;
}

export async function getCoursesAction({
  dispatch,
  limit,
  page,
}: IDispatchCtx & { limit: number; page: number }): Promise<boolean> {
  dispatch({ type: EducationTypes.SET_IS_LOADING, payload: true });
  try {
    const apiFetch = await educationAPI.getCoursesAPI({ limit, page });
    if (apiFetch.response.status === 200 && apiFetch.data.courses) {
      dispatch({ type: EducationTypes.SET_COURSES, payload: apiFetch.data.courses });
      return true;
    }
    return false;
  } catch {
    return false;
  } finally {
    dispatch({ type: EducationTypes.SET_IS_LOADING, payload: false });
  }
}

export async function addCourseAction({
  dispatch,
  data,
  limit,
  page,
}: IDispatchCtx & { data: Record<string, unknown>; limit: number; page: number }): Promise<boolean> {
  try {
    const apiFetch = await educationAPI.addCourseAPI({ body: data });
    if (apiFetch.response.status === 200 || apiFetch.response.status === 201) {
      notification.success({ message: apiFetch.data.message, duration: notifDelay });
      await getCoursesAction({ dispatch, limit, page });
      return true;
    }
    notification.warning({ message: apiFetch.data.message, duration: notifDelayErr });
    return false;
  } catch {
    notification.error({ message: 'Error del servidor.', duration: notifDelayErr });
    return false;
  }
}

export async function updateCourseAction({
  dispatch,
  courseId,
  data,
  limit,
  page,
}: IDispatchCtx & {
  courseId: string;
  data: Record<string, unknown>;
  limit: number;
  page: number;
}): Promise<boolean> {
  try {
    const apiFetch = await educationAPI.updateCourseAPI({ courseId, data });
    if (apiFetch.response.status === 200) {
      notification.success({ message: apiFetch.data.message, duration: notifDelay });
      await getCoursesAction({ dispatch, limit, page });
      return true;
    }
    const type = apiFetch.data.status === 500 ? 'error' : 'warning';
    notification[type]({ message: apiFetch.data.message, duration: notifDelayErr });
    return false;
  } catch {
    notification.error({ message: 'Error del servidor.', duration: notifDelayErr });
    return false;
  }
}

export async function deleteCourseAction({
  dispatch,
  courseId,
  limit,
  page,
}: IDispatchCtx & { courseId: string; limit: number; page: number }): Promise<boolean> {
  try {
    const apiFetch = await educationAPI.deleteCourseAPI({ courseId });
    if (apiFetch.response.status === 200) {
      notification.success({ message: apiFetch.data.message, duration: notifDelay });
      await getCoursesAction({ dispatch, limit, page });
      return true;
    }
    notification.warning({ message: apiFetch.data.message, duration: notifDelayErr });
    return false;
  } catch {
    notification.error({ message: 'Error del servidor.', duration: notifDelayErr });
    return false;
  }
}

export async function uploadImageAction({
  image,
  courseId,
}: {
  image: File;
  courseId: string;
}): Promise<string | false> {
  try {
    const apiFetch = await educationAPI.uploadImageAPI({ image, courseId });
    if (apiFetch.response.status === 200) {
      return apiFetch.data.image;
    }
    notification.error({ message: apiFetch.data.message, duration: notifDelayErr });
    return false;
  } catch {
    notification.error({ message: 'Error del servidor.', duration: notifDelayErr });
    return false;
  }
}

export async function addTagAction({
  dispatch,
  courseId,
  data,
  limit,
  page,
}: IDispatchCtx & {
  courseId: string;
  data: { tags: string | string[] };
  limit: number;
  page: number;
}): Promise<boolean> {
  try {
    const apiFetch = await educationAPI.addTagAPI({ courseId, data });
    if (apiFetch.response.status === 200) {
      notification.success({
        message: `"${data.tags}" añadido correctamente.`,
        duration: notifDelay,
      });
      await getCoursesAction({ dispatch, limit, page });
      return true;
    }
    notification.warning({ message: apiFetch.data.message, duration: notifDelayErr });
    return false;
  } catch {
    notification.error({ message: 'Error del servidor.', duration: notifDelayErr });
    return false;
  }
}

export async function deleteTagAction({
  dispatch,
  courseId,
  data,
  limit,
  page,
}: IDispatchCtx & {
  courseId: string;
  data: { tags: string[] };
  limit: number;
  page: number;
}): Promise<boolean> {
  try {
    const apiFetch = await educationAPI.deleteTagAPI({ courseId, data });
    if (apiFetch.response.status === 200) {
      notification.success({
        message: `"${data.tags[0]}" eliminado correctamente.`,
        duration: notifDelay,
      });
      await getCoursesAction({ dispatch, limit, page });
      return true;
    }
    notification.warning({ message: apiFetch.data.message, duration: notifDelayErr });
    return false;
  } catch {
    notification.error({ message: 'Error del servidor.', duration: notifDelayErr });
    return false;
  }
}
