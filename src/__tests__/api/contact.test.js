import { testingRefreshToken } from "../../utils/constants";
import {
  subscribeContactApi,
  getMessagesUnreadApi,
  checkMessageApi,
  deleteContactMessageApi,
  getLastMessageApi
} from "../../api/contact";
const TOKEN = testingRefreshToken;

describe("Contact API", () => {
  it("Send test message", async () => {
    const CONTACTDATA = {
      email: "",
      message: "ContactTest",
    };
    await subscribeContactApi(CONTACTDATA).then((data) => {
      expect(data.status).toBe(404);
    });
  });
  it("Get unread messages", async () => {
    await getMessagesUnreadApi(TOKEN, false).then((data) => {
      expect(data.status).toBe(200);
    });
  });
  it("Message marked as read", async () => {
    await getMessagesUnreadApi(TOKEN, false).then( async (data) => {
      expect(data.status).toBe(200);
      await checkMessageApi(TOKEN, "id", false).then((data) => {
        expect(data.status).toBe(500);
      });
    });
  });
  it("Remove test mensaje", async () => {
    await getMessagesUnreadApi(TOKEN, false).then( async (data) => {
      expect(data.status).toBe(200);
      await deleteContactMessageApi(TOKEN, "id").then((data) => {
        expect(data.status).toBe(500);
      });
    });
  });
  it("Get last message email", async () => {
    await getLastMessageApi(TOKEN).then((data) => {
      expect(data.status).toBe(200);
      console.log(data);
    })
  });
});
