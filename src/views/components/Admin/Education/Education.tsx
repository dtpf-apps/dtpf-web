import React, { useState, useEffect, Suspense, lazy } from "react";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getCoursesApi } from "api/education";
import "./Education.scss";
const Modal = lazy(() => import("views/components/UI/Modal"));
const PaginationAnt = lazy(() => import("views/components/UI/Pagination"));
const CoursesList = lazy(() => import("./CoursesList"));
const AddEditCoursesForm = lazy(
  () => import("./AddEditCoursesForm")
);

interface ICoursesProps {
  location: any;
  history: any;
}

function Courses({ location, history }: ICoursesProps) {
  const [courses, setCourses] = useState(null);
  const { page = 1 } = queryString.parse(location.search);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [reloadCourses, setReloadCourses] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getCoursesApi(itemsPerPage, page).then((response) => {
      isMounted && setCourses(response.courses);
    });
    setReloadCourses(false);
    return () => {
      isMounted = false;
    };
  }, [page, reloadCourses, itemsPerPage]);

  return (
    <div className="admin-courses">
      <AddCourse
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        setReloadCourses={setReloadCourses}
      />
      <RenderListCourses
        courses={courses}
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        setReloadCourses={setReloadCourses}
      />
      {courses && (
        <Pagination
          courses={courses}
          location={location}
          history={history}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      )}
      <Suspense fallback={<></>}>
        <Modal
          title={modalTitle}
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
        >
          {modalContent}
        </Modal>
      </Suspense>
    </div>
  );
}

interface IAddCourseProps {
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalTitle: React.Dispatch<React.SetStateAction<string>>;
  setModalContent: React.Dispatch<React.SetStateAction<any>>;
  setReloadCourses: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddCourse({
  setIsVisibleModal,
  setModalTitle,
  setModalContent,
  setReloadCourses,
}: IAddCourseProps) {
  
  const addCourse = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nueva Formación");
    setModalContent(
      <Suspense fallback={<></>}>
        <AddEditCoursesForm
          setIsVisibleModal={setIsVisibleModal}
          setReloadCourses={setReloadCourses}
          course={null}
        />
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
  courses: any;
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalTitle: React.Dispatch<React.SetStateAction<string>>;
  setModalContent: React.Dispatch<React.SetStateAction<any>>;
  setReloadCourses: React.Dispatch<React.SetStateAction<boolean>>;
}

function RenderListCourses({
  courses,
  setIsVisibleModal,
  setModalTitle,
  setModalContent,
  setReloadCourses,
}: IRenderListCoursesProps) {
  
  const editCourse = (course: any) => {
    setIsVisibleModal(true);
    setModalTitle("Editar Curso");
    setModalContent(
      <Suspense fallback={<></>}>
        <AddEditCoursesForm
          setIsVisibleModal={setIsVisibleModal}
          setReloadCourses={setReloadCourses}
          course={course}
        />
      </Suspense>
    );
  };
  return (
    <Suspense fallback={<></>}>
      <CoursesList
        courses={courses}
        setReloadCourses={setReloadCourses}
        editCourse={editCourse}
      />
    </Suspense>
  );
}

interface IPaginationProps {
  courses: any;
  location: any;
  history: any;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({ courses, location, history, itemsPerPage, setItemsPerPage }: IPaginationProps) {
  return (
    <>
      {(courses?.totalPages > 1 || itemsPerPage === courses?.totalDocs) && (
        <Suspense fallback={<></>}>
          <PaginationAnt
            courses={courses}
            location={location}
            history={history}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </Suspense>
      )}
    </>
  );
}

export default withRouter(Courses);
