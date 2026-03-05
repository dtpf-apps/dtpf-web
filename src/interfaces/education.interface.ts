import { ICoursesPage } from 'api/endpoints/education/education.response.interface';

export interface IInitialEducationState {
  courses: ICoursesPage | null;
  isLoading: boolean;

  getCourses: (limit: number, page: number) => Promise<boolean>;
  addCourse: (data: Record<string, unknown>) => Promise<boolean>;
  updateCourse: (courseId: string, data: Record<string, unknown>) => Promise<boolean>;
  deleteCourse: (courseId: string) => Promise<boolean>;
  uploadImage: (image: File, courseId: string) => Promise<string | false>;
  addTag: (courseId: string, data: { tags: string | string[] }) => Promise<boolean>;
  deleteTag: (courseId: string, data: { tags: string[] }) => Promise<boolean>;
}
