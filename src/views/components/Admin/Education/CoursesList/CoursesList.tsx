import React, { Suspense, lazy, memo } from 'react';
import { deleteCourseApi } from 'api/education';
import { Link } from 'react-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import { List, Button, Modal, notification } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

dayjs.extend(relativeTime);
dayjs.locale('es');
const Spin = lazy(() => import('views/components/UI/Spin'));
const { confirm } = Modal;

interface ICoursesListProps {
  courses: any;
  setReloadCourses: (reload: boolean) => void;
  editCourse: (course: any) => void;
}

function CoursesList({ courses, setReloadCourses, editCourse }: ICoursesListProps) {
  const deleteCourse = (course: any) => {
    confirm({
      title: 'Eliminando curso',
      content: `¿Estas seguro de eliminar el curso ${course.title}?`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        deleteCourseApi(course._id)
          .then((response) => {
            const typeNotification = response.status === 200 ? 'success' : 'warning';
            notification[typeNotification]({
              message: response.message,
            });
            setReloadCourses(true);
          })
          .catch(() => {
            notification['error']({
              message: 'Error del servidor.',
            });
          });
      },
    });
  };

  return (
    <div className="courses-list">
      {!courses ? (
        <Suspense fallback={<></>}>
          <Spin />
        </Suspense>
      ) : (
        <List
          dataSource={courses.docs}
          renderItem={(course) => (
            <Course course={course} deleteCourse={deleteCourse} editCourse={editCourse} />
          )}
        />
      )}
    </div>
  );
}

interface ICourseProps {
  course: any;
  deleteCourse: (course: any) => void;
  editCourse: (course: any) => void;
}

function Course({ course, deleteCourse, editCourse }: ICourseProps) {
  const date = `Hace ${course && dayjs(course.date).fromNow(true)}`;

  return (
    <List.Item
      actions={[
        <Link to={`/education/${course.url}`} target="_blank">
          <Button type="primary">
            <EyeOutlined />
          </Button>
        </Link>,
        <Button type="primary" onClick={() => editCourse(course)}>
          <EditOutlined />
        </Button>,
        <Button type="primary" danger onClick={() => deleteCourse(course)}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta title={course.title} description={date} />
    </List.Item>
  );
}

export default memo(CoursesList);
