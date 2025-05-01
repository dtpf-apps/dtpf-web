import { useState, useEffect } from 'react';
import { getCoursesApi } from '../api/education';
import queryString from 'query-string';
import useConnection from './useConnection';

export function useGetCourses(itemsPerPage, location) {
  const [courses, setCourses] = useState([]);
  const { connectionStatus, isNavigatorOnline } = useConnection();
  const { page = 1 } = queryString.parse(location.search);
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
