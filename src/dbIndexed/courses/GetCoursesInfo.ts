import { useState, useEffect } from 'react';
import { useGetCourses } from '../../hooks/useGetCourses';
import useGetCoursesDBIndexed from './useGetCoursesDBIndexed';
import useConnection from '../../hooks/useConnection';

export default function GetCoursesInfo(itemsPerPage: number) {
  const { connectionStatus, isNavigatorOnline } = useConnection();
  const courses = useGetCourses(itemsPerPage, window.location);
  const coursesDataIndexed = useGetCoursesDBIndexed();
  const [coursesDB, setCoursesDB] = useState<any>({});
  useEffect(() => {
    connectionStatus === 500 || !isNavigatorOnline
      ? setCoursesDB(coursesDataIndexed.coursesInfoIndexed)
      : setCoursesDB(courses);
  }, [connectionStatus, isNavigatorOnline, coursesDataIndexed, courses]);
  return coursesDB;
}
