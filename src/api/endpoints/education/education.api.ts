import { fetchAPI, apiUrl, buildUrl } from '../../utils/fetchHelper';
import { basePath, apiVersion } from '../../utils/config';
import {
  IGetCoursesResponse,
  IGetCourseResponse,
  IGetPrevNextCourseResponse,
  IEducationMutationResponse,
  IUploadImageResponse,
} from './education.response.interface';

export async function getCoursesAPI({
  limit,
  page,
}: {
  limit: number;
  page: number;
}): Promise<IGetCoursesResponse> {
  return fetchAPI<IGetCoursesResponse['data']>(buildUrl(apiUrl('get-courses'), { limit, page }));
}

export async function getCourseAPI({ url }: { url: string }): Promise<IGetCourseResponse> {
  return fetchAPI<IGetCourseResponse['data']>(apiUrl(`get-course/${url}`));
}

export async function getPrevCourseAPI({ url }: { url: string }): Promise<IGetPrevNextCourseResponse> {
  return fetchAPI<IGetPrevNextCourseResponse['data']>(apiUrl(`get-prev-course/${url}`));
}

export async function getNextCourseAPI({ url }: { url: string }): Promise<IGetPrevNextCourseResponse> {
  return fetchAPI<IGetPrevNextCourseResponse['data']>(apiUrl(`get-next-course/${url}`));
}

export async function addCourseAPI({
  body,
}: {
  body: Record<string, unknown>;
}): Promise<IEducationMutationResponse> {
  return fetchAPI<IEducationMutationResponse['data']>(apiUrl('add-course'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function updateCourseAPI({
  courseId,
  data,
}: {
  courseId: string;
  data: Record<string, unknown>;
}): Promise<IEducationMutationResponse> {
  return fetchAPI<IEducationMutationResponse['data']>(apiUrl(`update-course/${courseId}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteCourseAPI({
  courseId,
}: {
  courseId: string;
}): Promise<IEducationMutationResponse> {
  return fetchAPI<IEducationMutationResponse['data']>(apiUrl(`delete-course/${courseId}`), {
    method: 'DELETE',
  });
}

export async function uploadImageAPI({
  image,
  courseId,
}: {
  image: File;
  courseId: string;
}): Promise<IUploadImageResponse> {
  const formData = new FormData();
  formData.append('image', image);
  return fetchAPI<IUploadImageResponse['data']>(apiUrl(`upload-image/${courseId}`), {
    method: 'PUT',
    body: formData,
  });
}

export function getImageUrl(imageName: string): string {
  return `${basePath}/${apiVersion}/get-image/${imageName}`;
}

export async function addTagAPI({
  courseId,
  data,
}: {
  courseId: string;
  data: { tags: string | string[] };
}): Promise<IEducationMutationResponse> {
  return fetchAPI<IEducationMutationResponse['data']>(apiUrl(`add-tag/${courseId}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteTagAPI({
  courseId,
  data,
}: {
  courseId: string;
  data: { tags: string[] };
}): Promise<IEducationMutationResponse> {
  return fetchAPI<IEducationMutationResponse['data']>(apiUrl(`delete-tag/${courseId}`), {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
