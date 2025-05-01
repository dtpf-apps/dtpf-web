import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getImageApi } from 'api/education';
import { useNearScreen } from 'hooks/useNearScreen';
import { Row, Col, Card, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';
import './Courses.scss';
import noImage from 'assets/img/png/no-image-s.png';
import Spin from 'views/components/UI/Spin';

export default function Courses(props: any) {
  const { courses, itemsPerPage, title, subtitle } = props;
  return (
    <>
      <Row>
        <Col span={24} className="courses-list__title">
          <h1 key="title">{title}</h1>
          <h2 key="subtitle">{subtitle}</h2>
        </Col>
      </Row>
      <div className="courses-list">
        <Row>
          {courses &&
            courses.slice(0, itemsPerPage).map((course: any) => (
              <Col key={course._id} span={12} md={8} lg={8} xl={6} className="courses-list__courses">
                <Course course={course} />
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
}

function Course(props: any) {
  const { course } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [show, el]: any = useNearScreen();
  const [image, setImage] = useState('');
  const { Meta } = Card;
  useEffect(() => {
    let isMounted = true;
    if (course.image) {
      getImageApi(course.image).then((response) => {
        if (response.url) {
          let filePath = response.url;
          const fileName = filePath.split('/')[6];
          const thumbnailName = `thumb_${fileName}`;
          const replaceName = filePath.replace(fileName, thumbnailName);
          if (isMounted) {
            setImage(replaceName);
            setIsLoading(false);
          }
        } else {
          setImage('');
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [course]);
  return (
    <div className="courses-list__element" ref={el}>
      {isLoading ? (
        <Spin paddingTop="150px" height="100%" />
      ) : (
        show && (
          <QueueAnim type={'alpha'} duration={400} ease="easeInCubic">
            <div key="course">
              <Link to={`/education/${course.url}`}>
                <Card className="courses-list__card" cover={<img src={image ? image : noImage} alt={course.title} />}>
                  <Meta description={course.title} />
                  <span className="courses-list__edit">
                    <EyeOutlined />
                  </span>
                  <div className="courses-list__tags">
                    <Tag className="courses-list__hours">
                      <b>{course.duration}</b> h
                    </Tag>
                    <Tag className="courses-list__tecnologies">
                      <b>{course.tags.length}</b> tech
                    </Tag>
                  </div>
                </Card>
              </Link>
            </div>
          </QueueAnim>
        )
      )}
    </div>
  );
}
