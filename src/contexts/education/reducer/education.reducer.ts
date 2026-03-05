import { IInitialEducationState } from 'interfaces/education.interface';
import { ICoursesPage } from 'api/endpoints/education/education.response.interface';
import * as EducationTypes from './education.types';

export type TEducationDispatchReducer =
  | {
      type: typeof EducationTypes.SET_COURSES;
      payload: ICoursesPage | null;
    }
  | {
      type: typeof EducationTypes.SET_IS_LOADING;
      payload: boolean;
    };

export default function educationReducer(
  state: IInitialEducationState,
  action: TEducationDispatchReducer
): IInitialEducationState {
  const { type, payload } = action;

  switch (type) {
    case EducationTypes.SET_COURSES: {
      return { ...state, courses: payload };
    }
    case EducationTypes.SET_IS_LOADING: {
      return { ...state, isLoading: payload };
    }
    default:
      return state;
  }
}
