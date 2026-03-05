import React, { Suspense, lazy, memo } from 'react';
import { Link } from 'react-router';
import useContextEducation from 'hooks/contexts/useContextEducation';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import { List, Button, Modal } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

dayjs.extend(relativeTime);
dayjs.locale('es');
const Spin = lazy(() => import('views/components/UI/Spin'));
const { confirm } = Modal;

interface ICoursesListProps {
  editCourse: (course: any) => void;
}

function CoursesList({ editCourse }: ICoursesListProps) {
  const { courses, deleteCourse } = useContextEducation();

  const handleDeleteCourse = (course: any) => {
    confirm({
      title: 'Eliminando curso',
      content: `¿Estas seguro de eliminar el curso ${course.title}?`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        deleteCourse(course._id);
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
            <Course course={course} deleteCourse={handleDeleteCourse} editCourse={editCourse} />
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
