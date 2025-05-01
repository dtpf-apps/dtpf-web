import { testingRefreshToken } from "../../utils/constants";
import {
  getAccessTokenApi,
  refreshAccessTokenApi,
  logout,
  willExpireToken,
} from "../../api/auth";

const TOKEN = testingRefreshToken;

describe("Api de auth", () => {
  it("Comprobar si ha expirado el token", (done) => {
    const data = willExpireToken(TOKEN);
    expect(data).toBeFalsy();
    done();
  });
  it("getAccessTokenApi", (done) => {
    expect(getAccessTokenApi()).toBe(null);
    done();
  });
  it("refreshAccessTokenApi", (done) => {
    expect(refreshAccessTokenApi({ refreshToken: TOKEN })).toBe(undefined);
    done();
  });
  it("logout", (done) => {
    expect(logout()).toBe(undefined);
    done();
  });
});
