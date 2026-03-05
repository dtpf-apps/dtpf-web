import { IInitialEducationState } from 'interfaces/education.interface';

const initialEducationState: IInitialEducationState = {
  courses: null,
  isLoading: false,

  getCourses: () => Promise.resolve(false),
  addCourse: () => Promise.resolve(false),
  updateCourse: () => Promise.resolve(false),
  deleteCourse: () => Promise.resolve(false),
  uploadImage: () => Promise.resolve(false),
  addTag: () => Promise.resolve(false),
  deleteTag: () => Promise.resolve(false),
};

export default initialEducationState;
