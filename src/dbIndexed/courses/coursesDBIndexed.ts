import { getCoursesApi } from '../../api/education';
import { COURSES_INFO } from '../config';

export function updateCoursesDBIndexed(db: any) {
  let coursesInfo = {
    coursesInfo: COURSES_INFO,
    docs: [],
    duration: 0,
    technologies: 0,
  };
  let sumItemsDuration = 0;
  getCoursesApi(1000, 1)
    .then((res) => {
      if (res.message !== 'Failed to fetch') {
        if (res.courses.docs) {
          const itemsDuration: any = [];
          res.courses.docs.forEach((course: any) => {
            itemsDuration.push(course.duration);
          });
          itemsDuration.forEach((num: any) => {
            sumItemsDuration += num;
          });
          coursesInfo = {
            coursesInfo: COURSES_INFO,
            docs: res.courses.docs,
            duration: sumItemsDuration,
            technologies: tecnologiesUsed(res.courses),
          };
        }
      }
    })
    .then(() => {
      const transaction = db.transaction([COURSES_INFO], 'readwrite');
      const store = transaction.objectStore(COURSES_INFO);
      store.put(coursesInfo);
    });
}

function tecnologiesUsed(courses: any) {
  const arrayTags: any = [];
  const tec: any = [];
  courses.docs &&
    courses.docs.forEach((course: any) => {
      arrayTags.push(course.tags);
    });
  for (let i = 0; i < arrayTags.length; i++) {
    const tecnologies = arrayTags[i];
    for (let j = 0; j < tecnologies.length; j++) {
      const tecnology = tecnologies[j];
      !tec.includes(tecnology) && tec.push(tecnology);
    }
  }
  return tec.length;
}
