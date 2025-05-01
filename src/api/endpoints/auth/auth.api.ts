import { basePath, apiVersion } from "../../utils/config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";
import jwtDecode from "jwt-decode";
import { IrefreshAccessTokenApiResponse } from "./auth.response.interface";

interface IjwtDecodePayload {
  exp: number;
}

export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken || accessToken === "null") {
    return null;
  }
  return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken || refreshToken === "null") {
    return null;
  }
  return willExpireToken(refreshToken) ? null : refreshToken;
}

export async function refreshAccessTokenApi({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<IrefreshAccessTokenApiResponse> {
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  };
  const response = await fetch(
    `${basePath}/${apiVersion}/refresh-access-token`,
    params
  );
  const data = await response.json();
  return { response, data };
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

export function willExpireToken(token: string) {
  const seconds = 60;
  const metaToken = jwtDecode<IjwtDecodePayload>(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;
  return now > exp;
}
