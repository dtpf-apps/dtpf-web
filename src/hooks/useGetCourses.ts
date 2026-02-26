import { useState, useEffect } from 'react';
import { getCoursesApi } from '../api/education';
import useConnection from './useConnection';

export function useGetCourses(itemsPerPage: number, location: any) {
  const [courses, setCourses] = useState([]);
  const { connectionStatus, isNavigatorOnline } = useConnection();
  const page = new URLSearchParams(location.search).get('page') ?? '1';

  useEffect(() => {
    let isMounted = true;
    getCoursesApi(itemsPerPage, page).then((response) => {
      isMounted && setCourses(response.courses);
    });
    return () => {
      isMounted = false;
    };
  }, [itemsPerPage, page, connectionStatus, isNavigatorOnline]);

  return courses;
}
