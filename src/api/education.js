import { basePath, apiVersion } from './utils/config';
import { makeRequest } from '../api/utils/makeRequest';

export function addCourseApi(course) {
  const url = `${basePath}/${apiVersion}/add-course`;
  return makeRequest(url, true, true, 'POST', null, JSON.stringify(course));
}

export function updateCourseApi(id, data) {
  const url = `${basePath}/${apiVersion}/update-course/${id}`;
  return makeRequest(url, true, true, 'PUT', null, JSON.stringify(data), 'application/json');
}

export function getCoursesApi(limit, page) {
  const url = `${basePath}/${apiVersion}/get-courses?limit=${limit}&page=${page}`;
  return makeRequest(url);
}

export function getCourseApi(urlCourse) {
  const url = `${basePath}/${apiVersion}/get-course/${urlCourse}`;
  return makeRequest(url);
}

export function getPrevCourseApi(urlCourse) {
  const url = `${basePath}/${apiVersion}/get-prev-course/${urlCourse}`;
  return makeRequest(url);
}

export function getNextCourseApi(urlCourse) {
  const url = `${basePath}/${apiVersion}/get-next-course/${urlCourse}`;
  return makeRequest(url);
}

export function uploadImageApi(image, courseId) {
  const url = `${basePath}/${apiVersion}/upload-image/${courseId}`;
  const formData = new FormData();
  formData.append('image', image);
  return makeRequest(url, true, true, 'PUT', null, formData, null);
}

export function getImageApi(imageName) {
  const url = `${basePath}/${apiVersion}/get-image/${imageName}`;
  return makeRequest(url, null, false);
}

export function deleteCourseApi(id) {
  const url = `${basePath}/${apiVersion}/delete-course/${id}`;
  return makeRequest(url, true, true, 'DELETE');
}

export function addTagApi(id, data) {
  const url = `${basePath}/${apiVersion}/add-tag/${id}`;
  return makeRequest(url, true, true, 'PUT', null, JSON.stringify(data));
}

export function deleteTagApi(id, data) {
  const url = `${basePath}/${apiVersion}/delete-tag/${id}`;
  return makeRequest(url, true, true, 'DELETE', null, JSON.stringify(data));
}
