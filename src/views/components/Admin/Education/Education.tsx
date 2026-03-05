import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Button } from 'antd';
import { useLocation } from 'react-router';
import useContextEducation from 'hooks/contexts/useContextEducation';
import './Education.scss';
const Modal = lazy(() => import('views/components/UI/Modal'));
const PaginationAnt = lazy(() => import('views/components/UI/Pagination'));
const CoursesList = lazy(() => import('./CoursesList'));
const AddEditCoursesForm = lazy(() => import('./AddEditCoursesForm'));

function Courses() {
  const location = useLocation();
  const { courses, getCourses } = useContextEducation();
  const page = new URLSearchParams(location.search).get('page') ?? '1';
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    getCourses(itemsPerPage, Number(page));
  }, [page, itemsPerPage, getCourses]);

  return (
    <div className="admin-courses">
      <AddCourse
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
      />
      <RenderListCourses
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
      />
      {courses && (
        <Pagination courses={courses} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
      )}
      <Suspense fallback={<></>}>
        <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {modalContent}
        </Modal>
      </Suspense>
    </div>
  );
}

interface IAddCourseProps {
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalTitle: React.Dispatch<React.SetStateAction<string>>;
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

function AddCourse({ setIsVisibleModal, setModalTitle, setModalContent }: IAddCourseProps) {
  const addCourse = () => {
    setIsVisibleModal(true);
    setModalTitle('Creando nueva Formación');
    setModalContent(
      <Suspense fallback={<></>}>
        <AddEditCoursesForm setIsVisibleModal={setIsVisibleModal} course={null} />
      </Suspense>
    );
  };

  return (
    <div className="admin-courses__add-course">
      <Button type="primary" onClick={addCourse}>
        Nueva Formación
      </Button>
    </div>
  );
}

interface IRenderListCoursesProps {
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalTitle: React.Dispatch<React.SetStateAction<string>>;
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

function RenderListCourses({ setIsVisibleModal, setModalTitle, setModalContent }: IRenderListCoursesProps) {
  const editCourse = (course: any) => {
    setIsVisibleModal(true);
    setModalTitle('Editar Curso');
    setModalContent(
      <Suspense fallback={<></>}>
        <AddEditCoursesForm setIsVisibleModal={setIsVisibleModal} course={course} />
      </Suspense>
    );
  };
  return (
    <Suspense fallback={<></>}>
      <CoursesList editCourse={editCourse} />
    </Suspense>
  );
}

interface IPaginationProps {
  courses: any;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({ courses, itemsPerPage, setItemsPerPage }: IPaginationProps) {
  return (
    <>
      {(courses?.totalPages > 1 || itemsPerPage === courses?.totalDocs) && (
        <Suspense fallback={<></>}>
          <PaginationAnt courses={courses} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
        </Suspense>
      )}
    </>
  );
}

export default Courses;
