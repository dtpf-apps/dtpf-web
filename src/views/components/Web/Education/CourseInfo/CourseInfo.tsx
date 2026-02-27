import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router';
import { getCourseApi, getImageApi, getPrevCourseApi, getNextCourseApi } from 'api/education';
import useScrollToTop from 'hooks/useScrollToTop';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import { Row, Col, Image, Tag, Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, LinkOutlined } from '@ant-design/icons';
import './CourseInfo.scss';
import noImage from 'assets/img/png/no-image.png';

dayjs.extend(relativeTime);
dayjs.locale('es');
const Spin = lazy(() => import('views/components/UI/Spin'));
const Helmet = lazy(() => import('views/components/Helmet'));
const Error = lazy(() => import('views/pages/Errors'));

export default function CourseInfo(props: any) {
  const { url, courses } = props;
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useScrollToTop();
  useEffect(() => {
    let isMounted = true;
    const offlineCourse = courses && courses.docs && courses.docs.find((course: any) => course.url === url);
    getCourseApi(url).then((response) => {
      if (response.status === 200) {
        if (isMounted) {
          setCourse(response.course);
          setIsLoading(false);
        }
      } else {
        if (offlineCourse) {
          setCourse(offlineCourse);
          setIsLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [url, courses]);
  return (
    <div className="course-info">
      {isLoading ? (
        <Suspense fallback={<></>}>
          <Spin />
        </Suspense>
      ) : course ? (
        <Course course={course && course} courses={courses} />
      ) : (
        <Suspense fallback={<></>}>
          <Error
            status={404}
            title="Ups!! Curso no encontrado..."
            subtitle="Lo siento, el curso que buscas no existe."
          />
        </Suspense>
      )}
    </div>
  );
}

function Course(props: any) {
  const { course, courses } = props;
  const [image, setImage] = useState('');
  const [prevCourse, setPrevCourse] = useState(null);
  const [nextCourse, setNextCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  function cycle(array: any, str: any) {
    const i = array.indexOf(str);
    if (i === -1) return undefined;
    return array[(i + 1) % array.length];
  }
  useEffect(() => {
    let isMounted = true;
    if (course) {
      getPrevCourseApi(course.url).then((res) => {
        if (res.status === 200) {
          isMounted && setPrevCourse(res.prevCourse);
        } else {
          const coursesUrl = [];
          if (courses.docs) {
            for (let i = 0; i < courses.docs.length; i++) {
              coursesUrl.push(courses.docs[i].url);
            }
            const coursesUrlReversed = coursesUrl.reverse();
            const prevUrl = cycle(coursesUrlReversed, course.url);
            setPrevCourse(prevUrl);
          }
        }
      });
      getNextCourseApi(course.url).then((res) => {
        if (res.status === 200) {
          isMounted && setNextCourse(res.nextCourse);
        } else {
          const coursesUrl = [];
          if (courses.docs) {
            for (let i = 0; i < courses.docs.length; i++) {
              coursesUrl.push(courses.docs[i].url);
            }
            const nextUrl = cycle(coursesUrl, course.url);
            setNextCourse(nextUrl);
          }
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [course, courses]);
  useEffect(() => {
    let isMounted = true;
    if (course && course.image) {
      getImageApi(course.image).then((response) => {
        if (response.status === 200) {
          if (isMounted) {
            setImage(response.url);
          }
        } else {
          setImage('');
        }
        setIsLoading(false);
      });
    } else {
      setImage('');
      setIsLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [course]);
  return (
    <>
      {isLoading ? (
        <Suspense fallback={<></>}>
          <Spin />
        </Suspense>
      ) : (
        <>
          <Suspense fallback={<></>}>
            <Helmet titleHelmet={`Formación | ${course.title}`} contentHelmet={course.title} />
          </Suspense>
          <Links prevCourse={prevCourse} nextCourse={nextCourse} />
          <Col span={24} className="course-info__title">
            <h1>{course.title}</h1>
          </Col>
          <div className="course-info__image">
            <Image src={image ? image : noImage} alt={course && 'Imágen de ' + course.title}></Image>
          </div>
          <Row className="course-info__info">
            <Col span={12} className="course-info__info-duration">
              {course && course.duration}&nbsp;horas
            </Col>
            <Col span={12} className="course-info__info-date">
              Hace&nbsp;{course && dayjs(course.date).fromNow(true)}
            </Col>
          </Row>
          <Col className="course-info__description">
            <p>{course && course.description}</p>
          </Col>
          <Row className="course-info__tags">
            <Tags course={course && course} />
          </Row>
          <Row className="course-info__button">
            <Col span={24} className="course-info__button-link">
              {course && course.link && (
                <Button>
                  <a href={course.link} target="_blank" rel="noopener noreferrer">
                    <LinkOutlined />
                    Enlace a Certificación
                  </a>
                </Button>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

function Links(props: any) {
  const { prevCourse, nextCourse } = props;
  return (
    <>
      <div className="course-info__linkPrevMobile" key="prevMob">
        {prevCourse && (
          <Link to={`/education/${prevCourse}`}>
            <Button type="primary">
              <ArrowLeftOutlined />
            </Button>
          </Link>
        )}
      </div>
      <div className="course-info__linkNextMobile" key="nextMob">
        {nextCourse && (
          <Link to={`/education/${nextCourse}`}>
            <Button type="primary">
              <ArrowRightOutlined />
            </Button>
          </Link>
        )}
      </div>
    </>
  );
}

function Tags(props: any) {
  const { course } = props;
  const [tags, setTags] = useState([]);
  useEffect(() => {
    let isMounted = true;
    isMounted && setTags(course.tags);
    return () => {
      isMounted = false;
    };
  }, [course]);
  return (
    <div className="course-info__tags-div">
      {tags &&
        tags.map((tag: string) => {
          const tagToClassname = tag.replace(/[ .]/g, '');
          return (
            <span key={tag} className={tagToClassname}>
              <Tag>{tag}</Tag>
            </span>
          );
        })}
    </div>
  );
}
