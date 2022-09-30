import { basePath, apiVersion } from "./utils/config";
import { makeRequest } from "../api/utils/makeRequest";

export function getAboutMeInfoApi(title) {
  const url = `${basePath}/${apiVersion}/get-about-me-info/${title}`;
  return makeRequest(url);
}
