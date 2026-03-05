import React from 'react';
import { Link } from 'react-router';
import { getImageUrl } from 'api/endpoints/education/education.api';
import { useNearScreen } from 'hooks/useNearScreen';
import { Row, Col, Card, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { motion, type Easing } from 'motion/react';

const EASE_IN: Easing = 'easeIn';
import './Courses.scss';
import noImage from 'assets/img/png/no-image-s.png';

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
  const [show, el]: any = useNearScreen();
  const image = course.image ? getImageUrl(`thumb_${course.image}`) : '';
  const { Meta } = Card;
  return (
    <div className="courses-list__element" ref={el}>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE_IN }}
        >
          <Link to={`/education/${course.url}`}>
            <Card
              className="courses-list__card"
              cover={<img src={image ? image : noImage} alt={course.title} />}
            >
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
        </motion.div>
      )}
    </div>
  );
}
