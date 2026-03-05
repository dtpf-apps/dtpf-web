import { getCoursesAPI } from 'api/endpoints/education/education.api';
import { COURSES_INFO } from '../config';

export function updateCoursesDBIndexed(db: any) {
  let coursesInfo: any = {
    coursesInfo: COURSES_INFO,
    docs: [],
    duration: 0,
    technologies: 0,
  };
  let sumItemsDuration = 0;
  getCoursesAPI({ limit: 1000, page: 1 })
    .then(({ data }) => {
      if (data.courses?.docs) {
        const itemsDuration: any = [];
        data.courses.docs.forEach((course: any) => {
          itemsDuration.push(course.duration);
        });
        itemsDuration.forEach((num: any) => {
          sumItemsDuration += num;
        });
        coursesInfo = {
          coursesInfo: COURSES_INFO,
          docs: data.courses.docs,
          duration: sumItemsDuration,
          technologies: tecnologiesUsed(data.courses),
        };
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
