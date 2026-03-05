import { useState, useEffect } from 'react';
import { getCoursesAPI } from 'api/endpoints/education/education.api';
import { ICoursesPage } from 'api/endpoints/education/education.response.interface';
import useConnection from './useConnection';

export function useGetCourses(itemsPerPage: number, location: any) {
  const [courses, setCourses] = useState<ICoursesPage | null>(null);
  const { connectionStatus, isNavigatorOnline } = useConnection();
  const page = new URLSearchParams(location.search).get('page') ?? '1';

  useEffect(() => {
    let isMounted = true;
    getCoursesAPI({ limit: itemsPerPage, page: Number(page) })
      .then(({ response, data }) => {
        if (response.status === 200 && data.courses) {
          isMounted && setCourses(data.courses);
        }
      })
      .catch(() => {
        // Network error — courses remain null, offline fallback handles it
      });
    return () => {
      isMounted = false;
    };
  }, [itemsPerPage, page, connectionStatus, isNavigatorOnline]);

  return courses;
}
