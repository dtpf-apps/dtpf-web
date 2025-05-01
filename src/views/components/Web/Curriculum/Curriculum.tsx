import React from 'react';
import { Row, Col } from 'antd';
import WorkExperience from './WorkExperience';
import Education from './Education';
import ComplementaryEducation from './ComplementaryEducation';
import ComputerSkills from './ComputerSkills';
import Languages from './Languages';
import useScrollToTop from 'hooks/useScrollToTop';
import './Curriculum.scss';

export default function Curriculum() {
  useScrollToTop();
  return (
    <div className="curriculum">
      <Row>
        <Col span={24}>
          <h1 className="curriculum__title">CURRICULUM VITAE</h1>
        </Col>
        <Col span={24} xxl={15}>
          <WorkExperience />
        </Col>
        <Col span={24} xxl={9}>
          <Row>
            <Col span={24} lg={12} xl={24}>
              <Education />
            </Col>
            <Col span={24} lg={12} xl={24}>
              <ComplementaryEducation />
            </Col>
          </Row>
          <Col span={24}>
            <ComputerSkills />
          </Col>
          <Row className="curriculum__languages-projects">
            <Col span={24}>
              <Languages />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
