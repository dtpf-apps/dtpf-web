import {
  signUpApi,
  signInApi,
  getUsersApi,
  getUsersActiveApi,
  getAvatarApi,
  uploadAvatarApi,
  updateUserApi,
  activateUserApi,
  deleteUserApi,
  signUpAdminApi,
} from '../../api/user';
import { testingRefreshToken } from '../../utils/constants';
const TOKEN = testingRefreshToken;
jest.setTimeout(6000);

describe('User API', () => {
  it('Create and activate user', async () => {
    const USERDATA = {
      email: 'david@test.com',
      password: 12345678,
      repeatPassword: 12345678,
    };
    await signUpApi(USERDATA).then(async (data) => {
      expect(data.status).toBe(200);
      await activateUserApi(TOKEN, data.user._id, true).then((data) => {
        expect(data.status).toBe(200);
      });
    });
  });
  it('User login', async () => {
    const USERDATA = {
      email: 'david@test.com',
      password: '12345678',
    };
    await signInApi(USERDATA).then((data) => {
      expect(data.status).toBe(200);
    });
  });
  it('Get active users', async () => {
    await getUsersActiveApi(TOKEN, true).then((data) => {
      expect(data.users.length).toBeGreaterThan(0);
    });
  });
  it('Update user avatar', async () => {
    let avatarName = '9Eg7ljRnmzpFntEq';
    let userId = 'sdsdff5ssdf5';
    await uploadAvatarApi(TOKEN, avatarName, userId).then((data) => {
      expect(data.status).toBe(404);
    });
  });
  it('Get user avatar', async () => {
    let avatarName = '9Eg7ljRnmzpFntEq';
    await getAvatarApi(avatarName).then((data) => {
      expect(data.status).toBe(404);
    });
  });
  it('Update user', async () => {
    await getUsersApi(TOKEN).then(async (data) => {
      expect(data.users.length).toBeGreaterThan(0);
      const USERDATA = {
        name: 'Antonio',
        lastname: 'Jaramillo',
        email: 'david@test.com',
      };
      let dataUsers = data.users;
      let testingEmail = dataUsers.find((email) => email.email === 'david@test.com');
      await updateUserApi(TOKEN, USERDATA, testingEmail._id).then((data) => {
        expect(data.status).toBe(200);
      });
    });
  });
  it('User registration from admin panel', async () => {
    const USERDATA = {
      email: 'davidtest@gmail.com',
      password: '123456',
    };
    await signUpAdminApi(TOKEN, USERDATA).then(async (data) => {
      expect(data.status).toBe(200);
      await deleteUserApi(TOKEN, data.user._id).then((data) => {
        expect(data.status).toBe(200);
      });
    });
  });
  it('Remove user test', async () => {
    await getUsersApi(TOKEN).then(async (data) => {
      let dataUsers = data.users;
      let testingEmail = dataUsers.find((email) => email.email === 'david@test.com');
      expect(data.users.length).toBeGreaterThan(0);
      await deleteUserApi(TOKEN, testingEmail._id).then((data) => {
        expect(data.status).toBe(200);
      });
    });
  });
});
