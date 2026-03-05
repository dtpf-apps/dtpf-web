/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useMemo, useCallback, useRef, memo } from 'react';
import EducationContext from './EducationContext';
import initialEducationState from './initialEducationState';
import educationReducer from './reducer/education.reducer';
import * as action from './reducer/education.actions';
import { ChildrenProps } from 'interfaces/general.interface';

function EducationProvider({ children }: ChildrenProps) {
  const [state, dispatch] = useReducer(educationReducer, initialEducationState);
  const lastFetchRef = useRef({ limit: 10, page: 1 });

  const getCourses = useCallback(async (limit: number, page: number) => {
    lastFetchRef.current = { limit, page };
    return action.getCoursesAction({ dispatch, limit, page });
  }, []);

  const addCourse = useCallback(async (data: Record<string, unknown>) => {
    const { limit, page } = lastFetchRef.current;
    return action.addCourseAction({ dispatch, data, limit, page });
  }, []);

  const updateCourse = useCallback(async (courseId: string, data: Record<string, unknown>) => {
    const { limit, page } = lastFetchRef.current;
    return action.updateCourseAction({ dispatch, courseId, data, limit, page });
  }, []);

  const deleteCourse = useCallback(async (courseId: string) => {
    const { limit, page } = lastFetchRef.current;
    return action.deleteCourseAction({ dispatch, courseId, limit, page });
  }, []);

  const uploadImage = useCallback(async (image: File, courseId: string) => {
    return action.uploadImageAction({ image, courseId });
  }, []);

  const addTag = useCallback(async (courseId: string, data: { tags: string | string[] }) => {
    const { limit, page } = lastFetchRef.current;
    return action.addTagAction({ dispatch, courseId, data, limit, page });
  }, []);

  const deleteTag = useCallback(async (courseId: string, data: { tags: string[] }) => {
    const { limit, page } = lastFetchRef.current;
    return action.deleteTagAction({ dispatch, courseId, data, limit, page });
  }, []);

  const memoProvider = useMemo(
    () => ({
      ...state,
      getCourses,
      addCourse,
      updateCourse,
      deleteCourse,
      uploadImage,
      addTag,
      deleteTag,
    }),
    [state, getCourses, addCourse, updateCourse, deleteCourse, uploadImage, addTag, deleteTag]
  );

  return <EducationContext.Provider value={memoProvider}>{children}</EducationContext.Provider>;
}

export default memo(EducationProvider);
