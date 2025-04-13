import { basePath, apiVersion } from "../../utils/config";
import {
  IgetAboutMeInfoAPIResponse,
  IgetAboutMeInfoAPIResponseInfo,
  IupdateAboutMeInfoAPIResponse,
} from "./brandUsers.response.interface";

export async function getAboutMeInfoAPI({
  key,
}: {
  key: string;
}): Promise<IgetAboutMeInfoAPIResponse> {
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${basePath}/${apiVersion}/get-about-me-info/${key}`,
    params
  );
  const data = await response.json();
  return { response, data };
}

export async function updateAboutMeInfoAPI({
  newData,
  key,
  token,
}: {
  newData: IgetAboutMeInfoAPIResponseInfo;
  key: string;
  token: string;
}): Promise<IupdateAboutMeInfoAPIResponse> {
  const params = {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  };
  const response = await fetch(
    `${basePath}/${apiVersion}/update-about-me-info/${key}`,
    params
  );
  const data = await response.json();
  return { response, data };
}
