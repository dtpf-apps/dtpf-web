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

function Courses(props: any) {
  const { location, history } = props;
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
          className={null}
        >
          {modalContent}
        </Modal>
      </Suspense>
    </div>
  );
}

function AddCourse(props: any) {
  const {
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadCourses,
  } = props;
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

function RenderListCourses(props: any) {
  const {
    courses,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadCourses,
  } = props;
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

function Pagination(props: any) {
  const { courses, location, history, itemsPerPage, setItemsPerPage } = props;
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
