import { TResponseAPI } from 'interfaces/general.interface';

export interface ICourse {
  _id: string;
  title: string;
  url: string;
  description: string;
  duration: number;
  date: string;
  image: string;
  platform: string;
  link: string;
  tags: string[];
}

export interface ICoursesPage {
  docs: ICourse[];
  totalPages: number;
  totalDocs: number;
}

export interface IGetCoursesResponse extends TResponseAPI {
  data: {
    courses: ICoursesPage;
  };
}

export interface IGetCourseResponse extends TResponseAPI {
  data: {
    status: number;
    course: ICourse;
  };
}

export interface IGetPrevNextCourseResponse extends TResponseAPI {
  data: {
    status: number;
    prevCourse?: string;
    nextCourse?: string;
  };
}

export interface IEducationMutationResponse extends TResponseAPI {
  data: {
    status: number;
    message: string;
  };
}

export interface IUploadImageResponse extends TResponseAPI {
  data: {
    status: number;
    image: string;
    message: string;
  };
}
