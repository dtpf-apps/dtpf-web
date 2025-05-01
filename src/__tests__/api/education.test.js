import { testingRefreshToken } from '../../utils/constants';
import {
  addCourseApi,
  updateCourseApi,
  getCoursesApi,
  getCourseApi,
  getCourseByOrderApi,
  uploadImageApi,
  getImageApi,
  deleteCourseApi,
  addTagApi,
  deleteTagApi,
} from '../../api/education';
const TOKEN = testingRefreshToken;

describe('Education API', () => {
  // it("Drop first course created if exists", async () => {
  //   await getCourseApi("curso-desde-api-test").then(async (data) => {
  //     expect(data.status).toBe(200);
  //     await deleteCourseApi(TOKEN, data.course._id).then((data) => {
  //       expect(data.status).toBe(200);
  //     });
  //   });
  // });
  // it("Create new course", async () => {
  //   const COURSEDATA = {
  //     title: "Curso desde api test",
  //     url: "curso-desde-api-test",
  //     tags: ["Php"],
  //   };
  //   await addCourseApi(TOKEN, COURSEDATA).then((data) => {
  //     expect(data.message).toBe(200);
  //   });
  // });
  // it("Update course", async () => {
  //   const COURSEDATA = {
  //     title: "Curso desde api test updated",
  //     url: "curso-desde-api-test-updated",
  //     description: "Description",
  //     duration: "50",
  //   };
  //   await getCourseApi("curso-desde-api-test").then((data) => {
  //     expect(data.status).toBe(200);
  //     updateCourseApi(TOKEN, data.course._id, COURSEDATA).then((data) => {
  //       expect(data.status).toBe(200);
  //     });
  //   });
  // });
  // it("Get all courses", async () => {
  //   await getCoursesApi(10000, 1).then((data) => {
  //     expect(data.status).toBe(200);
  //   });
  // });
  // it("Update course image", async () => {
  //   await getCourseApi("curso-desde-api-test-updated").then((data) => {
  //     expect(data.status).toBe(200);
  //     let image = [];
  //     uploadImageApi(TOKEN, image, data.course._id).then((data) => {
  //       expect(data.status).toBe(404);
  //     });
  //   });
  // });
  // it("Get course image", async () => {
  //   await getCourseApi("curso-desde-api-test-updated").then((data) => {
  //     expect(data.status).toBe(200);
  //     getImageApi("sfs").then((data) => {
  //       expect(data.status).toBe(404);
  //     });
  //   });
  // });
  // it("Add tag", async () => {
  //   await getCourseApi("curso-desde-api-test-updated").then((data) => {
  //     expect(data.status).toBe(200);
  //     const COURSEDATA = {
  //       tags: "Tag",
  //     };
  //     addTagApi(TOKEN, data.course._id, COURSEDATA).then((data) => {
  //       expect(data.status).toBe(200);
  //     });
  //   });
  // });
  // it("Remove tag", async () => {
  //   await getCourseApi("curso-desde-api-test-updated").then((data) => {
  //     expect(data.status).toBe(200);
  //     const COURSEDATA = {
  //       tags: ["Tag"],
  //     };
  //     deleteTagApi(TOKEN, data.course._id, COURSEDATA).then(async (data) => {
  //       expect(data.status).toBe(200);
  //     });
  //   });
  // });
  // it("Remove course test", async () => {
  //   await getCourseApi("curso-desde-api-test-updated").then((data) => {
  //     expect(data.status).toBe(200);
  //     deleteCourseApi(TOKEN, data.course._id).then((data) => {
  //       expect(data.status).toBe(200);
  //     });
  //   });
  // });
});
