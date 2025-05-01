import { testingRefreshToken } from '../../utils/constants';
import { getMenuApi, updateMenuApi, activateMenuApi, addMenuApi, deleteMenuApi } from '../../api/menu';
const TOKEN = testingRefreshToken;

describe('Menu API', () => {
  it('Create menu', async () => {
    const MENUDATA = {
      title: 'BlogTest',
      url: 'https://msr.com',
      order: 0,
      active: false,
    };
    await addMenuApi(TOKEN, MENUDATA).then((data) => {
      expect(data.status).toBe(200);
    });
  });
  it('Get menus', async () => {
    await getMenuApi().then((data) => {
      expect(data.status).toBe(200);
    });
  });
  it('Activate menu', async () => {
    await getMenuApi().then(async (data) => {
      expect(data.status).toBe(200);
      let dataMenus = data.menu;
      let testingMenu = dataMenus.find((title) => title.title === 'BlogTest');
      await activateMenuApi(TOKEN, testingMenu._id, true).then((data) => {
        expect(data.status).toBe(200);
      });
    });
  });
  it('Update menu', async () => {
    await getMenuApi().then(async (data) => {
      expect(data.status).toBe(200);
      const MENUDATA = {
        url: 'https://url.com',
      };
      let dataMenus = data.menu;
      let testingMenu = dataMenus.find((title) => title.title === 'BlogTest');
      await updateMenuApi(TOKEN, testingMenu._id, MENUDATA).then((data) => {
        expect(data.status).toBe(200);
      });
    });
  });
  it('Remove menu', async () => {
    await getMenuApi().then(async (data) => {
      expect(data.status).toBe(200);
      let dataMenus = data.menu;
      let testingMenu = dataMenus.find((title) => title.title === 'BlogTest');
      await deleteMenuApi(TOKEN, testingMenu._id).then((data) => {
        expect(data.status).toBe(200);
      });
    });
  });
});
