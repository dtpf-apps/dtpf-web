import { basePath, apiVersion } from "./utils/config";
import { makeRequest } from "../api/utils/makeRequest";

export function getAboutMeInfoApi(title) {
  const url = `${basePath}/${apiVersion}/get-about-me-info/${title}`;
  return makeRequest(url);
}

export function updateAboutMeInfoApi(token, data, title) {
  const url = `${basePath}/${apiVersion}/update-about-me-info/${title}`;
  return makeRequest(url, true, true, "PUT", token, JSON.stringify(data));
}